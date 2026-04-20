#!/usr/bin/env node

/**
 * Jobber GraphQL Integration
 * Usage: node jobber-integration.js <command> [args]
 *
 * Commands:
 *   clients              List all clients
 *   invoices             List invoices (unpaid/overdue)
 *   jobs                 List active/upcoming jobs
 *   quotes               List open quotes
 *   requests             List new service requests
 *   client <id>          Get a specific client by ID
 *   summary              High-level account summary
 */

const https = require('https');
const fs = require('fs');
const os = require('os');

// Load credentials from secrets file
const secretsPath = process.env.JOBBER_SECRETS_PATH
  || '/Users/jarvishstark/.openclaw/secrets/jobber.json';
let secrets;
try {
  secrets = JSON.parse(fs.readFileSync(secretsPath, 'utf8'));
} catch {
  console.error('Could not read Jobber secrets from', secretsPath);
  process.exit(1);
}

const API_VERSION = '2023-08-18';

function post(path, body) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify(body);
    const req = https.request(
      {
        hostname: 'api.getjobber.com',
        port: 443,
        path,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Content-Length': Buffer.byteLength(payload),
        },
      },
      (res) => {
        let data = '';
        res.on('data', (c) => (data += c));
        res.on('end', () => {
          try { resolve(JSON.parse(data)); }
          catch { reject(new Error(data.slice(0, 200))); }
        });
      }
    );
    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

async function refreshAccessToken() {
  const result = await post('/api/oauth/token', {
    grant_type: 'refresh_token',
    client_id: secrets.clientId,
    client_secret: secrets.clientSecret,
    refresh_token: secrets.refreshToken,
  });
  if (!result.access_token) throw new Error(`Refresh failed: ${JSON.stringify(result)}`);
  secrets.accessToken = result.access_token;
  if (result.refresh_token) secrets.refreshToken = result.refresh_token;
  fs.writeFileSync(secretsPath, JSON.stringify(secrets, null, 2));
}

async function graphqlWithRetry(query, variables = {}) {
  try {
    return await graphql(query, variables);
  } catch (err) {
    if (err.tokenExpired) {
      await refreshAccessToken();
      return await graphql(query, variables);
    }
    throw err;
  }
}

function graphql(query, variables = {}) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({ query, variables });
    const req = https.request(
      {
        hostname: 'api.getjobber.com',
        port: 443,
        path: '/api/graphql',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${secrets.accessToken}`,
          'Content-Type': 'application/json',
          'X-JOBBER-GRAPHQL-VERSION': API_VERSION,
          Accept: 'application/json',
          'Content-Length': Buffer.byteLength(body),
        },
      },
      (res) => {
        let data = '';
        res.on('data', (c) => (data += c));
        res.on('end', () => {
          try {
            const parsed = JSON.parse(data);
            if (parsed.message === 'Access token expired') return reject(Object.assign(new Error('Access token expired'), { tokenExpired: true }));
            if (parsed.errors) return reject(new Error(parsed.errors.map(e => e.message).join(', ')));
            resolve(parsed.data);
          } catch {
            reject(new Error(`Non-JSON: ${data.slice(0, 300)}`));
          }
        });
      }
    );
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

function isTokenExpiredOrStale(accessToken) {
  try {
    const payload = JSON.parse(Buffer.from(accessToken.split('.')[1], 'base64').toString());
    const expiresAt = payload.exp * 1000;
    const refreshAt = expiresAt - 10 * 60 * 1000; // refresh 10 min before expiry
    return Date.now() >= refreshAt;
  } catch {
    return true; // if we can't decode it, treat as expired
  }
}

async function ensureFreshToken() {
  if (isTokenExpiredOrStale(secrets.accessToken)) {
    await refreshAccessToken();
  }
}

const commands = {
  async refresh() {
    await refreshAccessToken();
    const payload = JSON.parse(Buffer.from(secrets.accessToken.split('.')[1], 'base64').toString());
    const expiresAt = new Date(payload.exp * 1000).toISOString();
    return { refreshed: true, expiresAt };
  },

  async clients() {
    const data = await graphqlWithRetry(`{
      clients(first: 50) {
        nodes {
          id name
          emails { address }
          phones { number description }
          billingAddress { street city province postalCode }
          isLead
        }
      }
    }`);
    return data.clients.nodes;
  },

  async invoices() {
    const data = await graphqlWithRetry(`{
      invoices(first: 50) {
        nodes {
          id invoiceNumber
          client { name }
          amounts { total outstanding }
          dueDate
          issuedDate
          jobberWebUri
        }
      }
    }`);
    return data.invoices.nodes;
  },

  async jobs() {
    const data = await graphqlWithRetry(`{
      jobs(first: 50) {
        nodes {
          id title jobStatus
          client { name }
          startAt endAt
          total
          jobberWebUri
        }
      }
    }`);
    return data.jobs.nodes;
  },

  async quotes() {
    const data = await graphqlWithRetry(`{
      quotes(first: 50) {
        nodes {
          id quoteNumber quoteStatus
          client { name }
          amounts { total }
          createdAt
          jobberWebUri
        }
      }
    }`);
    return data.quotes.nodes;
  },

  async requests() {
    const data = await graphqlWithRetry(`{
      requests(first: 50) {
        nodes {
          id title workStatus
          client { name }
          createdAt
          jobberWebUri
        }
      }
    }`);
    return data.requests.nodes;
  },

  async client(id) {
    if (!id) throw new Error('client command requires an ID argument');
    const data = await graphqlWithRetry(`
      query GetClient($id: EncodedId!) {
        client(id: $id) {
          id name
          emails { address }
          phones { number description }
          billingAddress { street city province postalCode }
          jobs(first: 10) { nodes { id title jobStatus } }
          invoices(first: 10) { nodes { id invoiceNumber amounts { total outstanding } } }
        }
      }
    `, { id });
    return data.client;
  },

  async today() {
    const now = new Date();
    const start = new Date(now); start.setHours(0, 0, 0, 0);
    const end = new Date(now); end.setHours(23, 59, 59, 999);
    const data = await graphqlWithRetry(
      `query TodayVisits($start: ISO8601DateTime!, $end: ISO8601DateTime!) {
        scheduledItems(filter: { occursWithin: { startAt: $start, endAt: $end } }, first: 50) {
          nodes {
            __typename
            ... on Visit {
              id startAt endAt
              job { title client { firstName lastName name } }
            }
          }
        }
      }`,
      { start: start.toISOString(), end: end.toISOString() }
    );
    return data.scheduledItems.nodes;
  },

  async summary() {
    const [clientsData, invoicesData, jobsData, quotesData] = await Promise.all([
      graphqlWithRetry(`{ clients(first: 1) { totalCount } }`),
      graphqlWithRetry(`{ invoices(first: 50) { nodes { amounts { total invoiceBalance } } totalCount } }`),
      graphqlWithRetry(`{ jobs(first: 50) { nodes { id } totalCount } }`),
      graphqlWithRetry(`{ quotes(first: 1) { totalCount } }`),
    ]);

    const totalRevenue = invoicesData.invoices.nodes
      .reduce((sum, inv) => sum + (inv.amounts.total || 0), 0);
    const totalOutstanding = invoicesData.invoices.nodes
      .reduce((sum, inv) => sum + (inv.amounts.invoiceBalance || 0), 0);

    return {
      totalClients: clientsData.clients.totalCount,
      totalInvoices: invoicesData.invoices.totalCount,
      totalRevenue: `$${totalRevenue.toFixed(2)}`,
      outstandingRevenue: `$${totalOutstanding.toFixed(2)}`,
      activeJobs: jobsData.jobs.totalCount,
      totalQuotes: quotesData.quotes.totalCount,
    };
  },
};

async function main() {
  const [cmd, ...args] = process.argv.slice(2);
  if (cmd !== 'refresh') await ensureFreshToken();

  if (!cmd || !commands[cmd]) {
    console.log(`Usage: node jobber-integration.js <command>\nCommands: ${Object.keys(commands).join(', ')}`);
    process.exit(1);
  }

  try {
    const result = await commands[cmd](...args);
    console.log(JSON.stringify(result, null, 2));
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

main();
