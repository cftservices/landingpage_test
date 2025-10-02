# TechFlow24 Landing Page

Multi-sector landing page for TechFlow24, an AI transformation partner for Dutch businesses. Features sector-specific solutions for HVAC and Supply Chain industries.

🌐 **Live Site:** https://www.techflow24.com

---

## 🚀 Features

### Multi-Sector Landing Page
- **Main Page:** Professional overview with animated gradient hero
- **HVAC AI Platform:** Klimaattechniek solutions (€273k savings calculator)
- **SupplierSync AI:** Procurement intelligence platform (coming soon)

### Bilingual Support
- 🇳🇱 Dutch (default)
- 🇬🇧 English
- Instant language switching with localStorage persistence

### Email Notifications
- Automatic email notifications via Resend API
- Form submissions sent to configured email address
- Professional email templates with lead details

### Mobile-First Design
- Fully responsive on all devices (320px+)
- Touch-optimized buttons and controls
- Adaptive typography and spacing

### Interactive Features
- ROI Calculator (HVAC page)
- Real-time cost calculations
- 5 CTA buttons throughout HVAC page
- Modal forms with validation

---

## 📁 Project Structure

```
/
├── index.html              # Main multi-sector landing page
├── hvac.html              # HVAC AI Platform (NL/EN)
├── suppliersyncai.html    # SupplierSync AI (NL/EN)
├── api/
│   ├── send-email.js      # Email notification API
│   └── config.js          # Supabase configuration API
├── EMAIL_SETUP.md         # Email & database setup guide
├── CLAUDE.md              # Complete project documentation
└── README.md              # This file
```

---

## 🛠️ Tech Stack

- **Frontend:** HTML5, Tailwind CSS (CDN), Vanilla JavaScript
- **Icons:** Lucide Icons
- **Backend:** Vercel Serverless Functions
- **Email:** Resend API
- **Database:** Supabase (optional)
- **Hosting:** Vercel
- **Version Control:** Git/GitHub

---

## ⚡ Quick Start

### 1. Clone Repository

```bash
git clone https://github.com/cftservices/techflow24-landing.git
cd techflow24-landing
```

### 2. Install Vercel CLI

```bash
npm install -g vercel
```

### 3. Configure Environment Variables

Create environment variables in Vercel Dashboard:

**Required:**
```env
RESEND_API_KEY=re_...          # Your Resend API key
RECIPIENT_EMAIL=your@email.com  # Email to receive notifications
FROM_DOMAIN=plcholland.com      # Your verified domain
```

**Optional (for Supabase):**
```env
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_ANON_KEY=eyJ...
```

### 4. Deploy

```bash
vercel --prod
```

---

## 📧 Email Setup (Resend)

1. **Create Account:** https://resend.com/signup
2. **Verify Domain:** Add DNS records (SPF, DKIM, DMARC)
3. **Create API Key:** Copy from Resend dashboard
4. **Add to Vercel:** Settings → Environment Variables → `RESEND_API_KEY`

**Free Tier:** 3,000 emails/month

📖 **Detailed Guide:** See [EMAIL_SETUP.md](EMAIL_SETUP.md)

---

## 💾 Database Setup (Optional)

### Supabase Configuration

1. **Create Project:** https://supabase.com
2. **Create Tables:**

```sql
-- HVAC Leads
CREATE TABLE hvac_leads (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT NOT NULL,
  phone TEXT NOT NULL,
  technicians_range TEXT,
  biggest_painpoint TEXT,
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  num_technicians INTEGER,
  calculated_loss INTEGER,
  language TEXT DEFAULT 'nl'
);

-- Enable RLS
ALTER TABLE hvac_leads ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts
CREATE POLICY "Allow anonymous insert" ON hvac_leads
  FOR INSERT TO anon WITH CHECK (true);
```

3. **Get Credentials:** Settings → API → Copy URL and anon key
4. **Add to Vercel:** Environment Variables

---

## 🎨 Pages Overview

### index.html - Main Landing
**URL:** https://www.techflow24.com

- Multi-sector overview
- 2 clickable solution cards (HVAC & SupplierSync AI)
- Animated gradient hero
- "Why TechFlow24" section
- Professional footer

### hvac.html - HVAC AI Platform
**URL:** https://www.techflow24.com/hvac.html

- Bilingual (NL/EN)
- 8 pain points (€273k total loss)
- Interactive ROI calculator
- Contact form with email notifications
- Supabase integration (optional)

**Key Metrics:**
- €95k - Callback Crisis
- €45k - Manual Planning
- €28k - Paper-Based Workflows
- €32k - Customer No-Shows
- €18k - Manual Temperature Logging
- €15k - F-Gas Compliance
- €25k - No Performance Insight
- €15k - Communication Gaps

### suppliersyncai.html - SupplierSync AI
**URL:** https://www.techflow24.com/suppliersyncai.html

- Bilingual (NL/EN)
- Coming soon page
- 4 feature cards
- Product-Centric View (15,420 products)
- Supplier-Centric View (284 suppliers)
- AI-Powered Intelligence (87.4% match score)
- Real-Time Monitoring (23 anomalies)

---

## 🌍 Language System

### How It Works

1. **Language Switcher:** NL/EN buttons in header
2. **Translations:** Inline JavaScript object with all text
3. **Storage:** localStorage persists user preference
4. **Attributes:** `data-i18n` marks translatable elements

### Adding New Language

```javascript
const translations = {
  nl: { /* Dutch */ },
  en: { /* English */ },
  de: { /* Add German */ }
};
```

---

## 📱 Mobile Responsive

### Breakpoints (Tailwind)
- **Mobile:** < 640px (base styles)
- **Tablet:** 768px+ (`md:`)
- **Desktop:** 1024px+ (`lg:`)

### Optimizations
- ✅ Responsive typography (text-3xl → text-6xl)
- ✅ Adaptive spacing (py-12 → py-16)
- ✅ Mobile-optimized navigation
- ✅ Touch-friendly buttons (min 48px)
- ✅ Prevents iOS zoom on input focus

---

## 🔧 Customization

### Change Colors

**Main Landing:**
```css
.gradient-flow {
  background: linear-gradient(-45deg, #1e40af, #3b82f6, #06b6d4, #0891b2);
}
```

**HVAC:**
```css
.gradient-flow {
  background: linear-gradient(-45deg, #dc2626, #ef4444, #f97316, #fb923c);
}
```

### Modify Calculator Logic

Edit `hvac.html`:
```javascript
function updateCalculator() {
  const callbackCost = callbacks * 52 * 320; // €320 per callback
  const planningCost = techs * 5625;         // €5625 per tech
  // ... customize calculations
}
```

---

## 📊 Form Handling

### Submission Flow

1. User fills form → Clicks submit
2. JavaScript validates → Shows loading state
3. **Supabase:** Saves lead data (if configured)
4. **Email API:** Sends notification to `RECIPIENT_EMAIL`
5. **Success:** Always shown to user
6. **Modal:** Closes after 3 seconds

### Error Handling Philosophy

**Never show errors to users**
- All errors logged to console
- Vercel function logs capture issues
- Better UX (user doesn't see technical errors)
- Data captured via email even if Supabase fails

---

## 🚨 Troubleshooting

### Form Not Submitting
1. Check browser console for errors
2. Verify all required fields filled
3. Check Vercel function logs: `vercel logs [url]`

### Email Not Received
1. Verify `RESEND_API_KEY` in Vercel
2. Check `RECIPIENT_EMAIL` configured
3. Verify domain in Resend dashboard
4. Check spam folder

### Language Switcher Not Working
1. Check localStorage enabled in browser
2. Verify `data-i18n` attributes present
3. Check console for JavaScript errors

### Calculator Not Updating
1. Verify slider event listeners attached
2. Check element IDs match JavaScript
3. Console for errors

---

## 📈 Performance

### Current Metrics
- **CDN Assets:** Tailwind CSS, Lucide Icons
- **Images:** None (SVG logo inline)
- **JavaScript:** ~15KB inline per page
- **First Paint:** < 1s

### Optimizations
- ✅ Inline SVG logo (no HTTP request)
- ✅ Base64 favicon
- ✅ Minimal JavaScript
- ✅ No external images
- ✅ CDN-hosted libraries

---

## 🧪 Testing Checklist

### Desktop
- [ ] All 3 pages load correctly
- [ ] Navigation works (index ↔ hvac ↔ suppliersyncai)
- [ ] Logo click scrolls to top
- [ ] Language switchers work
- [ ] Calculator updates real-time
- [ ] Form submission successful
- [ ] Email received

### Mobile (iPhone SE - 375x667)
- [ ] Text readable, no overflow
- [ ] Buttons easily tappable
- [ ] Language switcher works
- [ ] Calculator sliders usable
- [ ] Form fields don't zoom on iOS
- [ ] Modal scrollable

### Browsers
- [ ] Chrome (latest)
- [ ] Safari (latest)
- [ ] Firefox (latest)
- [ ] Edge (latest)

---

## 📦 Deployment

### Vercel (Recommended)

```bash
# Login
vercel login

# Deploy to production
vercel --prod

# View logs
vercel logs [deployment-url]
```

### Manual Deployment

1. Build files (none needed - static HTML)
2. Upload to any static host
3. Configure environment variables
4. Set up serverless functions (if using Vercel alternatives)

---

## 🔐 Security

### Best Practices
- ✅ Supabase credentials in environment variables
- ✅ Email API key in environment variables
- ✅ Row Level Security (RLS) on database
- ✅ CORS properly configured
- ✅ No sensitive data in HTML source

### Considerations
- Rate limiting on forms (not implemented)
- Honeypot spam protection (not implemented)
- CSP headers (not implemented)

---

## 💰 Cost Breakdown

**Free Tier Usage:**
- **Vercel:** Free (personal projects)
- **Resend:** 3,000 emails/month free
- **Supabase:** 500MB database free
- **GitHub:** Free (public repos)

**Estimated Monthly Cost:** €0 (within free tiers)

---

## 📚 Documentation

- **[CLAUDE.md](CLAUDE.md)** - Complete project documentation (architecture, customization, replication)
- **[EMAIL_SETUP.md](EMAIL_SETUP.md)** - Email and database setup guide

---

## 🤝 Contributing

This is a private project for TechFlow24. For bugs or suggestions:

1. Create an issue on GitHub
2. Contact: info@techflow24.nl

---

## 📄 License

© 2025 TechFlow24 - All Rights Reserved

---

## 🔗 Links

- **Live Site:** https://www.techflow24.com
- **HVAC Page:** https://www.techflow24.com/hvac.html
- **SupplierSync AI:** https://www.techflow24.com/suppliersyncai.html
- **GitHub:** https://github.com/cftservices/techflow24-landing
- **Email:** info@techflow24.nl

---

## 🏗️ Built With

- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework
- [Lucide Icons](https://lucide.dev) - Beautiful open-source icons
- [Vercel](https://vercel.com) - Deployment and serverless functions
- [Resend](https://resend.com) - Email API for developers
- [Supabase](https://supabase.com) - Open-source Firebase alternative

---

## 📞 Support

For questions or support:
- **Email:** info@techflow24.nl
- **Issues:** [GitHub Issues](https://github.com/cftservices/techflow24-landing/issues)

---

**Last Updated:** 2025-10-02
**Version:** 2.0
**Maintained By:** TechFlow24
