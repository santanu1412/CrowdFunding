const nodemailer = require('nodemailer');

/**
 * Configures Nodemailer to send transactional emails via SendGrid (or any SMTP).
 * Incorporates the "Dark Futurism" styling into the HTML template.
 * @param {Object} options - Contains { email, subject, message, url (optional) }
 */
const sendEmail = async (options) => {
  // 1. Create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER, // e.g., 'apikey' for SendGrid
      pass: process.env.EMAIL_PASS,
    },
  });

  // 2. Define the email template (Cyberpunk Aesthetic)
  const mailOptions = {
    from: `NexusFund Grid <${process.env.EMAIL_FROM}>`,
    to: options.email,
    subject: options.subject,
    html: `
      <div style="font-family: 'Courier New', monospace; max-width: 600px; margin: 0 auto; background-color: #0a0a0f; color: #e2e8f0; padding: 30px; border: 1px solid #1f1f2e; border-radius: 8px;">
        <h2 style="color: #00f5ff; text-align: center; font-size: 24px; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 20px; border-bottom: 1px solid rgba(0,245,255,0.2); padding-bottom: 10px;">
          NEXUS<span style="color: #fff;">FUND</span>
        </h2>
        
        <div style="background-color: rgba(255,255,255,0.05); padding: 20px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.1);">
          <p style="font-size: 16px; line-height: 1.6; color: #cbd5e1;">${options.message}</p>
          
          ${options.url ? `
            <div style="text-align: center; margin-top: 30px;">
              <a href="${options.url}" style="display: inline-block; padding: 12px 24px; background-color: #00f5ff; color: #000; text-decoration: none; font-weight: bold; border-radius: 4px; text-transform: uppercase; letter-spacing: 1px;">
                Initialize Action
              </a>
            </div>
          ` : ''}
        </div>
        
        <p style="text-align: center; color: #64748b; font-size: 12px; margin-top: 30px;">
          &copy; ${new Date().getFullYear()} NexusFund Protocol. Automated transmission.
        </p>
      </div>
    `,
  };

  // 3. Send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;