#!/usr/bin/env node
/**
 * Test Obsidian Vault Reading
 * Simulates session start reading from vault
 */

const fs = require('fs');
const path = require('path');

console.log('📚 OBSIDIAN VAULT TEST - Session Start Simulation\n');

const VAULT_PATH = '/Users/jarvishstark/Library/Mobile Documents/iCloud~md~obsidian/Documents/OpenClaw-Memory';

// Files to read on session start
const SESSION_START_FILES = [
    'Agent-Shared/user-profile.md',
    'Agent-Shared/project-state.md',
    'Agent-Shared/decisions-log.md',
    'Agent-Hermes/working-context.md',
    'Agent-Hermes/daily/2026-04-20.md'
];

function readVaultFile(relativePath) {
    const fullPath = path.join(VAULT_PATH, relativePath);
    try {
        const content = fs.readFileSync(fullPath, 'utf8');
        const lines = content.split('\n').slice(0, 10).join('\n'); // First 10 lines
        return {
            success: true,
            path: relativePath,
            preview: lines + (content.split('\n').length > 10 ? '\n...' : ''),
            size: content.length
        };
    } catch (error) {
        return {
            success: false,
            path: relativePath,
            error: error.message
        };
    }
}

console.log('🔍 Reading vault files (first 10 lines each):\n');

SESSION_START_FILES.forEach(filePath => {
    const result = readVaultFile(filePath);
    if (result.success) {
        console.log(`✅ ${filePath} (${result.size} chars)`);
        console.log(result.preview);
        console.log('---\n');
    } else {
        console.log(`❌ ${filePath}: ${result.error}\n`);
    }
});

// Test writing a checkpoint
console.log('📝 Testing checkpoint write...');
const checkpointContent = `# Checkpoint Test
**Time:** ${new Date().toISOString()}
**Agent:** Jarvis
**Action:** Testing vault write functionality
**Status:** Working`;

const checkpointPath = path.join(VAULT_PATH, 'Agent-Hermes/checkpoint-test.md');
try {
    fs.writeFileSync(checkpointPath, checkpointContent);
    console.log(`✅ Checkpoint written to: ${checkpointPath}`);
    
    // Verify read back
    const verify = fs.readFileSync(checkpointPath, 'utf8');
    console.log(`✅ Verified read back: ${verify.length} chars`);
    
    // Clean up
    fs.unlinkSync(checkpointPath);
    console.log('✅ Test file cleaned up');
} catch (error) {
    console.log(`❌ Checkpoint test failed: ${error.message}`);
}

// Summary
console.log('\n📊 VAULT STATUS SUMMARY:');
console.log(`Location: ${VAULT_PATH}`);
console.log(`Total test files: ${SESSION_START_FILES.length}`);
console.log('Structure:');
console.log('  Agent-Shared/ - user-profile, project-state, decisions-log');
console.log('  Agent-Hermes/ - working-context, mistakes, daily/');
console.log('  Agent-OpenClaw/ - (OpenClaw space)');

console.log('\n🎯 NEXT STEPS FOR INTEGRATION:');
console.log('1. Create readVault() function for OpenClaw');
console.log('2. Create writeCheckpoint() function');
console.log('3. Integrate into tool call loop (every 3-5 calls)');
console.log('4. Add to session start/end routines');
console.log('5. Connect to OpenClaw wiki system if possible');