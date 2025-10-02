# TechFlow24 Landing Page - Claude AI Documentation

## Project Overview

This is a multi-sector landing page for TechFlow24, an AI transformation partner for Dutch businesses. The site features a main landing page with two sector-specific sub-pages: HVAC and SupplierSync AI.

**Live URLs:**
- Main: https://www.techflow24.com
- HVAC: https://www.techflow24.com/hvac.html
- SupplierSync AI: https://www.techflow24.com/suppliersyncai.html

**GitHub:** https://github.com/cftservices/techflow24-landing

---

## Architecture & Structure

### File Structure
```
/
├── index.html              # Main multi-sector landing page
├── hvac.html              # HVAC AI Platform page (NL/EN)
├── suppliersyncai.html    # SupplierSync AI page (NL/EN)
├── api/
│   ├── send-email.js      # Email notification API (Resend)
│   └── config.js          # Supabase config API
├── EMAIL_SETUP.md         # Email & Supabase configuration guide
└── CLAUDE.md             # This documentation file
```

### Tech Stack
- **Frontend:** HTML5, Tailwind CSS (CDN), Vanilla JavaScript
- **Icons:** Lucide Icons (CDN)
- **Backend:** Vercel Serverless Functions
- **Email:** Resend API
- **Database:** Supabase (optional)
- **Hosting:** Vercel
- **Version Control:** Git/GitHub

---

## Pages Documentation

### 1. index.html - Main Landing Page

**Purpose:** Multi-sector overview showcasing TechFlow24's AI solutions

**Key Features:**
- Animated gradient hero with blue color scheme
- 2 clickable solution cards (HVAC & SupplierSync AI)
- "Why TechFlow24" section with 3 value propositions
- CTA sections
- Professional footer with navigation
- Mobile-responsive design

**Design Elements:**
- Gradient animation: `linear-gradient(-45deg, #1e40af, #3b82f6, #06b6d4, #0891b2)`
- Hover effects on solution cards (translateY animation)
- Smooth scroll anchor links
- Logo clickable to scroll to top

**Navigation:**
- Click HVAC card → hvac.html
- Click SupplierSync AI card → suppliersyncai.html
- Logo click → scroll to top

---

### 2. hvac.html - HVAC AI Platform

**Purpose:** Landing page for Klimaattechniek (HVAC) businesses in Netherlands

**Key Features:**
- **Bilingual:** Dutch (NL) / English (EN) with language switcher
- **8 Pain Points:** €273k annual loss breakdown
- **ROI Calculator:** Interactive sliders for custom calculations
- **Contact Form:** Modal with Supabase integration + Email notifications
- **Mobile-friendly:** Responsive design for all screen sizes

**Pain Points (8 sections):**
1. Callback Crisis - €95k loss
2. Manual Planning - €45k loss
3. Paper-Based Work Orders - €28k loss
4. Customer Not Home - €32k loss
5. Manual Temperature Logging - €18k loss
6. F-Gas Compliance - €15k loss
7. No Performance Insight - €25k missed revenue
8. Customer Communication Gaps - €15k loss

**Calculator:**
- Number of technicians slider (1-50)
- Callbacks per week slider (0-20)
- No-show rate slider (0-30%)
- Real-time calculation of annual loss
- Displays breakdown by category

**Contact Form:**
- Fields: Name, Email, Company, Phone, Technicians range, Pain point
- Privacy checkbox (required)
- Sends to Supabase (if configured)
- Sends email via `/api/send-email`
- Always shows success message to user
- 5 CTA buttons throughout page open same modal

**Language System:**
- localStorage key: `hvacLang`
- Default: Dutch (nl)
- Translations object with nl/en keys
- `data-i18n` attributes for translatable elements
- `setLanguage(lang)` function switches language

---

### 3. suppliersyncai.html - SupplierSync AI

**Purpose:** "Coming Soon" page for procurement intelligence platform

**Key Features:**
- **Bilingual:** Dutch (NL) / English (EN) with language switcher
- **Mobile-friendly:** Fully responsive design
- **4 Feature Cards:**
  1. Product-Centric View (15,420 products)
  2. Supplier-Centric View (284 suppliers)
  3. AI-Powered Intelligence (87.4% match score)
  4. Real-Time Monitoring (23 anomalies)

**Language System:**
- localStorage key: `supplierSyncLang`
- Default: Dutch (nl)
- Same translation pattern as hvac.html

**Design:**
- Blue/indigo gradient hero
- Border-colored feature cards with hover effects
- Coming Soon badge
- Email CTA button
- Minimal footer with navigation links

---

## API Endpoints

### /api/send-email.js

**Purpose:** Send email notifications when form is submitted

**Environment Variables Required:**
- `RESEND_API_KEY` - Resend API key for sending emails
- `RECIPIENT_EMAIL` - Email address to receive notifications (default: info@techflow24.nl)
- `FROM_DOMAIN` - Domain for sender email (default: plcholland.com)

**Input (POST body):**
```javascript
{
  name: string,
  email: string,
  company: string,
  phone: string,
  technicians_range: string,
  biggest_painpoint: string,
  calculated_loss: number,
  language: string,
  num_technicians: number,
  callbacks_per_week: number,
  noshow_rate: number
}
```

**Output:**
```javascript
{
  success: true,
  message: "Email sent successfully",
  emailId: "re_..." // Resend email ID
}
```

**Email Format:**
- Subject: `🚨 Nieuwe Lead: [Company] - €[Loss] verlies`
- Contains: Business details, calculated loss breakdown, pain point, timestamp
- Sent from: `TechFlow24 <noreply@[FROM_DOMAIN]>`
- Sent to: `[RECIPIENT_EMAIL]`

**Fallback Behavior:**
- If no `RESEND_API_KEY`: Logs email content to Vercel function logs
- Never throws errors to frontend (always returns 200)

---

### /api/config.js

**Purpose:** Serve Supabase configuration from environment variables

**Environment Variables (Optional):**
- `SUPABASE_URL` - Supabase project URL
- `SUPABASE_ANON_KEY` - Supabase anon/public key

**Output:**
```javascript
{
  configured: true,
  supabaseUrl: "https://...",
  supabaseAnonKey: "eyJ..."
}
```

**Security:**
- Credentials NOT hardcoded in HTML
- Fetched dynamically on page load
- Cached for 1 hour (Cache-Control header)
- If not configured, form still works via email only

---

## Configuration Guide

### Step 1: Clone and Setup

```bash
# Clone repository
git clone https://github.com/cftservices/techflow24-landing.git
cd techflow24-landing

# Install Vercel CLI (if needed)
npm install -g vercel

# Login to Vercel
vercel login
```

### Step 2: Email Configuration (Resend)

1. **Create Resend Account:** https://resend.com/signup
2. **Verify Domain:**
   - Add domain in Resend dashboard
   - Add DNS records (SPF, DKIM, DMARC) in Vercel DNS settings
   - Wait for verification
3. **Create API Key:**
   - Go to API Keys in Resend
   - Create new key
   - Copy the key (shown only once!)

### Step 3: Vercel Environment Variables

Go to Vercel Dashboard → Settings → Environment Variables

**Required:**
```
RESEND_API_KEY = re_... (your Resend API key)
RECIPIENT_EMAIL = your@email.com
FROM_DOMAIN = plcholland.com (or your verified domain)
```

**Optional (for Supabase):**
```
SUPABASE_URL = https://xxx.supabase.co
SUPABASE_ANON_KEY = eyJ...
```

### Step 4: Supabase Setup (Optional)

1. **Create Supabase Project:** https://supabase.com
2. **Create Tables:**

```sql
-- HVAC Leads table
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
  callbacks_per_week INTEGER,
  noshow_rate INTEGER,
  calculated_loss INTEGER,
  language TEXT DEFAULT 'nl'
);

-- Calculator Sessions table (for analytics)
CREATE TABLE hvac_calculator_sessions (
  id BIGSERIAL PRIMARY KEY,
  session_id TEXT,
  num_technicians INTEGER,
  callbacks_per_week INTEGER,
  noshow_rate INTEGER,
  calculated_total_loss INTEGER,
  callback_cost INTEGER,
  planning_cost INTEGER,
  paperwork_cost INTEGER,
  noshow_cost INTEGER,
  other_cost INTEGER,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);
```

3. **Get Credentials:**
   - Settings → API
   - Copy `Project URL` → `SUPABASE_URL`
   - Copy `anon public` key → `SUPABASE_ANON_KEY`

4. **Set Row Level Security (RLS):**
```sql
-- Enable RLS
ALTER TABLE hvac_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE hvac_calculator_sessions ENABLE ROW LEVEL SECURITY;

-- Allow INSERT for anonymous users
CREATE POLICY "Allow anonymous insert" ON hvac_leads
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow anonymous insert" ON hvac_calculator_sessions
  FOR INSERT TO anon WITH CHECK (true);
```

### Step 5: Deploy

```bash
# Deploy to production
vercel --prod

# Or push to GitHub (auto-deploys if connected)
git add .
git commit -m "Initial deploy"
git push origin master
```

---

## Customization Guide

### Changing Colors

**Main Landing (index.html):**
```css
/* Hero gradient */
.gradient-flow {
  background: linear-gradient(-45deg, #1e40af, #3b82f6, #06b6d4, #0891b2);
}
```

**HVAC (hvac.html):**
```css
/* Hero gradient - red/orange theme */
.gradient-flow {
  background: linear-gradient(-45deg, #dc2626, #ef4444, #f97316, #fb923c);
}
```

**SupplierSync (suppliersyncai.html):**
```html
<!-- Hero section -->
<section class="bg-gradient-to-r from-blue-600 to-indigo-600">
```

### Adding New Language

1. **Add translations to `translations` object:**
```javascript
const translations = {
  nl: { /* existing */ },
  en: { /* existing */ },
  de: { /* add German */ }
};
```

2. **Add language button:**
```html
<div class="lang-switch">
  <div class="lang-btn" data-lang="nl" onclick="setLanguage('nl')">NL</div>
  <div class="lang-btn" data-lang="en" onclick="setLanguage('en')">EN</div>
  <div class="lang-btn" data-lang="de" onclick="setLanguage('de')">DE</div>
</div>
```

### Changing Form Fields

**Edit hvac.html form section:**
```html
<form id="contactForm">
  <!-- Add new field -->
  <div>
    <label>Custom Field *</label>
    <input type="text" id="customField" required>
  </div>
</form>
```

**Update form submission:**
```javascript
const formData = {
  // existing fields...
  customField: document.getElementById('customField').value
};
```

**Update Supabase table:**
```sql
ALTER TABLE hvac_leads ADD COLUMN custom_field TEXT;
```

### Changing Calculator Logic

**Edit hvac.html calculator function:**
```javascript
function updateCalculator() {
  const techs = parseInt(techniciansSlider.value);
  const callbacks = parseInt(callbacksSlider.value);
  const noshowRate = parseInt(noshowSlider.value);

  // Modify these calculations
  const callbackCost = callbacks * 52 * 320; // €320 per callback
  const planningCost = techs * 5625;         // €5625 per tech/year
  // ... etc
}
```

---

## Design System

### Logo & Branding

**Logo SVG:**
```svg
<svg viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="45" fill="#1e40af"/>
  <path d="M55 25L35 50H50L45 75L65 50H50L55 25Z"
        fill="#fbbf24" stroke="#fbbf24" stroke-width="2"/>
</svg>
```

**Colors:**
- Primary Blue: `#1e40af` (#1e40af)
- Lightning Yellow: `#fbbf24` (#fbbf24)
- Red (HVAC): `#dc2626` to `#fb923c`
- Blue (SupplierSync): `#3b82f6` to `#0891b2`

**Favicon:**
- Base64 encoded SVG in `<link rel="icon">` tag
- Same logo design as header

### Typography

**Tailwind Classes:**
- Hero title: `text-4xl md:text-6xl lg:text-7xl font-black`
- Section title: `text-3xl md:text-5xl font-bold`
- Body text: `text-lg md:text-xl`
- Small text: `text-sm md:text-base`

**Fonts:**
- System fonts (default Tailwind sans-serif stack)

### Spacing

**Sections:**
- Padding: `py-12 md:py-16` or `py-16 md:py-24`
- Container: `max-w-6xl mx-auto` or `max-w-5xl mx-auto`

**Cards:**
- Padding: `p-4 md:p-6` or `p-6 md:p-8`
- Gap: `gap-4 md:gap-6` or `gap-6 md:gap-8`

### Animations

**Gradient Flow:**
```css
@keyframes gradientFlow {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
```

**Hover Effects:**
```css
.solution-card:hover {
  transform: translateY(-12px);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}
```

**Fade In:**
```css
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
```

---

## Mobile Responsiveness

### Breakpoints (Tailwind)
- Mobile: `< 640px` (base styles)
- Tablet: `md:` (768px+)
- Desktop: `lg:` (1024px+)

### Mobile Optimizations

**Typography:**
```html
<!-- Responsive text sizes -->
<h1 class="text-3xl md:text-5xl lg:text-6xl">

<!-- Hide on mobile, show on desktop -->
<span class="hidden sm:block">Desktop only</span>
```

**Spacing:**
```html
<!-- Responsive padding -->
<section class="py-12 md:py-16">

<!-- Responsive gap -->
<div class="gap-4 md:gap-6 lg:gap-8">
```

**Layout:**
```html
<!-- Stack on mobile, grid on desktop -->
<div class="grid grid-cols-1 md:grid-cols-2">
```

**Icons:**
```html
<!-- Smaller icons on mobile -->
<i data-lucide="icon" class="h-5 w-5 md:h-6 md:w-6"></i>
```

### Touch Targets
- Minimum button size: `px-6 py-3` (48px+ height)
- Clickable cards with hover states removed on mobile
- Language switcher optimized for touch

---

## Form Handling Flow

### User Flow (hvac.html)

1. **User fills form** → Clicks "Neem Contact Met Mij Op"
2. **Form validation** → Browser validates required fields
3. **Submit event** → JavaScript catches form submit
4. **Disable button** → Shows "Verzenden..." text
5. **Supabase insert** (if configured) → Saves lead data
6. **Email API call** → `/api/send-email` sends notification
7. **Success message** → Always shown (even if API fails)
8. **Form reset** → Clear all fields
9. **Modal closes** → After 3 seconds

### Error Handling

**Philosophy:** Never show errors to users
- Supabase fails → Log to console, continue
- Email API fails → Log to console, continue
- Always show success message
- All errors logged for debugging

**Why?**
- Better user experience
- Data still captured (email or Supabase might work)
- Errors visible in Vercel function logs
- User doesn't get confused or frustrated

### Debug Process

**Check Vercel Function Logs:**
```bash
# View logs for specific deployment
vercel logs [deployment-url]

# Or in Vercel dashboard:
# Deployments → [deployment] → Functions → send-email → Logs
```

**Console Logs in Browser:**
```javascript
// Form submission status
console.log('Form submission status:', { supabaseSuccess, emailSuccess });

// Email API response
console.log('Email API response:', emailResult);
```

---

## Git Workflow

### Commit Message Format

```
<type>: <subject>

<body>

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

**Types:**
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Formatting, missing semi colons, etc
- `refactor:` Code restructuring
- `chore:` Updating build tasks, package manager configs, etc

### Branch Strategy

**Main Branch:** `master`
- Always deployable
- Direct commits for small changes
- Pull requests for major features

**No Feature Branches Currently**
- Single developer workflow
- Direct commits to master
- Vercel auto-deploys on push

---

## Testing Checklist

### Before Deploy

**Desktop (1920x1080):**
- [ ] All 3 pages load correctly
- [ ] Navigation links work (index ↔ hvac ↔ suppliersyncai)
- [ ] Logo click scrolls to top
- [ ] Language switchers work (hvac, suppliersyncai)
- [ ] HVAC calculator updates in real-time
- [ ] HVAC form submission shows success
- [ ] All 5 CTA buttons open modal (hvac)
- [ ] Email received at RECIPIENT_EMAIL
- [ ] Supabase data saved (if configured)

**Mobile (375x667 - iPhone SE):**
- [ ] All text readable (no overflow)
- [ ] Buttons easily tappable (min 48px)
- [ ] Language switcher works
- [ ] Calculator sliders usable
- [ ] Form fields not zooming on iOS
- [ ] Modal scrollable if needed
- [ ] Images/icons properly sized

**Tablet (768x1024 - iPad):**
- [ ] Layout uses md: breakpoint styles
- [ ] 2-column grids work correctly
- [ ] Touch interactions smooth

### Cross-Browser

**Required:**
- [ ] Chrome (latest)
- [ ] Safari (latest)
- [ ] Firefox (latest)
- [ ] Edge (latest)

**Mobile:**
- [ ] Safari iOS
- [ ] Chrome Android

---

## Performance Optimizations

### Current Setup

**CDN Resources:**
- Tailwind CSS: Loaded from CDN (not ideal for production)
- Lucide Icons: Loaded from CDN
- Supabase JS: Loaded from CDN

**Images:**
- Logo: Inline SVG (no HTTP request)
- Favicon: Base64 encoded SVG
- No external images

**JavaScript:**
- Vanilla JS (no framework overhead)
- ~15KB inline JavaScript per page
- Translations inline (no JSON fetch)

### Future Optimizations

**If needed:**
1. Build Tailwind CSS (reduce from 3MB to ~10KB)
2. Bundle and minify JavaScript
3. Add service worker for offline support
4. Implement lazy loading for below-fold content
5. Add preconnect for CDN resources

---

## Troubleshooting

### Form Doesn't Submit

**Check:**
1. Browser console for errors
2. All required fields filled
3. Privacy checkbox checked
4. Vercel function logs: `vercel logs [url]`

**Common Issues:**
- CORS errors → Check API CORS headers
- Supabase errors → Check RLS policies
- Email not sent → Check RESEND_API_KEY

### Language Switcher Not Working

**Check:**
1. Browser localStorage enabled
2. Console for JavaScript errors
3. `data-i18n` attributes present
4. Translations object has correct keys

### Calculator Not Updating

**Check:**
1. Slider event listeners attached
2. `updateCalculator()` function called
3. Element IDs match JavaScript selectors
4. Console for JavaScript errors

### Email Not Received

**Check:**
1. RESEND_API_KEY configured in Vercel
2. RECIPIENT_EMAIL configured
3. Domain verified in Resend
4. Check spam folder
5. Vercel function logs for errors

### Supabase Not Saving

**Check:**
1. SUPABASE_URL and SUPABASE_ANON_KEY configured
2. Table exists with correct columns
3. RLS policies allow INSERT
4. Browser console for Supabase errors

---

## Deployment Commands

### Vercel CLI

```bash
# Deploy to production
vercel --prod

# Deploy to preview
vercel

# View logs
vercel logs [deployment-url]

# List deployments
vercel ls

# Set environment variable
vercel env add RESEND_API_KEY production
```

### Git Commands

```bash
# Check status
git status

# Add all changes
git add .

# Commit with message
git commit -m "Your message"

# Push to GitHub
git push origin master

# View recent commits
git log --oneline -10
```

---

## Contact & Support

**Domain:** techflow24.com
**Email:** info@techflow24.nl
**GitHub:** https://github.com/cftservices/techflow24-landing
**Vercel:** cftservicesnl-3296s-projects/landing-page

**Email Provider:** Resend (plcholland.com verified domain)
**Database:** Supabase (optional)
**Hosting:** Vercel

---

## Version History

**Current Version:** 2.0 (Multi-sector redesign)

### Major Updates:
- **v2.0** (2025-10-02): Multi-sector landing page with HVAC and SupplierSync AI
- **v1.5** (2025-10-02): Bilingual support for SupplierSync AI
- **v1.4** (2025-10-02): Move Supabase credentials to environment variables
- **v1.3** (2025-10-02): Email notification system with Resend API
- **v1.2** (2025-10-02): HVAC to Klimaattechniek (NL translation)
- **v1.1** (2025-10-02): Favicon and clickable logo
- **v1.0** (2025-09-25): Initial HVAC landing page

---

## Replication Instructions

### To recreate this project from scratch:

1. **Setup Repository:**
```bash
mkdir techflow24-landing
cd techflow24-landing
git init
```

2. **Create Files:**
- Copy `index.html`, `hvac.html`, `suppliersyncai.html` from this repo
- Create `api/send-email.js` and `api/config.js`
- Add `EMAIL_SETUP.md` and this `CLAUDE.md`

3. **Configure Vercel:**
```bash
vercel
# Link to Vercel project
# Add environment variables in Vercel dashboard
```

4. **Setup Resend:**
- Create account at resend.com
- Add and verify domain
- Create API key
- Add to Vercel env vars

5. **Setup Supabase (optional):**
- Create project at supabase.com
- Run SQL schema (see Step 4 in Configuration Guide)
- Get credentials
- Add to Vercel env vars

6. **Deploy:**
```bash
vercel --prod
```

7. **Connect Domain:**
- In Vercel dashboard, add custom domain
- Update DNS records
- Wait for SSL certificate

---

## Important Notes

### Security Considerations

**✅ Secure:**
- Supabase credentials in environment variables (not hardcoded)
- Email API key in environment variables
- RLS policies on Supabase tables
- CORS properly configured
- ANON key is public-safe (with RLS)

**⚠️ Consider:**
- Rate limiting on form submissions (not implemented)
- Honeypot field for spam protection (not implemented)
- CSP headers for XSS protection (not implemented)

### Cost Breakdown

**Free Tier:**
- Vercel: Free for personal projects
- Resend: 3,000 emails/month free
- Supabase: 500MB database, 2GB bandwidth free
- GitHub: Free for public repos

**Estimated Monthly Cost:** €0 (within free tiers)

### Maintenance

**Regular Tasks:**
- Monitor Vercel function logs for errors
- Check Resend email delivery rate
- Review Supabase storage usage
- Update dependencies (Tailwind, Lucide)
- Test forms monthly

**Quarterly:**
- Review and optimize performance
- Check mobile responsiveness
- Update content if needed
- Backup Supabase data

---

## Claude AI Prompt for Replication

**Use this prompt to replicate the project:**

```
I want to create a multi-sector landing page for TechFlow24, an AI transformation partner.

Structure:
1. Main landing page (index.html) with 2 clickable sector cards:
   - HVAC AI Platform (red/orange theme)
   - SupplierSync AI (blue theme)

2. HVAC sub-page (hvac.html):
   - Bilingual NL/EN
   - 8 pain points showing €273k annual loss
   - Interactive ROI calculator
   - Contact form with email notifications
   - Mobile-responsive

3. SupplierSync AI sub-page (suppliersyncai.html):
   - Bilingual NL/EN
   - "Coming Soon" page
   - 4 feature cards (Product-Centric, Supplier-Centric, AI Intelligence, Real-Time Monitoring)
   - Mobile-responsive

Tech stack:
- Tailwind CSS (CDN)
- Lucide Icons (CDN)
- Vercel Serverless Functions
- Resend API for emails
- Supabase (optional)

Features needed:
- Language switcher (NL/EN) with localStorage
- Email notifications via Resend API
- Supabase integration from environment variables
- Form validation and error handling
- Mobile-first responsive design
- Smooth animations and hover effects
- Professional gradient backgrounds

Follow the CLAUDE.md documentation structure and create all necessary files:
- index.html (main landing)
- hvac.html (HVAC page)
- suppliersyncai.html (SupplierSync page)
- api/send-email.js (email API)
- api/config.js (Supabase config API)
- EMAIL_SETUP.md (setup guide)

Ensure all forms work without errors, language switching is smooth, and the design is professional and mobile-friendly.
```

---

## End of Documentation

**Last Updated:** 2025-10-02
**Maintained By:** TechFlow24
**AI Assistant:** Claude (Anthropic)

For questions or issues, contact: info@techflow24.nl
