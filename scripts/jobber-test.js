#!/usr/bin/env node

/**
 * Jobber API Test Script (GraphQL)
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const secretsPath = path.join(require('os').homedir(), '.openclaw/secrets/jobber.json');
const secrets = JSON.parse(fs.readFileSync(secretsPath, 'utf8'));

function graphql(query) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({ query });
    const req = https.request(
      {
        hostname: 'api.getjobber.com',
        port: 443,
        path: '/api/graphql',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${secrets.accessToken}`,
          'Content-Type': 'application/json',
          'X-JOBBER-GRAPHQL-VERSION': '2023-08-18',
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
            if (parsed.errors) reject(new Error(parsed.errors[0].message));
            else resolve(parsed.data);
          } catch {
            reject(new Error(`Non-JSON response: ${data.slice(0, 200)}`));
          }
        });
      }
    );
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

async function main() {
  console.log('🧪 Testing Jobber API (GraphQL)\n');

  // Test: account info
  try {
    const data = await graphql(`{ account { id name } }`);
    console.log(`✅ Connected to account: ${data.account.name} (id: ${data.account.id})`);
  } catch (err) {
    console.log(`❌ Account query failed: ${err.message}`);
    return;
  }

  // Test: clients
  try {
    const data = await graphql(`{ clients(first: 5) { nodes { id name } } }`);
    console.log(`✅ Clients: ${data.clients.nodes.length} returned`);
    data.clients.nodes.forEach((c) => console.log(`   • ${c.name}`));
  } catch (err) {
    console.log(`❌ Clients query failed: ${err.message}`);
  }

  // Test: invoices
  try {
    const data = await graphql(`{ invoices(first: 5) { nodes { id invoiceNumber jobberWebUri amounts { total } } } }`);
    console.log(`✅ Invoices: ${data.invoices.nodes.length} returned`);
    data.invoices.nodes.forEach((i) =>
      console.log(`   • #${i.invoiceNumber} — $${i.amounts?.total ?? '?'}`)
    );
  } catch (err) {
    console.log(`❌ Invoices query failed: ${err.message}`);
  }

  // Test: jobs
  try {
    const data = await graphql(`{ jobs(first: 5) { nodes { id title jobStatus } } }`);
    console.log(`✅ Jobs: ${data.jobs.nodes.length} returned`);
    data.jobs.nodes.forEach((j) => console.log(`   • ${j.title} (${j.jobStatus})`));
  } catch (err) {
    console.log(`❌ Jobs query failed: ${err.message}`);
  }

  console.log('\nDone.');
}

main().catch(console.error);
