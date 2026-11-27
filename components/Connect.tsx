"use client";
import { useState, FormEvent } from "react";
import { ArrowUpRight, Mail, Instagram, Linkedin, Briefcase, ShoppingBag } from "lucide-react";
import { site } from "@/lib/config";
import { ty } from "@/lib/styles";

// Every form field and every link sits in a row of the same height, so they line up.
// Row height: change "104px" in the <section ...> line below (--rh). One number controls every row.
const row = "md:flex md:h-[var(--rh)] md:flex-col md:justify-end";
const lab = "block text-xs uppercase tracking-widest text-mute";
const field = "mt-2 w-full border-b border-white/25 bg-transparent py-3 text-lg text-white placeholder:text-white/30 focus:border-accent focus:outline-none";

export default function Connect() {
  const [st, setSt] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const [msg, setMsg] = useState("");
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); setSt("sending"); const form = e.currentTarget;
    const d = Object.fromEntries(new FormData(form)) as Record<string, string>;
    const body = { ...d, budget: d.amount ? `${d.currency} ${d.amount}` : "" };
    try {
      const r = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      const j = await r.json();
      if (j.ok) { setSt("ok"); form.reset(); } else { setSt("err"); setMsg(j.error || "Something went wrong."); }
    } catch { setSt("err"); setMsg("Network error. Please try again."); }
  }
  const links = [[Instagram, "Instagram", site.instagram], [Briefcase, "Upwork", site.upwork], [Mail, "Gmail", `mailto:${site.email}`], [Linkedin, "LinkedIn", site.linkedin], [ShoppingBag, "Fiverr", site.fiverr]] as const;
  return (
    <section id="contact" style={{ "--rh": "104px" } as React.CSSProperties} className="bg-graphite px-6 pb-16 pt-28 md:px-12">
      <div className="mx-auto max-w-7xl">
        <h2 className={ty.connectTitle}>Let&apos;s <i className="text-accent">connect.</i></h2>
        <form onSubmit={submit} noValidate className="mt-16">
          <input type="text" name="hp_field" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px]" />
          <div className="grid gap-x-16 gap-y-10 md:grid-cols-2">
            <div className="space-y-7 md:space-y-0">
              <label className={`${lab} ${row}`}>Name<input name="name" required className={field} placeholder="Your name" /></label>
              <label className={`${lab} ${row}`}>Email<input name="email" type="email" required className={field} placeholder="you@email.com" /></label>
              <label className={`${lab} ${row}`}>Service
                <select name="service" required defaultValue="" className={field}><option value="" disabled>Choose a service</option>{["Graphic Design", "Video Editing", "AI Content Creation", "Web Development", "Something else"].map(o => (<option key={o} className="bg-ink">{o}</option>))}</select></label>
              <div className={row}><span className={lab}>Budget</span>
                <div className="flex gap-4"><select name="currency" aria-label="Currency" className={`${field} w-32`}><option className="bg-ink" value="USD $">USD ($)</option><option className="bg-ink" value="INR ₹">INR (₹)</option></select>
                  <input name="amount" inputMode="numeric" aria-label="Budget amount" className={field} placeholder="Amount" /></div></div>
              <label className={`${lab} ${row}`}>Project description<textarea name="message" required rows={1} className={`${field} resize-none`} placeholder="Tell me about your project..." /></label>
              <div className="mt-8 flex items-center gap-6 md:mt-0 md:h-[var(--rh)]">
                <button disabled={st === "sending"} className="rounded-full bg-accent px-10 py-4 font-medium text-ink transition-colors hover:bg-white disabled:opacity-60">{st === "sending" ? "Sending..." : "Send"}</button>
                <p role="status" aria-live="polite" className={st === "ok" ? "text-accent" : "text-[#F0A3A3]"}>{st === "ok" ? "Thank you! Your message has been sent." : st === "err" ? msg : ""}</p>
              </div>
            </div>
            <ul className="md:mt-0 md:translate-x-12">{links.map(([Icon, l, h]) => (
              <li key={l}><a href={h} className={`${ty.connectLink} md:h-[var(--rh)] md:items-end`}><span className="flex items-center gap-5"><Icon size={20} className="text-accent" />{l}</span><ArrowUpRight size={18} className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></a></li>))}</ul>
          </div>
        </form>
        <footer className="mt-24 flex flex-col gap-3 border-t border-white/15 py-10 text-sm text-mute md:flex-row md:justify-between">
          <p>Creative thinking. Thoughtful design. Digital possibilities.</p><p>© {new Date().getFullYear()} Sabarno Das</p></footer>
      </div>
    </section>
  );
}
