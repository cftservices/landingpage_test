# Email Notificaties Configureren

Het formulier verstuurt nu automatisch een email notificatie wanneer iemand het invult.

## Optie 1: Resend (Aanbevolen - Gratis tier)

### Stap 1: Maak een Resend account
1. Ga naar https://resend.com
2. Maak een gratis account (3000 emails/maand gratis)
3. Verifieer je email adres

### Stap 2: Voeg je domein toe
1. Ga naar "Domains" in Resend dashboard
2. Klik "Add Domain"
3. Voeg je domein toe (bijv. techflow24.nl)
4. Voeg de DNS records toe in Vercel:
   - Ga naar je domein in Vercel
   - Voeg de DNS records toe die Resend aangeeft (SPF, DKIM, DMARC)

### Stap 3: Maak een API Key
1. Ga naar "API Keys" in Resend dashboard
2. Klik "Create API Key"
3. Geef het een naam (bijv. "TechFlow24 Production")
4. Kopieer de API key (deze zie je maar 1 keer!)

### Stap 4: Configureer Vercel Environment Variables
1. Ga naar je project in Vercel dashboard
2. Ga naar Settings → Environment Variables
3. Voeg toe:
   - **RESEND_API_KEY**: [je Resend API key]
   - **RECIPIENT_EMAIL**: [jouw email adres waar je notificaties wilt ontvangen]

### Stap 5: Redeploy
1. Ga naar Deployments tab
2. Klik op de laatste deployment
3. Klik "Redeploy"

---

## Optie 2: Zonder Email Service (Logging Only)

Als je geen Resend configureert, wordt de email content gelogd in de Vercel function logs:

1. Ga naar je Vercel project
2. Ga naar Deployments → [laatste deployment] → Functions → send-email
3. Klik op "Logs" om de email content te zien

Dit is handig voor testen, maar je ontvangt geen echte emails.

---

## Email Formaat

De email die je ontvangt ziet er zo uit:

```
Subject: 🚨 Nieuwe Lead: [Bedrijfsnaam] - €[Berekend Verlies] verlies

Nieuwe TechFlow24 Lead Ontvangen!
═══════════════════════════════════════

📊 BEDRIJFSGEGEVENS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Bedrijf:          [Bedrijfsnaam]
Contactpersoon:   [Naam]
Email:            [Email]
Telefoon:         [Telefoon]
Aantal Monteurs:  [1-4, 5-15, of 15+]
Taal:             [Nederlands/English]

💰 BEREKEND VERLIES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Totaal Jaarlijks Verlies: €[Bedrag]
Per Dag:                  €[Bedrag]

🎯 GROOTSTE PIJNPUNT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[Callbacks/Planning/etc.]

⏰ ONTVANGEN OP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[Datum en tijd]

═══════════════════════════════════════
🚀 Neem binnen 2 uur contact op!
```

---

## Troubleshooting

### Ik ontvang geen emails
1. Check of RESEND_API_KEY correct is ingesteld in Vercel
2. Check of RECIPIENT_EMAIL correct is ingesteld
3. Check Vercel function logs voor errors
4. Check je spam folder

### Emails komen aan in spam
1. Zorg dat je domein correct is geconfigureerd in Resend
2. Voeg alle DNS records toe (SPF, DKIM, DMARC)
3. Wacht 24-48 uur voor DNS propagatie

### "Domain not verified" error
1. Ga naar Resend dashboard → Domains
2. Check of alle DNS records correct zijn toegevoegd
3. Klik "Verify Domain"

---

## Kosten

**Resend gratis tier:**
- 3000 emails/maand gratis
- 100 emails/dag gratis
- Daarna: $20/maand voor 50.000 emails

Voor een landingspagina is de gratis tier meer dan genoeg!
