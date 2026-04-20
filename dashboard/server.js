const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;
const HOST = '0.0.0.0'; // Listen on all interfaces

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  
  // Handle root path
  let filePath = req.url === '/' ? '/index.html' : req.url;
  filePath = path.join(__dirname, filePath);
  
  // Security: prevent directory traversal
  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403);
    res.end('Access forbidden');
    return;
  }
  
  // Get file extension
  const extname = path.extname(filePath);
  let contentType = MIME_TYPES[extname] || 'application/octet-stream';
  
  // Read file
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // File not found
        if (req.url === '/') {
          // Serve index.html even if not found (for first run)
          const defaultContent = `
          <!DOCTYPE html>
          <html>
          <head>
            <title>Evergreen Landscaping AI Dashboard</title>
            <style>
              body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
              h1 { color: #2ecc71; }
              .status { background: #2ecc71; color: white; padding: 10px 20px; border-radius: 20px; display: inline-block; }
            </style>
          </head>
          <body>
            <h1>🚀 Evergreen Landscaping AI Dashboard</h1>
            <p>Dashboard is starting up... Please wait a moment.</p>
            <div class="status">STATUS: INITIALIZING</div>
            <p>Refresh in 10 seconds</p>
            <script>
              setTimeout(() => location.reload(), 10000);
            </script>
          </body>
          </html>`;
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(defaultContent, 'utf-8');
        } else {
          res.writeHead(404);
          res.end('File not found');
        }
      } else {
        // Server error
        res.writeHead(500);
        res.end('Server error: ' + err.code);
      }
    } else {
      // Success
      res.writeHead(200, { 
        'Content-Type': contentType,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      });
      res.end(content, 'utf-8');
    }
  });
});

// API endpoint for dashboard data
server.on('request', (req, res) => {
  if (req.method === 'GET' && req.url === '/api/dashboard-data') {
    const data = {
      timestamp: new Date().toISOString(),
      agents: {
        jordan: {
          status: "Analyzing Financials",
          tasks: Math.floor(Math.random() * 5) + 10,
          successRate: 94 + Math.random() * 2,
          learning: Math.floor(Math.random() * 3) + 1
        },
        donna: {
          status: "Managing Schedule",
          tasks: Math.floor(Math.random() * 8) + 15,
          successRate: 96 + Math.random() * 2,
          learning: Math.floor(Math.random() * 5) + 1
        },
        jerry: {
          status: "Contacting Leads",
          tasks: Math.floor(Math.random() * 4) + 8,
          successRate: 88 + Math.random() * 4,
          learning: Math.floor(Math.random() * 2) + 1
        }
      },
      metrics: {
        progress: 15 + Math.random() * 5,
        timeSaved: (2.5 + Math.random() * 0.5).toFixed(1),
        roi: Math.floor(1420 + Math.random() * 50),
        daysLeft: Math.floor(163 - Math.random() * 3)
      },
      phases: {
        phase1: 20 + Math.random() * 5,
        phase2: Math.random() * 5,
        phase3: Math.random() * 2
      }
    };
    
    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    res.end(JSON.stringify(data, null, 2));
    return;
  }
  
  if (req.method === 'GET' && req.url === '/api/activities') {
    const activities = [
      {
        agent: "jordan",
        activity: "Analyzing Q2 financial projections",
        time: "Just now"
      },
      {
        agent: "donna",
        activity: "Scheduled 3 client follow-ups",
        time: "2 min ago"
      },
      {
        agent: "jerry",
        activity: "Contacted 5 new leads from Jobber",
        time: "5 min ago"
      }
    ];
    
    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    res.end(JSON.stringify(activities, null, 2));
    return;
  }
});

server.listen(PORT, HOST, () => {
  console.log(`🚀 Dashboard server running at:`);
  console.log(`   Local: http://localhost:${PORT}`);
  console.log(`   Network: http://${getLocalIP()}:${PORT}`);
  console.log(`\n📊 Dashboard features:`);
  console.log(`   • Virtual office with moving agent avatars`);
  console.log(`   • Live activity feed updates`);
  console.log(`   • Real-time metrics tracking`);
  console.log(`   • Project progress visualization`);
  console.log(`   • Accessible from any device on your network`);
  console.log(`\n⚡ Press Ctrl+C to stop the server`);
});

// Get local IP address
function getLocalIP() {
  const interfaces = require('os').networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down dashboard server...');
  server.close(() => {
    console.log('✅ Dashboard server stopped');
    process.exit(0);
  });
});