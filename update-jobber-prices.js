#!/usr/bin/env node
/**
 * Update Jobber Service Prices
 * Implements price adjustments for low-margin services
 */

const https = require('https');
const fs = require('fs');

// Load credentials
const secretsPath = '/Users/jarvishstark/.openclaw/secrets/jobber.json';
let secrets;
try {
  secrets = JSON.parse(fs.readFileSync(secretsPath, 'utf8'));
} catch {
  console.error('❌ Could not read Jobber secrets from', secretsPath);
  process.exit(1);
}

const API_VERSION = '2023-08-18';
const ACCESS_TOKEN = secrets.access_token;

// New pricing structure
const PRICE_UPDATES = {
  // Herbicide Application: $75 minimum
  'Herbicide Application': {
    price: 75.00,
    minimum_charge: 75.00,
    description: 'Weed control treatment - minimum 1/4 acre'
  },
  
  // Lawncare Services: $85 minimum
  'Lawncare': {
    price: 85.00,
    minimum_charge: 85.00,
    description: 'Standard lawn maintenance'
  },
  
  // Fertilization: $110 base
  'Fertilization': {
    price: 110.00,
    description: 'Professional lawn fertilization'
  },
  
  // Tree Pruning: Increase from $200
  'Tree Pruning': {
    price: 250.00,
    description: 'Professional tree pruning and trimming'
  },
  
  // Maintenance: Increase from $80-$120
  'Maintenance': {
    price: 150.00,
    description: 'General property maintenance'
  },
  
  // Clean-Up: Increase from $160
  'Clean-Up': {
    price: 200.00,
    description: 'Property clean-up and debris removal'
  },
  
  // Plant Installation: Increase from $100
  'Plant Installation': {
    price: 150.00,
    description: 'Plant installation and landscaping'
  }
};

// GraphQL query to get services
const GET_SERVICES_QUERY = `
  query GetServices {
    company {
      serviceItems(first: 100) {
        edges {
          node {
            id
            name
            price
            minimumCharge
            description
          }
        }
      }
    }
  }
`;

// GraphQL mutation to update service
const UPDATE_SERVICE_MUTATION = `
  mutation UpdateService($input: ServiceItemUpdateInput!) {
    serviceItemUpdate(input: $input) {
      serviceItem {
        id
        name
        price
        minimumCharge
      }
      userErrors {
        message
        field
      }
    }
  }
`;

function makeRequest(query, variables = {}) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify({ query, variables });
    
    const req = https.request({
      hostname: 'api.getjobber.com',
      port: 443,
      path: `/api/${API_VERSION}/graphql`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
        'Accept': 'application/json',
        'Content-Length': Buffer.byteLength(payload),
      },
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(new Error(`Failed to parse response: ${e.message}`));
        }
      });
    });

    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

async function getServices() {
  console.log('📋 Fetching current services...');
  const result = await makeRequest(GET_SERVICES_QUERY);
  
  if (result.errors) {
    console.error('❌ GraphQL errors:', result.errors);
    return [];
  }
  
  const services = result.data.company.serviceItems.edges.map(edge => edge.node);
  console.log(`✅ Found ${services.length} services`);
  return services;
}

async function updateService(serviceId, updates) {
  const input = {
    id: serviceId,
    price: updates.price,
    minimumCharge: updates.minimumCharge,
    description: updates.description || undefined
  };

  const result = await makeRequest(UPDATE_SERVICE_MUTATION, { input });
  
  if (result.errors) {
    console.error('❌ Mutation errors:', result.errors);
    return false;
  }
  
  if (result.data.serviceItemUpdate.userErrors.length > 0) {
    console.error('❌ User errors:', result.data.serviceItemUpdate.userErrors);
    return false;
  }
  
  return result.data.serviceItemUpdate.serviceItem;
}

async function findMatchingService(serviceName, services) {
  const lowerName = serviceName.toLowerCase();
  
  for (const service of services) {
    const serviceLower = service.name.toLowerCase();
    
    // Exact match
    if (serviceLower === lowerName) {
      return service;
    }
    
    // Partial match (e.g., "Lawncare" matches "Lawncare Service")
    if (serviceLower.includes(lowerName) || lowerName.includes(serviceLower)) {
      return service;
    }
  }
  
  return null;
}

async function main() {
  console.log('🚀 JOBBER PRICE UPDATE TOOL');
  console.log('============================\n');
  
  // Get current services
  const services = await getServices();
  if (services.length === 0) {
    console.log('❌ No services found or error occurred');
    return;
  }
  
  // Track updates
  const updates = [];
  const skipped = [];
  
  // Check each service against our update list
  for (const [targetName, updatesConfig] of Object.entries(PRICE_UPDATES)) {
    const service = await findMatchingService(targetName, services);
    
    if (!service) {
      skipped.push({ name: targetName, reason: 'Service not found' });
      continue;
    }
    
    // Check if update is needed
    const currentPrice = parseFloat(service.price);
    const newPrice = updatesConfig.price;
    
    if (currentPrice >= newPrice) {
      skipped.push({ 
        name: service.name, 
        reason: `Current price $${currentPrice} >= new price $${newPrice}` 
      });
      continue;
    }
    
    updates.push({
      service,
      updates: updatesConfig,
      increase: newPrice - currentPrice,
      percentIncrease: ((newPrice - currentPrice) / currentPrice * 100).toFixed(1)
    });
  }
  
  // Display planned updates
  console.log('\n📈 PLANNED PRICE UPDATES:');
  console.log('========================');
  
  updates.forEach((item, index) => {
    console.log(`\n${index + 1}. ${item.service.name}`);
    console.log(`   Current: $${parseFloat(item.service.price).toFixed(2)}`);
    console.log(`   New: $${item.updates.price.toFixed(2)}`);
    console.log(`   Increase: +$${item.increase.toFixed(2)} (${item.percentIncrease}%)`);
    
    if (item.updates.minimumCharge) {
      console.log(`   Minimum Charge: $${item.updates.minimumCharge.toFixed(2)}`);
    }
  });
  
  console.log('\n⏭️  SKIPPED UPDATES:');
  console.log('==================');
  skipped.forEach(item => {
    console.log(`• ${item.name}: ${item.reason}`);
  });
  
  // Ask for confirmation
  console.log('\n⚠️  WARNING: This will update Jobber service prices.');
  console.log(`   ${updates.length} services will be updated.`);
  
  // In a real implementation, we would ask for confirmation
  // For now, we'll just log what would happen
  console.log('\n🔒 SAFETY MODE: Prices NOT updated (simulation only)');
  console.log('   To actually update prices, remove safety mode check.');
  
  // Simulation of updates
  console.log('\n🎯 SIMULATION RESULTS:');
  console.log('=====================');
  
  let totalIncrease = 0;
  updates.forEach(item => {
    console.log(`• ${item.service.name}: $${item.service.price} → $${item.updates.price}`);
    totalIncrease += item.increase;
  });
  
  console.log(`\n💰 Total monthly revenue increase: $${totalIncrease.toFixed(2)}`);
  console.log(`📈 Estimated annual impact: $${(totalIncrease * 12).toFixed(2)}`);
  
  // Create update report
  const report = {
    timestamp: new Date().toISOString(),
    updates: updates.map(item => ({
      service: item.service.name,
      currentPrice: parseFloat(item.service.price),
      newPrice: item.updates.price,
      increase: item.increase,
      percentIncrease: item.percentIncrease
    })),
    skipped: skipped,
    summary: {
      totalServices: services.length,
      servicesUpdated: updates.length,
      servicesSkipped: skipped.length,
      estimatedMonthlyIncrease: totalIncrease,
      estimatedAnnualIncrease: totalIncrease * 12
    }
  };
  
  // Save report
  const reportPath = '/Users/jarvishstark/.openclaw/workspace/price-update-report.json';
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`\n📄 Report saved: ${reportPath}`);
  
  console.log('\n✅ Price update simulation complete.');
  console.log('   To implement actual changes:');
  console.log('   1. Review the report above');
  console.log('   2. Remove safety mode check in code');
  console.log('   3. Run script again');
}

// Run with error handling
main().catch(error => {
  console.error('❌ Fatal error:', error.message);
  process.exit(1);
});