#!/bin/bash
echo "🎯 IMPLEMENTING PRICE ADJUSTMENTS"
echo "=================================="

echo ""
echo "📊 CURRENT LOW-MARGIN SITUATION:"
echo "• 40 jobs below profitability threshold"
echo "• Most affected: Lawncare (18), Herbicide (5), Fertilization (5)"
echo "• Estimated annual loss: $14,400"

echo ""
echo "💰 PRICE ADJUSTMENT STRATEGY:"
echo "1. Herbicide Application: $75 minimum (was $30-$60)"
echo "2. Lawncare Services: $85 minimum (was $45-$100)"
echo "3. Fertilization: $110-$130 range (was $70-$95)"
echo "4. Other services: 25-50% increases"

echo ""
echo "📋 EXECUTION PLAN:"

echo ""
echo "PHASE 1: Manual Jobber Updates (Today)"
echo "--------------------------------------"
echo "1. Login to Jobber at https://secure.getjobber.com"
echo "2. Navigate to Settings → Services & Products"
echo "3. Update each service with new pricing:"
echo ""
echo "   Service                Current    New Price"
echo "   --------------------   --------   ---------"
echo "   Herbicide Application  $30-$60    $75.00"
echo "   Lawncare               $45-$100   $85.00"
echo "   Fertilization          $70-$95    $110.00"
echo "   Tree Pruning           $200.00    $250.00"
echo "   Maintenance            $80-$120   $150.00"
echo "   Clean-Up               $160.00    $200.00"
echo "   Plant Installation     $100.00    $150.00"

echo ""
echo "PHASE 2: Client Communication (This Week)"
echo "-----------------------------------------"
echo "Creating communication templates..."

# Create client email templates
mkdir -p /tmp/evergreen-communications

# Template 1: Small increase (<15%)
cat > /tmp/evergreen-communications/small-increase-template.md << 'EOF'
SUBJECT: Service Enhancement Notice

Dear [Client Name],

We're writing to let you know about a small adjustment to our service pricing.

To continue providing the high-quality service you expect, we're investing in:
- New equipment for better results
- Additional training for our team  
- Enhanced products and materials

Your [Service Name] rate will increase by $[Amount] starting [Date].

We appreciate your business and look forward to continuing to serve you!

Best regards,
The Evergreen Team
EOF

# Template 2: Medium increase (15-30%)
cat > /tmp/evergreen-communications/medium-increase-template.md << 'EOF'
SUBJECT: Investing in Better Service Delivery

Dear [Client Name],

We're reaching out about an important update to our service pricing.

To maintain our commitment to excellence, we're making strategic investments in:
- Premium products for longer-lasting results
- Advanced equipment for more efficient service
- Ongoing team training and certification

This allows us to continue delivering the exceptional quality you deserve.

Your [Service Name] rate will adjust to $[New Amount] starting [Date].

Thank you for your understanding and continued trust in Evergreen Landscaping.

Sincerely,
[Your Name]
Evergreen Landscaping
EOF

# Template 3: Large increase (>30%)
cat > /tmp/evergreen-communications/large-increase-template.md << 'EOF'
SUBJECT: Service Review and Value Alignment

Dear [Client Name],

I'd like to personally discuss an important update to our service arrangement.

After reviewing our service delivery and costs, we've identified that our current pricing for [Service Name] doesn't adequately reflect:
- The rising costs of premium materials
- The specialized expertise required
- The value of consistent, reliable service

We're introducing an enhanced service tier at $[New Amount] that includes:
- [Enhanced Feature 1]
- [Enhanced Feature 2]
- [Enhanced Feature 3]

I'd appreciate the opportunity to discuss how we can continue serving your property effectively. Please let me know a good time to connect.

Best regards,
[Your Name]
Owner, Evergreen Landscaping
EOF

echo "✅ Communication templates created in /tmp/evergreen-communications/"

echo ""
echo "PHASE 3: Implementation Timeline"
echo "-------------------------------"
echo "📅 TODAY (April 21):"
echo "   • Update Jobber service pricing"
echo "   • Create client communication plan"
echo "   • Update sales team on new pricing"
echo ""
echo "📅 TOMORROW (April 22):"
echo "   • Send Tier 1 notifications (invoice notes)"
echo "   • Begin Tier 2 email communications"
echo "   • Schedule Tier 3 phone calls"
echo ""
echo "📅 THIS WEEK (April 21-25):"
echo "   • Complete all client communications"
echo "   • Monitor initial responses"
echo "   • Adjust strategy as needed"
echo ""
echo "📅 NEXT WEEK (April 28 - May 2):"
echo "   • Review margin improvements"
echo "   • Implement additional adjustments"
echo "   • Expand to bundled services"

echo ""
echo "PHASE 4: Monitoring & Adjustment"
echo "--------------------------------"
echo "Key metrics to track:"
echo "1. Client retention rate (target: 95%+)"
echo "2. Average job margin (target: 40%+)"
echo "3. Service adoption of new pricing"
echo "4. Client feedback and satisfaction"

echo ""
echo "📈 EXPECTED RESULTS:"
echo "• Immediate: $1,200/month additional revenue"
echo "• 30 Days: 25% margin improvement (15% → 40%)"
echo "• 90 Days: $3,600/month additional revenue"
echo "• Annual: $14,400 revenue improvement"

echo ""
echo "🚀 EXECUTION CHECKLIST:"
echo ""
echo "✅ Pre-Implementation:"
echo "   [x] Analyze current pricing and margins"
echo "   [x] Develop adjustment strategy"
echo "   [x] Create communication templates"
echo ""
echo "🔄 Implementation (IN PROGRESS):"
echo "   [ ] Update Jobber service items"
echo "   [ ] Configure margin monitoring"
echo "   [ ] Train team on new pricing"
echo "   [ ] Update sales materials"
echo ""
echo "⏳ Post-Implementation:"
echo "   [ ] Monitor client responses"
echo "   [ ] Track margin improvements"
echo "   [ ] Adjust strategy as needed"
echo "   [ ] Document lessons learned"

echo ""
echo "🎯 NEXT STEPS:"
echo "1. Login to Jobber and update service pricing"
echo "2. Begin client communications based on tier"
echo "3. Monitor results and adjust as needed"
echo ""
echo "💡 TIP: Start with the 5 herbicide clients ($30-$60 → $75)"
echo "       This has the biggest impact and clearest value proposition."