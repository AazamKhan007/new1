import { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Admin client (⚠️ service_role key only here, never in frontend!)
const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);

type SupabaseUser = {
  id: string;
  email?: string;
  app_metadata?: {
    provider?: string;
    providers?: string[];
  };
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // 🟢 Allow CORS (for local dev)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight request
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { email } = req.body as { email?: string };
    if (!email) {
      return res.status(400).json({ error: "Email required" });
    }

    const { data, error } = await supabaseAdmin.auth.admin.listUsers({ perPage: 1000 });
    if (error || !data) {
      console.error("listUsers error:", error);
      return res.status(500).json({ error: "Internal error" });
    }

    const user = data.users.find(
      (u) => u.email?.toLowerCase() === email.toLowerCase()
    ) as SupabaseUser | undefined;

    if (!user) {
      return res.status(200).json({ exists: false });
    }

    // Check provider
    let provider: "email" | "google" | "both" = "email";
    const meta = user.app_metadata || {};
    const providers = meta.providers || (meta.provider ? [meta.provider] : []);

    if (providers.length === 1 && providers[0] === "google") {
      provider = "google";
    } else if (providers.length === 1 && providers[0] === "email") {
      provider = "email";
    } else if (providers.includes("google") && providers.includes("email")) {
      provider = "email"; // treat "both" as email (reset allowed)
    }

    return res.status(200).json({ exists: true, provider });
  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ error: "Internal error" });
  }
}
