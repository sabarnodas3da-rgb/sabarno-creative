import { NextResponse } from "next/server";
const hits = new Map<string, number[]>(); // simple in-memory rate limit (resets on restart)
const LIMIT = 5, WINDOW = 10 * 60 * 1000;
const esc = (s: string) => s.replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
const fail = (error: string, status: number) => NextResponse.json({ ok: false, error }, { status });
export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter(t => now - t < WINDOW);
  if (recent.length >= LIMIT) return fail("Too many messages. Please try again later.", 429);
  hits.set(ip, [...recent, now]);
  let b: Record<string, unknown>;
  try { b = await req.json(); } catch { return fail("Invalid request.", 400); }
  if (b.hp_field) return NextResponse.json({ ok: true }); // honeypot: hidden field only bots fill
  const s = (k: string, max: number) => String(b[k] ?? "").trim().slice(0, max);
  const name = s("name", 100), email = s("email", 200), service = s("service", 100), budget = s("budget", 100), message = s("message", 4000);
  if (name.length < 2) return fail("Please enter your name.", 400);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return fail("Please enter a valid email.", 400);
  if (!service) return fail("Please choose a service.", 400);
  if (message.length < 10) return fail("Please describe your project (at least 10 characters).", 400);
  const key = process.env.RESEND_API_KEY, to = process.env.CONTACT_TO_EMAIL;
  if (!key || !to) return fail("The contact form is not set up yet. Please email me directly.", 503);
  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST", headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: `Portfolio <${process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev"}>`, to: [to], reply_to: email,
        subject: `New inquiry: ${service} from ${name}`,
        html: `<h3>New inquiry</h3><p><b>Name:</b> ${esc(name)}<br><b>Email:</b> ${esc(email)}<br><b>Service:</b> ${esc(service)}<br><b>Budget:</b> ${esc(budget) || "n/a"}</p><p>${esc(message).replace(/\n/g, "<br>")}</p>` }),
    });
    if (!r.ok) throw new Error(String(r.status));
    return NextResponse.json({ ok: true });
  } catch { return fail("Could not send your message. Please try again or email me directly.", 502); }
}
