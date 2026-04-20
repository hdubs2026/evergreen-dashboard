// Test script to verify project structure
const fs = require('fs');
const path = require('path');

console.log('🔍 Testing Evergreen Landscaping Discord AI Agents Structure\n');

const requiredFiles = [
    'index.js',
    'package.json',
    '.env.example',
    'README.md',
    'SETUP_GUIDE.md',
    'discord-agents-system.md',
    'bot/bot.js',
    'bot/commands.js',
    'bot/events.js',
    'bot/openai-setup.js',
    'bot/deploy-commands.js'
];

const optionalFiles = [
    '.env',
    'logs/',
    'node_modules/'
];

let allPassed = true;

console.log('📁 Checking required files...\n');

requiredFiles.forEach(file => {
    const exists = fs.existsSync(file);
    const status = exists ? '✅' : '❌';
    console.log(`${status} ${file}`);
    
    if (!exists) {
        allPassed = false;
        console.log(`   Missing: ${file}`);
    }
});

console.log('\n📁 Checking optional files...\n');

optionalFiles.forEach(file => {
    const exists = fs.existsSync(file);
    const status = exists ? '✅' : '⚠️';
    console.log(`${status} ${file}`);
});

console.log('\n📦 Checking package.json...\n');

if (fs.existsSync('package.json')) {
    try {
        const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
        
        console.log(`✅ Package name: ${pkg.name}`);
        console.log(`✅ Version: ${pkg.version}`);
        console.log(`✅ Main file: ${pkg.main}`);
        
        const requiredDeps = ['discord.js', 'openai', 'dotenv'];
        const missingDeps = requiredDeps.filter(dep => !pkg.dependencies?.[dep]);
        
        if (missingDeps.length === 0) {
            console.log('✅ All required dependencies defined');
        } else {
            console.log('❌ Missing dependencies:', missingDeps.join(', '));
            allPassed = false;
        }
        
        const requiredScripts = ['start', 'dev', 'deploy-commands'];
        const missingScripts = requiredScripts.filter(script => !pkg.scripts?.[script]);
        
        if (missingScripts.length === 0) {
            console.log('✅ All required scripts defined');
        } else {
            console.log('❌ Missing scripts:', missingScripts.join(', '));
            allPassed = false;
        }
        
    } catch (error) {
        console.log('❌ Error reading package.json:', error.message);
        allPassed = false;
    }
}

console.log('\n🔧 Checking bot structure...\n');

const botFiles = fs.readdirSync('bot').filter(file => file.endsWith('.js'));
console.log(`Found ${botFiles.length} bot files:`);
botFiles.forEach(file => console.log(`  📄 ${file}`));

console.log('\n📊 Summary:\n');

if (allPassed) {
    console.log('🎉 All checks passed! The project structure is correct.');
    console.log('\nNext steps:');
    console.log('1. Copy .env.example to .env');
    console.log('2. Fill in your credentials');
    console.log('3. Run: npm install');
    console.log('4. Run: npm run deploy-commands');
    console.log('5. Run: npm start');
} else {
    console.log('⚠️ Some checks failed. Please review the missing files.');
    console.log('\nTo fix:');
    console.log('1. Ensure all required files are present');
    console.log('2. Check package.json configuration');
    console.log('3. Verify bot directory structure');
}

console.log('\n🏁 Structure test complete.');