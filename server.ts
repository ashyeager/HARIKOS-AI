import express from "express";
import path from "path";
import { createClient } from "@supabase/supabase-js";
import { createServer as createViteServer } from "vite";
import * as dotenv from "dotenv";
import { requireAuth, AuthRequest } from "./src/middleware/auth.ts";
import { getOrCreateUser } from "./src/db/users.ts";
import { createContactRequest } from "./src/db/contactRequests.ts";
import compression from "compression";
import { Resend } from "resend";

dotenv.config();

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const adminEmail = process.env.ADMIN_EMAIL || 'ashyeagerhq@gmail.com';

async function startServer() {
  const app = express();
  const PORT = 3000;
  
  app.use(compression());
  app.use(express.json());

  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, business, email, service, message } = req.body;
      if (!name || !business || !email || !service || !message) {
        return res.status(400).json({ error: "All fields are required" });
      }
      
      const request = await createContactRequest({ name, business, email, service, message });
      
      res.json({ success: true, request });
    } catch (error) {
      console.error('Error saving contact request:', error);
      res.status(500).json({ error: 'Failed to save request' });
    }
  });

  const handleProjectInquiry = async (req: express.Request, res: express.Response) => {
    try {
      const { full_name, email, company, industry, service, budget, description, user_id } = req.body;

      if (!full_name || !email || !company || !industry || !service || !description) {
        return res.status(400).json({ error: "All required fields must be provided" });
      }

      if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
        return res.status(503).json({ error: 'Inquiry submissions are temporarily unavailable. Please contact us directly.' });
      }

      const inquiry = {
        user_id: user_id || null,
        full_name: full_name.trim(),
        email: email.trim(),
        company: company.trim(),
        industry,
        service,
        budget: budget || null,
        description: description.trim(),
        status: "New",
        created_at: new Date().toISOString(),
      };

      const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
        auth: { persistSession: false, autoRefreshToken: false },
      });
      const { error: insertError } = await supabase.from("project_requests").insert(inquiry);
      if (insertError) {
        console.error('Supabase inquiry insert failed:', insertError);
        return res.status(500).json({ error: 'We could not save your inquiry right now.' });
      }

      if (resend && process.env.RESEND_API_KEY) {
        await resend.emails.send({
          from: "HARIKOS AI <onboarding@resend.dev>",
          to: [adminEmail],
          subject: "New HARIKOS Project Inquiry",
          html: `
            <h3>New project request received.</h3>
            <p><strong>Name:</strong> ${full_name}</p>
            <p><strong>Company:</strong> ${company}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Industry:</strong> ${industry}</p>
            <p><strong>Service:</strong> ${service}</p>
            <p><strong>Budget:</strong> ${budget || 'Not specified'}</p>
            <p><strong>Project Description:</strong></p>
            <p>${description.replace(/\n/g, '<br/>')}</p>
            <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
          `,
        });

        await resend.emails.send({
          from: "HARIKOS AI <onboarding@resend.dev>",
          to: [email],
          subject: "We've received your HARIKOS AI project inquiry",
          html: `
            <p>Hello ${full_name},</p>
            <p>Thank you for contacting HARIKOS AI.</p>
            <p>We have successfully received your project inquiry.</p>
            <p>For faster communication:<br/>
            Instagram: @harikos.ai<br/>
            Phone: +968 95703688<br/>
            Email: ashyeagerhq@gmail.com</p>
            <p>HARIKOS AI</p>
          `,
        });
      }

      res.json({ success: true, message: "Project inquiry received successfully." });
    } catch (error) {
      console.error('Error processing lead:', error);
      res.status(500).json({ error: 'Failed to process project inquiry' });
    }
  };

  app.post("/api/project-requests", handleProjectInquiry);
  app.post("/api/leads", handleProjectInquiry);

  // Auth sync route
  app.post("/api/auth/sync", requireAuth as any, async (req: AuthRequest, res: express.Response) => {
    try {
      if (!req.user || !req.user.uid) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      
      const email = req.user.email || '';
      const user = await getOrCreateUser(req.user.uid, email);
      res.json({ success: true, user });
    } catch (error) {
      console.error('Error syncing user:', error);
      res.status(500).json({ error: 'Failed to sync user' });
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
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
