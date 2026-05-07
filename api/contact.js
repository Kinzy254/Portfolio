// api/contact.js
// Vercel Serverless Function — receives form data and sends email via Resend
// Docs: https://resend.com/docs   |   https://vercel.com/docs/functions

const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

// Your email — where you want to receive messages
const YOUR_EMAIL = 'kinzicharles@gmail.com';

export default async function handler(req, res) {

    // Only allow POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { name, email, service, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Name, email and message are required.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email address.' });
    }

    try {
        const { data, error } = await resend.emails.send({
            from: 'Portfolio Contact <charleskinzi@portfolio.com>', // ← use your verified domain later
            to: YOUR_EMAIL,
            replyTo: email,
            subject: `New enquiry${service ? ` — ${service}` : ''} from ${name}`,
            html: `
                <div style="font-family: 'Segoe UI', sans-serif; max-width: 560px; margin: 0 auto; color: #1c1530;">
                    <div style="background: #7c4dff; padding: 28px 32px; border-radius: 12px 12px 0 0;">
                        <h2 style="color: white; margin: 0; font-size: 1.3rem; font-weight: 600;">
                            New Portfolio Enquiry
                        </h2>
                    </div>
                    <div style="background: #ffffff; padding: 32px; border: 1px solid #e4dff7; border-top: none; border-radius: 0 0 12px 12px;">
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="padding: 10px 0; color: #7b7599; font-size: 0.8rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; width: 110px;">Name</td>
                                <td style="padding: 10px 0; color: #1c1530; font-weight: 500;">${escapeHtml(name)}</td>
                            </tr>
                            <tr style="border-top: 1px solid #f0eaff;">
                                <td style="padding: 10px 0; color: #7b7599; font-size: 0.8rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase;">Email</td>
                                <td style="padding: 10px 0;">
                                    <a href="mailto:${escapeHtml(email)}" style="color: #7c4dff; font-weight: 500;">${escapeHtml(email)}</a>
                                </td>
                            </tr>
                            ${service ? `
                            <tr style="border-top: 1px solid #f0eaff;">
                                <td style="padding: 10px 0; color: #7b7599; font-size: 0.8rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase;">Service</td>
                                <td style="padding: 10px 0; color: #1c1530; font-weight: 500;">${escapeHtml(service)}</td>
                            </tr>` : ''}
                        </table>

                        <div style="margin-top: 24px; padding-top: 24px; border-top: 1px solid #f0eaff;">
                            <p style="color: #7b7599; font-size: 0.8rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; margin: 0 0 10px;">Message</p>
                            <p style="color: #1c1530; line-height: 1.7; margin: 0; white-space: pre-wrap;">${escapeHtml(message)}</p>
                        </div>

                        <div style="margin-top: 28px; padding: 16px 20px; background: #f5f3ff; border-radius: 8px;">
                            <p style="margin: 0; font-size: 0.8rem; color: #7b7599;">
                                💡 Hit <strong>Reply</strong> to respond directly to ${escapeHtml(name)} at ${escapeHtml(email)}.
                            </p>
                        </div>
                    </div>

                    <p style="text-align: center; font-size: 0.72rem; color: #a09cc0; margin-top: 20px;">
                        Sent via charleskinzi.com portfolio contact form
                    </p>
                </div>
            `,
        });

        if (error) {
            console.error('Resend error:', error);
            return res.status(500).json({ error: 'Failed to send email. Please try again.' });
        }

        return res.status(200).json({ success: true, id: data.id });

    } catch (err) {
        console.error('Server error:', err);
        return res.status(500).json({ error: 'Server error. Please try again later.' });
    }
}

// Prevent XSS in email HTML
function escapeHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}