// Vercel Serverless Function to send email notifications
export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        const {
            name,
            email,
            company,
            phone,
            technicians_range,
            biggest_painpoint,
            calculated_loss,
            language
        } = req.body;

        // Validate required fields
        if (!name || !email || !company || !phone) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Get recipient email from environment variable
        const recipientEmail = process.env.RECIPIENT_EMAIL || 'info@techflow24.nl';

        // Format email content
        const emailSubject = `🚨 Nieuwe Lead: ${company} - €${calculated_loss?.toLocaleString('nl-NL') || 'N/A'} verlies`;

        const emailBody = `
Nieuwe TechFlow24 Lead Ontvangen!
═══════════════════════════════════════

📊 BEDRIJFSGEGEVENS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Bedrijf:          ${company}
Contactpersoon:   ${name}
Email:            ${email}
Telefoon:         ${phone}
Aantal Monteurs:  ${technicians_range || 'Niet opgegeven'}
Taal:             ${language === 'nl' ? 'Nederlands' : 'English'}

💰 BEREKEND VERLIES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Totaal Jaarlijks Verlies: €${calculated_loss?.toLocaleString('nl-NL') || 'Niet berekend'}
Per Dag:                  €${calculated_loss ? Math.round(calculated_loss / 365).toLocaleString('nl-NL') : 'N/A'}

🎯 GROOTSTE PIJNPUNT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${biggest_painpoint || 'Niet opgegeven'}

⏰ ONTVANGEN OP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${new Date().toLocaleString('nl-NL', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'Europe/Amsterdam'
})}

═══════════════════════════════════════
🚀 Neem binnen 2 uur contact op!
`;

        // Use Resend API if key is available, otherwise just log
        const resendApiKey = process.env.RESEND_API_KEY;

        if (resendApiKey) {
            // Send via Resend API
            const response = await fetch('https://api.resend.com/emails', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${resendApiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    from: 'TechFlow24 <noreply@techflow24.nl>',
                    to: [recipientEmail],
                    subject: emailSubject,
                    text: emailBody,
                })
            });

            if (!response.ok) {
                const error = await response.text();
                console.error('Resend API error:', error);
                throw new Error('Failed to send email via Resend');
            }

            const data = await response.json();
            console.log('Email sent successfully via Resend:', data);

            return res.status(200).json({
                success: true,
                message: 'Email sent successfully',
                emailId: data.id
            });
        } else {
            // Fallback: Just log the email content
            console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
            console.log('EMAIL NOTIFICATION (No Resend API Key)');
            console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
            console.log('To:', recipientEmail);
            console.log('Subject:', emailSubject);
            console.log('Body:', emailBody);
            console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

            return res.status(200).json({
                success: true,
                message: 'Form submitted (email logging only - configure RESEND_API_KEY for actual emails)',
                note: 'Check Vercel function logs for email content'
            });
        }

    } catch (error) {
        console.error('Error in send-email function:', error);
        return res.status(500).json({
            error: 'Internal server error',
            message: error.message
        });
    }
}
