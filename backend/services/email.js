import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

export async function sendTicketEmail(email, ticket) {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Your Ticket</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
        .ticket { border: 2px dashed #000; padding: 20px; max-width: 500px; margin: 0 auto; }
        .qrcode { text-align: center; margin: 20px 0; }
        .footer { margin-top: 20px; font-size: 12px; color: #666; }
      </style>
    </head>
    <body>
      <div class="ticket">
        <h2>🎟️ Your Ticket</h2>
        <div class="qrcode">
          <img src="${ticket.qr_code}" alt="QR Code" width="200" height="200">
        </div>
        <p><strong>Ticket Code:</strong> ${ticket.ticket_code}</p>
        <p><strong>Name:</strong> ${ticket.attendee_name}</p>
        <div class="footer">
          <p>Present this QR code at the entrance. No need to print.</p>
          <p>Questions? Reply to this email.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const text = `
    Your Ticket
    ===========
    
    Ticket Code: ${ticket.ticket_code}
    Name: ${ticket.attendee_name}
    
    Present the QR code at the entrance. No need to print.
    
    Questions? Reply to this email.
  `;

  await transporter.sendMail({
    from: `"Ticketing" <${process.env.SMTP_FROM || 'tickets@example.com'}>`,
    to: email,
    subject: 'Your Ticket 🎟️',
    text: text,
    html: html
  });
}