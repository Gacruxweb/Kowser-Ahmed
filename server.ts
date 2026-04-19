import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

    // API Route for sending email
    app.post("/api/contact", async (req, res) => {
      const { from, subject, message } = req.body;

      if (!from || !subject || !message) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const smtpUser = process.env.SMTP_USER;
      const smtpPass = process.env.SMTP_PASS;
      const destination = process.env.CONTACT_DESTINATION;

      if (!smtpUser || !smtpPass || !destination) {
        console.error("Missing SMTP configuration environment variables");
        return res.status(500).json({ error: "Server configuration error: Missing mail credentials" });
      }

      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        const mailOptions = {
          from: `"${from}" <${smtpUser}>`,
          to: destination,
          subject: `Contact Form: ${subject}`,
          text: `From: ${from}\n\nMessage:\n${message}`,
          replyTo: from
        };

        await transporter.sendMail(mailOptions);
        res.json({ success: true, message: "Sent successfully" });
      } catch (error: any) {
        console.error("Error sending email:", error);
        
        let userMessage = error.message || 'Unknown error';
        if (userMessage.includes('535-5.7.8') || userMessage.toLowerCase().includes('invalid login')) {
          userMessage = "Failed to sent";
        }
        
        res.status(500).json({ error: userMessage });
      }
    });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
