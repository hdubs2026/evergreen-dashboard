#!/usr/bin/env node

/**
 * Jobber OAuth Authentication Helper
 * Starts a local server to automatically catch the OAuth callback code.
 */

const https = require('https');
const http = require('http');
const url = require('url');

const CONFIG = {
  clientId: '928b336d-c32c-4e6f-ad33-3cded253ff84',
  clientSecret: 'c9f0c6e273f3bdebe04feea94c9b63c0df7b5fe7a1789226098f88e83dca217f',
  redirectUri: 'http://localhost:8080/callback',
  authUrl: 'https://api.getjobber.com/api/oauth/authorize',
  tokenUrl: 'https://api.getjobber.com/api/oauth/token',
};

async function main() {
  console.log('🔐 Jobber OAuth Setup\n');

  const authUrl =
    `${CONFIG.authUrl}?` +
    `client_id=${encodeURIComponent(CONFIG.clientId)}&` +
    `redirect_uri=${encodeURIComponent(CONFIG.redirectUri)}&` +
    `response_type=code`;

  // Start local callback server
  const code = await new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      const parsed = url.parse(req.url, true);
      if (parsed.pathname === '/callback') {
        if (parsed.query.code) {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end('<h2>✅ Authorization successful! You can close this tab.</h2>');
          server.close();
          resolve(parsed.query.code);
        } else {
          res.writeHead(400, { 'Content-Type': 'text/html' });
          res.end(`<h2>❌ No code received. Error: ${parsed.query.error || 'unknown'}</h2>`);
          server.close();
          reject(new Error(parsed.query.error || 'No code in callback'));
        }
      }
    });

    server.listen(8080, () => {
      console.log('📡 Waiting for Jobber to redirect back...');
      console.log('\nOpen this URL in your browser:\n');
      console.log(`   ${authUrl}\n`);
      console.log('Log in with your Jobber account, then authorize the app.');
      console.log('This window will continue automatically.\n');
    });

    server.on('error', reject);
  });

  console.log('✅ Got authorization code. Exchanging for tokens...\n');

  try {
    const tokenData = await exchangeCodeForToken(code);

    console.log('🎉 SUCCESS!\n');
    console.log('Access Token:');
    console.log(tokenData.access_token);
    console.log('\nRefresh Token:');
    console.log(tokenData.refresh_token);
    console.log(`\nExpires in: ${Math.round(tokenData.expires_in / 3600)} hours\n`);

    console.log('📋 Save these tokens — run:');
    console.log(`   openclaw config set agents.defaults.env.JOBBER_ACCESS_TOKEN "${tokenData.access_token}"`);
    console.log(`   openclaw config set agents.defaults.env.JOBBER_REFRESH_TOKEN "${tokenData.refresh_token}"`);
  } catch (err) {
    console.error('❌ Token exchange failed:', err.message);
  }
}

function exchangeCodeForToken(authCode) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      grant_type: 'authorization_code',
      code: authCode,
      client_id: CONFIG.clientId,
      client_secret: CONFIG.clientSecret,
      redirect_uri: CONFIG.redirectUri,
    });

    const req = https.request(
      {
        hostname: 'api.getjobber.com',
        port: 443,
        path: '/api/oauth/token',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(postData),
          Accept: 'application/json',
        },
      },
      (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          try {
            const parsed = JSON.parse(data);
            if (res.statusCode === 200) {
              resolve(parsed);
            } else {
              reject(new Error(`HTTP ${res.statusCode}: ${parsed.error_description || parsed.error || data}`));
            }
          } catch {
            reject(new Error(`Invalid response: ${data}`));
          }
        });
      }
    );

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

main().catch((err) => {
  console.error('❌', err.message);
  process.exit(1);
});
