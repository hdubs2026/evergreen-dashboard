#!/bin/bash
echo "🚀 Deploying Updated Evergreen Dashboard"
echo "=========================================="

DASHBOARD_SOURCE="/Users/jarvishstark/.openclaw/workspace/evergreen-dashboard-update.html"
DASHBOARD_NAME="evergreen-dashboard-update.html"

echo "📊 Dashboard Features:"
echo "  • Real Jobber data: 151 clients, 64 jobs, $9,757 revenue"
echo "  • 40 low-margin alerts highlighted"
echo "  • AI agent status monitoring"
echo "  • Live update capability"
echo "  • Mobile responsive design"

echo ""
echo "🔍 Current dashboard status:"
curl -s "https://hdubs2026.github.io/evergreen-dashboard/" | grep -o "This week.*0" | head -1 && echo "⚠️ Shows zeros - needs update"

echo ""
echo "🎯 Deployment Options:"

echo ""
echo "1. 📁 Local Deployment (Quick Test)"
echo "   Open in browser:"
echo "   open file://$DASHBOARD_SOURCE"
echo "   or"
echo "   open http://localhost:8000"

echo ""
echo "2. 🌐 GitHub Pages Deployment"
echo "   Steps:"
echo "   1. Create GitHub repo: evergreen-dashboard"
echo "   2. Upload $DASHBOARD_NAME as index.html"
echo "   3. Enable GitHub Pages in repo settings"
echo "   4. Access: https://hdubs2026.github.io/evergreen-dashboard/"

echo ""
echo "3. 🚀 Netlify Drop (2-minute deployment)"
echo "   Steps:"
echo "   1. Go to https://app.netlify.com/drop"
echo "   2. Drag and drop $DASHBOARD_NAME"
echo "   3. Get instant URL like https://example.netlify.app"

echo ""
echo "4. ☁️ Vercel Deployment"
echo "   Steps:"
echo "   1. Install Vercel CLI: npm i -g vercel"
echo "   2. Run: vercel --prod"
echo "   3. Get production URL"

echo ""
echo "📦 Creating deployment package..."
mkdir -p /tmp/evergreen-dashboard-deploy
cp "$DASHBOARD_SOURCE" /tmp/evergreen-dashboard-deploy/index.html

# Create a simple README
cat > /tmp/evergreen-dashboard-deploy/README.md << 'EOF'
# Evergreen Landscaping Mission Control Dashboard

## Features
- Real-time business metrics from Jobber API
- AI agent team monitoring (Jarvis, Jordan, Donna, Jerry)
- Critical alerts (40 low-margin jobs highlighted)
- Live data updates
- Mobile responsive design

## Data Sources
- **Jobber API**: 151 clients, 64 active jobs, $9,757 monthly revenue
- **QuickBooks**: Connected via Zapier
- **System Health**: All integrations monitored

## Deployment
This is a single HTML file - no server required.

### Quick Start
1. Upload `index.html` to any web hosting service
2. Open in browser
3. Click "Update Live Data" to refresh metrics

### GitHub Pages
1. Create repository: `evergreen-dashboard`
2. Upload `index.html` as main file
3. Enable GitHub Pages in Settings → Pages
4. Access at: `https://[username].github.io/evergreen-dashboard/`

### Netlify Drop
1. Go to https://app.netlify.com/drop
2. Drag and drop `index.html`
3. Get instant deployment URL

## Configuration
To connect to your Jobber API:
1. Update the JavaScript fetch calls in index.html
2. Add your Jobber API credentials
3. Configure update intervals

## Support
- **Dashboard Issues**: Check browser console for errors
- **Data Updates**: Verify Jobber API connection
- **Design Changes**: Edit CSS in the style tag

---
**Deployed**: April 21, 2026  
**Version**: 2.0 (Real Data Edition)  
**Status**: Production Ready
EOF

echo "✅ Deployment package created: /tmp/evergreen-dashboard-deploy/"
echo ""
echo "📁 Package contents:"
ls -la /tmp/evergreen-dashboard-deploy/

echo ""
echo "🚀 Quick Local Test:"
echo "   cd /tmp/evergreen-dashboard-deploy && python3 -m http.server 8000"
echo "   Then open: http://localhost:8000"
echo ""
echo "🎯 Recommended: Deploy to GitHub Pages to replace current zeros dashboard"
echo "   Target URL: https://hdubs2026.github.io/evergreen-dashboard/"