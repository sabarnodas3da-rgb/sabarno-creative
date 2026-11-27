"use client";
import { useRef, useState, FormEvent } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent, MotionValue } from "framer-motion";
import { ArrowUpRight, Mail, Instagram, Linkedin, Briefcase, ShoppingBag } from "lucide-react";
import { site } from "@/lib/config";
import { ty } from "@/lib/styles";
import Connect from "./Connect";

const ease = [0.22, 1, 0.36, 1] as const;
const Pill = ({ href, children, ghost }: { href: string; children: React.ReactNode; ghost?: boolean }) => (
  <a href={href} className={`group inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-medium md:px-10 md:py-5 md:text-lg transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${ghost ? "border border-white/25 text-white hover:border-accent hover:text-accent" : "bg-accent text-ink hover:bg-white"}`}>
    {children}<ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></a>
);

function Nav() {
  const l = [["Why me", "#why"], ["Work", "#work"], ["Softwares", "#softwares"]];
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-ink/80 backdrop-blur">
      <nav aria-label="Main" className="mx-auto flex max-w-[1500px] items-center justify-between px-6 py-5 md:px-10">
        <a href="#top" className={ty.navLogo}>Sabarno Das</a>
        <ul className="hidden gap-9 md:flex">{l.map(([a, h]) => (<li key={h}><a href={h} className={`${ty.navLink} transition-colors hover:text-accent`}>{a}</a></li>))}</ul>
        <a href="#contact" className="rounded-full border border-accent px-5 py-2 text-sm text-accent transition-colors hover:bg-accent hover:text-ink">Hire me</a>
      </nav>
    </header>
  );
}

// Put your photo in the "public" folder and name it sabarno.jpg
function Portrait() {
  const srcs = ["/sabarno.png", "/sabarno.jpg"];
  const [n, setN] = useState(0);
  return n < srcs.length ? (/* eslint-disable-next-line @next/next/no-img-element */
    <img src={srcs[n]} alt="Sabarno Das" onError={() => setN(n + 1)} className="block h-auto w-full max-w-2.15xl object-contain" />
  ) : (<div className="mx-auto flex aspect-[3/4] w-full max-w-2.15xl items-center justify-center font-display text-8xl text-white/15">SD</div>);
}

function Hero() {
  const t = (k: number) => ({ initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, ease, delay: 1.1 + k * 0.15 } });
  return (
    <section id="top" className="flex min-h-screen bg-ink px-6 pt-24 md:px-10">
      <div className="mx-auto grid w-full max-w-[1500px] items-end gap-8 md:grid-cols-[1.15fr_1fr]">
        <motion.div className="self-end md:-translate-x-18" initial={{ opacity: 0, scale: 1.06 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.3, ease }}><Portrait /></motion.div>
        <div className="self-center pb-16">
          <motion.p {...t(0)} className={ty.heroEyebrow}>Independent Creative Professional</motion.p>
          <motion.h1 {...t(1)} className={ty.heroName}>Sabarno<br className="md:hidden" /> Das</motion.h1>
          <motion.p {...t(2)} className={ty.heroText}>I transform ideas into engaging digital experiences through video editing, graphic design, AI-powered content and modern web development.</motion.p>
          <motion.div {...t(3)} className="mt-9 flex flex-wrap items-center gap-4"><Pill href="#work">Explore What I Do</Pill><Pill href="#contact" ghost>Let&apos;s Work Together</Pill></motion.div>
          {site.available && <motion.p {...t(4)} className={ty.heroNote}><span className="h-2 w-2 rounded-full bg-accent" />Available for freelance work</motion.p>}
        </div>
      </div>
    </section>
  );
}

function Word({ w, i, n, p }: { w: string; i: number; n: number; p: MotionValue<number> }) {
  const c = useTransform(p, [(i / n) * 0.9, ((i + 1) / n) * 0.9 + 0.1], ["#4D4D4D", "#FFFFFF"]);
  return <motion.span style={{ color: c }} className="mr-[0.25em] inline-block">{w}</motion.span>;
}
// The page holds still while the words light up, then scrolling continues
function Why() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const words = "I turn ideas into polished, memorable work with thoughtful design and creative precision. Every project begins with listening: your goals, your audience and the story you want to tell. From the first concept to the final delivery, I focus on clear communication, careful details and a modern finish that feels right. Whatever the project, my approach stays the same: your vision comes first, and the result should be made to stand out and last.".split(" ");
  return (
    <section id="why" ref={ref} className="relative h-[300vh] bg-graphite">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center px-6 md:px-12">
        <div className="w-full md:max-w-[64vw]"><p className={ty.whyLabel}>Why choose me</p>
        <p className={ty.whyText}>{words.map((w, i) => (<Word key={i} w={w} i={i} n={words.length} p={scrollYProgress} />))}</p></div>
      </div>
    </section>
  );
}

// Your laptop pictures: put them in public/laptops as graphic.png, video.png, ai.png, web.png
function LaptopImg({ file }: { file: string }) {
  const [ok, setOk] = useState(true);
  return ok ? (/* eslint-disable-next-line @next/next/no-img-element */
    <img src={`/laptops/${file}.png`} alt="" onError={() => setOk(false)} className="mx-auto w-full max-w-[900px] drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)]" />
  ) : (<div className="mx-auto flex aspect-[16/10] w-full max-w-[900px] items-center justify-center rounded-xl border border-dashed border-white/30 text-sm text-white/50">Add public/laptops/{file}.png</div>);
}

const slides = [
  { w: "Graphic Design", bg: "#0B3A66", f: "graphic", t: "Brands that get remembered", d: "Logos, brand identities, posters, packaging and social creatives, built on clear ideas and careful typography." },
  { w: "Video Editing", bg: "#2A1A6E", f: "video", t: "Stories that keep people watching", d: "Reels, YouTube videos, promos and corporate films, cut with rhythm, colour and motion graphics." },
  { w: "AI Content", bg: "#B5543A", f: "ai", t: "New ideas, made visible faster", d: "AI-assisted imagery, video and storytelling, directed by a human eye for taste and quality." },
  { w: "Web Development", bg: "#1F2A38", f: "web", t: "Websites that feel designed", d: "Portfolio sites and landing pages, responsive, fast and built around your story." },
];
function Showcase() {
  const ref = useRef<HTMLElement>(null);
  const [a, setA] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", v => setA(Math.min(3, Math.floor(v * 4))));
  const go = (i: number) => ref.current && window.scrollTo({ top: ref.current.offsetTop + i * window.innerHeight + 4, behavior: "smooth" });
  const s = slides[a];
  return (
    <section id="work" ref={ref} className="relative h-[400vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {slides.map((x, i) => (<div key={i} className="absolute inset-0 transition-opacity duration-700" style={{ background: x.bg, opacity: a === i ? 1 : 0 }} />))}
        <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_240px_rgba(0,0,0,0.8)]" />
        <AnimatePresence mode="wait"><motion.p key={a} className={ty.slideWord} initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -60, opacity: 0 }} transition={{ duration: 0.5, ease }}>{s.w}</motion.p></AnimatePresence>
        <div className="relative mx-auto grid h-full max-w-[1600px] content-end items-end gap-6 px-6 pb-10 pt-16 md:grid-cols-[0.8fr_1.9fr_0.6fr] md:px-10">
          <div className="order-2 md:order-1">
            <AnimatePresence mode="wait"><motion.div key={a} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -24 }} transition={{ duration: 0.45, ease }}>
              <h2 className={ty.slideTitle}>{s.t}</h2>
              <p className={ty.slideText}>{s.d}</p></motion.div></AnimatePresence>
            <div className="mt-5 flex items-center gap-5"><Pill href="#contact">Hire me</Pill>
              <div className="flex gap-2">{slides.map((_, i) => (<button key={i} onClick={() => go(i)} aria-label={`Show slide ${i + 1}`} className={`h-2 rounded-full transition-all ${a === i ? "w-6 bg-white" : "w-2 bg-white/40"}`} />))}</div></div>
          </div>
          <div className="order-1 md:order-2">
            <AnimatePresence mode="wait"><motion.div key={a} initial={{ opacity: 0, y: 30, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5, ease }} className="mx-auto w-full max-w-[900px]">
              <LaptopImg file={s.f} /></motion.div></AnimatePresence>
          </div>
          <div className="order-3 hidden space-y-3 md:block">{slides.map((x, i) => (<button key={x.w} onClick={() => go(i)} className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-colors ${a === i ? "border-accent bg-black/40 text-white" : "border-white/15 text-white/60 hover:border-white/40"}`}><span className="h-3 w-3 rounded-full" style={{ background: x.bg, boxShadow: "0 0 0 1px rgba(255,255,255,.4)" }} />{x.w}</button>))}</div>
        </div>
      </div>
    </section>
  );
}

const soft = [["Photoshop", "photoshop"], ["Illustrator", "illustrator"], ["CorelDRAW", "coreldraw"], ["Premiere Pro", "premiere"], ["After Effects", "aftereffects"], ["ChatGPT", "chatgpt"], ["Gemini", "gemini"], ["Claude", "claude"], ["VS Code", "vscode"]];
function Logo({ name, file }: { name: string; file: string }) {
  const [ok, setOk] = useState(true);
  return (<div className="mx-8 flex h-14 items-center">{ok ? (/* eslint-disable-next-line @next/next/no-img-element */
    <img src={`/logos/${file}.png`} alt={name} onError={() => setOk(false)} className="h-12 w-auto object-contain" />) : (<span className="whitespace-nowrap text-lg font-medium text-white/80">{name}</span>)}</div>);
}
function Softwares() {
  const mask = "linear-gradient(to right, transparent, black 12%, black 88%, transparent)";
  return (
    <section id="softwares" className="overflow-hidden bg-ink py-20">
      <p className={ty.softwaresLabel}>Softwares I work with</p>
      <div style={{ maskImage: mask, WebkitMaskImage: mask }}><div className="marquee-r flex">{Array.from({ length: 8 }).flatMap(() => soft).map(([n, f], i) => (<Logo key={i} name={n} file={f} />))}</div></div>
    </section>
  );
}

function OldConnect() {
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
  const f = "mt-2 w-full border-b border-white/25 bg-transparent py-3 text-lg text-white placeholder:text-white/30 focus:border-accent focus:outline-none";
  const links = [[Instagram, "Instagram", site.instagram], [Briefcase, "Upwork", site.upwork], [Mail, "Gmail", `mailto:${site.email}`], [Linkedin, "LinkedIn", site.linkedin], [ShoppingBag, "Fiverr", site.fiverr]] as const;
  return (
    <section id="contact" className="bg-graphite px-6 pt-28 md:px-12">
      <div className="mx-auto max-w-7xl">
        <h2 className={ty.connectTitle}>Let&apos;s <i className="text-accent">connect.</i></h2>
        <div className="mt-16 grid gap-16 md:grid-cols-2">
          <form onSubmit={submit} className="space-y-7" noValidate>
            <input type="text" name="hp_field" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px]" />
            <label className="block text-xs uppercase tracking-widest text-mute">Name<input name="name" required className={f} placeholder="Your name" /></label>
            <label className="block text-xs uppercase tracking-widest text-mute">Email<input name="email" type="email" required className={f} placeholder="you@email.com" /></label>
            <label className="block text-xs uppercase tracking-widest text-mute">Service
              <select name="service" required defaultValue="" className={f}><option value="" disabled>Choose a service</option>{["Graphic Design", "Video Editing", "AI Content Creation", "Web Development", "Something else"].map(o => (<option key={o} className="bg-ink">{o}</option>))}</select></label>
            <div><span className="block text-xs uppercase tracking-widest text-mute">Budget</span>
              <div className="flex gap-4"><select name="currency" aria-label="Currency" className={`${f} w-32`}><option className="bg-ink" value="USD $">USD ($)</option><option className="bg-ink" value="INR ₹">INR (₹)</option></select>
                <input name="amount" inputMode="numeric" aria-label="Budget amount" className={f} placeholder="Amount" /></div></div>
            <label className="block text-xs uppercase tracking-widest text-mute">Project description<textarea name="message" required rows={4} className={f} placeholder="Tell me about your project..." /></label>
            <button disabled={st === "sending"} className="rounded-full bg-accent px-10 py-4 font-medium text-ink transition-colors hover:bg-white disabled:opacity-60">{st === "sending" ? "Sending..." : "Send"}</button>
            <p role="status" aria-live="polite" className={st === "ok" ? "text-accent" : "text-[#F0A3A3]"}>{st === "ok" ? "Thank you! Your message has been sent." : st === "err" ? msg : ""}</p>
          </form>
          <ul className="border-t border-white/15">{links.map(([Icon, l, h]) => (<li key={l}><a href={h} className={ty.connectLink}><span className="flex items-center gap-5"><Icon size={20} className="text-accent" />{l}</span><ArrowUpRight size={18} className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></a></li>))}</ul>
        </div>
        <footer className="mt-24 flex flex-col gap-3 border-t border-white/15 py-10 text-sm text-mute md:flex-row md:justify-between">
          <p>Creative thinking. Thoughtful design. Digital possibilities.</p><p>© {new Date().getFullYear()} Sabarno Das</p></footer>
      </div>
    </section>
  );
}

export default function Site() { return (<><Nav /><main><Hero /><Why /><Showcase /><Softwares /><Connect /></main></>); }
