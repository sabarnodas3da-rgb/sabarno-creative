// =====================================================================
//  TEXT STYLES: change how any text looks from this ONE file.
//  After editing, press Ctrl + S and the page updates by itself.
//
//  FONT      font-display (Instrument Serif), font-body (Inter),
//            font-playfair, font-grotesk, font-bebas, font-open (Open Sans)
//  SIZE      text-sm  text-base  text-lg  text-xl  text-2xl ... text-9xl
//            or exact: text-[6vw]  (vw = share of screen width, so it scales)
//            Phone size comes first, computer size after "md:"
//            Example: "text-4xl md:text-[5vw]" = 4xl on phone, 5vw on computer
//  HEIGHT    leading-none (tight)  leading-tight  leading-snug  leading-normal  leading-relaxed (loose)
//            or exact: leading-[1.1]
//  SPACING   tracking-tight  tracking-wide  tracking-[0.3em]  (space between letters)
//  POSITION  move down: "relative top-4"   move up: "relative -top-4"
//            move right: "relative left-4"  move left: "relative -left-4"
//            (4 = small step, 10 = bigger step.  Gap above: mt-6   gap below: mb-6)
//  SCALE     scale-110 makes it 10% bigger, scale-90 makes it 10% smaller
//  COLOUR    text-white  text-mute (grey)  text-accent (orange)
// =====================================================================
export const ty = {
  // Top bar
  navLogo: "text-sm font-medium uppercase tracking-[0.25em] text-white",
  navLink: "text-sm text-mute",

  // Landing page
  heroEyebrow: "text-sm uppercase tracking-[0.3em] text-accent md:text-base",
  heroName: "mt-6 font-display text-[15vw] leading-[0.9] md:text-[6.6vw]",
  heroText: "mt-8 max-w-none font-body text-xl leading-snug text-mute md:text-[1.7vw]",
  heroNote: "mt-10 flex items-center gap-2 font-body text-base text-mute",

  // Why choose me
  whyLabel: "mb-8 font-display text-xl font-regular uppercase text-[#FF3D00] md:text-[1.9vw]",
  whyText: "w-full font-open text-2xl font-normal leading-[1.4] md:text-[1.9vw]",

  // Work banner (the four laptop slides)
  slideWord: "pointer-events-none absolute inset-x-0 top-[10%] whitespace-nowrap text-center font-display text-[15vw] leading-none text-white/10",
  slideTitle: "font-display text-3xl leading-tight md:text-5xl",
  slideText: "mt-3 max-w-sm font-body text-sm leading-relaxed text-white/75 md:mt-5 md:text-lg",

   // Softwares and Let's connect
  softwaresLabel: "mb-10 text-center font-body text-xs uppercase tracking-[0.3em] text-mute",
  connectTitle: "font-display text-6xl md:text-8xl",
  connectLink: "group flex items-center justify-between border-b border-white/15 py-4 pl-6 md:pl-18 font-display text-2xl transition-colors hover:text-accent md:text-[2.1rem]",
};