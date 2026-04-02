"use client";
import { useEffect, useRef, useState, useCallback, use } from "react";
import Image from "next/image";
import logo from "../public/cropped_circle_image.png"
import factory_floor from "../public/Factory floor, precise machinery, assembly line.jpg";
import freight_coridor from "../public/logistics transportation.jpg";
import office_meeting from "../public/office mettimng.png";
import rabbit from "../public/rabbit helps the tortoise in the racetrack ( the non traditional thinking where they are not compete in the marathon, rather cooperating).jpg";
import retail from "../public/retail.jpg";
import girl from "../public/Gemini_Generated_Image_p425nlp425nlp425.png";
import art from "../public/Art gallery.png";
import lapy from "../public/image.png";


/* ─────────────────────────────────────────
   ALL UNSPLASH IMAGES — reliable, themed
───────────────────────────────────────── */
const IMGS = {
  // About — aerial shipping port, noisy market chaos
  marketNoisy:
    "https://images.unsplash.com/photo-1494412519320-aa613dfb7738?w=1600&q=85&auto=format&fit=crop",

  // About ocean right — business data analysis on laptop
  oceanData:
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=85&auto=format&fit=crop",

  // Team hero — diverse team in modern office, collaboration
  team:
    "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&q=85&auto=format&fit=crop",

  // Disciplined left — precision robotic factory assembly line
  disciplinedLeft:
    "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=1200&q=85&auto=format&fit=crop",

  // Disciplined right — focused business team whiteboard strategy
  disciplinedRight:
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=900&q=85&auto=format&fit=crop",

  // Agility — SHIPYARD containers port, replaced from boutique
  agility:
    "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1400&q=85&auto=format&fit=crop",

  // Consumer centric — customer service smiling, people first
  consumerCentric:
    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1400&q=85",

  // Motto banner — business professionals running/sprinting, fast & careful
  mottoTrack:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1600&q=85&auto=format&fit=crop",

  // Catalog right — multiple analytics screens, data intelligence
  catalog:
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=85&auto=format&fit=crop",
};

/* ═══════════════════════════════════════════
   LOGO
═══════════════════════════════════════════ */
function Logo() {
  return (
    <Image src="/logo.jpeg" alt="Cognosutra Logo" width={42} height={42} />
  );
}

/* ═══════════════════════════════════════════
   DATA
═══════════════════════════════════════════ */
const EQ_COLS = [3,5,7,9,11,13,15,13,11,10,8,13,14,12,10,8,6,4,6,8,11,13,12,10];
const CATALOG_ITEMS = ["Data Cleaning and Processing","Platform Analysis and Review Aggregator","Consumer Research (Behaviour Analysis)","Branding Strategy","Demand Forecasting","Pricing Intelligence and Product Differentiation Report"];
const NAV_ITEMS: [string,string][] = [["about","About"],["team","Team"],["offerings","Offerings"],["contact","Contact"]];

/* shared input style */
const inputStyle: React.CSSProperties = {
  background:   "rgba(255,255,255,.06)",
  border:       "1px solid rgba(255,255,255,.14)",
  borderRadius: "8px",
  color:        "#f0f4f8",
  fontFamily:   "var(--fB)",
  fontSize:     ".88rem",
  padding:      "10px 13px",
  outline:      "none",
  width:        "100%",
  transition:   "border-color .2s, box-shadow .2s",
};

/* ═══════════════════════════════════════════
   FLIP CARD
═══════════════════════════════════════════ */
function CatalogFlipCard() {
  const [catSel,    setCatSel]    = useState<string[]>([]);
  const [flipped,   setFlipped]   = useState(false);
  const [formSent,  setFormSent]  = useState(false);
  const [name,      setName]      = useState("");
  const [email,     setEmail]     = useState("");
  const [company,   setCompany]   = useState("");
  const [message,   setMessage]   = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [catalog, setCatalog] =useState<string[]>([]);
  const backRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  

  const toggleCat = (v: string) =>
    setCatSel(p => p.includes(v) ? p.filter(x => x !== v) : [...p, v]);
  const toggleInt = (v: string) =>
    setInterests(p => p.includes(v) ? p.filter(x => x !== v) : [...p, v]);

  const handleSubmitForm = (e: React.FormEvent) => { e.preventDefault(); setFormSent(true); };

  const reset = () => {
    setFlipped(false); setFormSent(false);
    setCatSel([]); setName(""); setEmail(""); setCompany(""); setMessage(""); setInterests([]);
    if (backRef.current) backRef.current.scrollTop = 0;
  };

  useEffect(() => {
    if (flipped && backRef.current) backRef.current.scrollTop = 0;
  }, [flipped]);
 const handlemessageSent= async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        company,
        message,
        interests,
        catalog: catSel,
      }),
    });
    alert("Sending message...");

    const data = await res.json();

    if (res.ok) {
      setFormSent(true);
    } else {
      alert(data.message || "Something went wrong");
    }
  } catch (err) {
    console.error(err);
    alert("Failed to send message");
  }
  finally {
    setLoading(false);
  }

};
  return (
    <div style={{ perspective: "1400px", width: "100%" }}>
      <div style={{
        position: "relative", width: "100%", minHeight: "640px",
        transformStyle: "preserve-3d",
        transition: "transform 0.8s cubic-bezier(0.4,0.2,0.2,1)",
        transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
      }}>
        {/* FRONT */}
        <div style={{
          position: "absolute", inset: 0,
          backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden",
          background: "#1a1a1a",
          display: "flex", flexDirection: "column", gap: "1.2rem",
          padding: "3rem 3.5rem",
        }}>
          <div className="catalog-pill-tag">Catalog</div>
          <p className="catalog-intro-txt">See what we solve. Let&apos;s figure out the rest together.</p>
          <div className="cat-items">
            {CATALOG_ITEMS.map(item => (
              <div key={item} className={`cat-row${catSel.includes(item) ? " sel" : ""}`}
                onClick={() => toggleCat(item)}>
                <div className="cat-checkbox">{catSel.includes(item) ? "✓" : ""}</div>
                {item}
              </div>
            ))}
          </div>
          <p className="cat-foot-txt">Pick what you need. We&apos;ll cook up the details.</p>
          <button className="btn3d primary" style={{ width:"fit-content", marginTop:".5rem" }}
            onClick={() => setFlipped(true)}>
            <span className="top">Submit →</span>
            <span className="bot" />
          </button>
        </div>

        {/* BACK */}
        <div ref={backRef} style={{
          position: "absolute", inset: 0,
          backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden",
          transform: "rotateY(180deg)",
          background: "#111827", overflowY: "auto",
          padding: "2.5rem 3.5rem 3.5rem",
          display: "flex", flexDirection: "column",
        }}>
          {!formSent ? (
            <form onSubmit={handleSubmitForm}
              style={{ display:"flex", flexDirection:"column", gap:".9rem" }}>
              <button type="button" onClick={() => setFlipped(false)}
                style={{ background:"none", border:"none", color:"#00e5c8",
                  fontFamily:"var(--fM)", fontSize:".72rem", cursor:"pointer",
                  letterSpacing:".08em", textAlign:"left",
                  display:"flex", alignItems:"center", gap:"5px",
                  width:"fit-content", marginBottom:".4rem" }}>
                ← Back to Catalog
              </button>
              <h3 style={{ fontFamily:"var(--fD)", fontWeight:800, fontSize:"1.35rem" }}>Tell us more</h3>
              <p style={{ color:"var(--t2)", fontSize:".82rem", lineHeight:1.65 }}>
                We&apos;ll craft the right solution for you.
              </p>
              {catSel.length > 0 && (
                <div style={{ display:"flex", flexWrap:"wrap", gap:".35rem" }}>
                  {catSel.map(s => (
                    <span key={s} style={{ background:"rgba(0,229,200,.1)", border:"1px solid #00e5c8",
                      borderRadius:"100px", padding:"2px 11px", fontSize:".7rem",
                      fontFamily:"var(--fM)", color:"#00e5c8" }}>{s}</span>
                  ))}
                </div>
              )}
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:".7rem" }}>
                <div style={{ display:"flex", flexDirection:"column", gap:".25rem" }}>
                  <label style={{ fontFamily:"var(--fM)", fontSize:".65rem", color:"var(--t2)", letterSpacing:".06em", textTransform:"uppercase" }}>Name *</label>
                  <input required value={name} onChange={e=>setName(e.target.value)} placeholder="Your name" style={inputStyle} />
                </div>
                <div style={{ display:"flex", flexDirection:"column", gap:".25rem" }}>
                  <label style={{ fontFamily:"var(--fM)", fontSize:".65rem", color:"var(--t2)", letterSpacing:".06em", textTransform:"uppercase" }}>Email *</label>
                  <input required type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@company.com" style={inputStyle} />
                </div>
              </div>
              <div style={{ display:"flex", flexDirection:"column", gap:".25rem" }}>
                <label style={{ fontFamily:"var(--fM)", fontSize:".65rem", color:"var(--t2)", letterSpacing:".06em", textTransform:"uppercase" }}>Company</label>
                <input value={company} onChange={e=>setCompany(e.target.value)} placeholder="Your company name" style={inputStyle} />
              </div>
              <div style={{ display:"flex", flexDirection:"column", gap:".35rem" }}>
                <label style={{ fontFamily:"var(--fM)", fontSize:".65rem", color:"var(--t2)", letterSpacing:".06em", textTransform:"uppercase" }}>Also interested in</label>
                <div style={{ display:"flex", flexWrap:"wrap", gap:".35rem" }}>
                  {["Premium Solutions","Custom Research","Partnership"].map(v => (
                    <button type="button" key={v} onClick={() => toggleInt(v)} style={{
                      background: interests.includes(v) ? "rgba(0,229,200,.1)" : "rgba(255,255,255,.04)",
                      border: `1px solid ${interests.includes(v) ? "#00e5c8" : "rgba(255,255,255,.12)"}`,
                      borderRadius:"100px", padding:"5px 13px", fontSize:".76rem",
                      color: interests.includes(v) ? "#00e5c8" : "#f0f4f8",
                      cursor:"pointer", fontFamily:"var(--fB)", transition:"all .2s",
                    }}>{v}</button>
                  ))}
                </div>
              </div>
              <div style={{ display:"flex", flexDirection:"column", gap:".25rem" }}>
                <label style={{ fontFamily:"var(--fM)", fontSize:".65rem", color:"var(--t2)", letterSpacing:".06em", textTransform:"uppercase" }}>Message</label>
                <textarea rows={3} value={message} onChange={e=>setMessage(e.target.value)}
                  placeholder="Tell us about your challenge..." style={{ ...inputStyle, resize:"none" }} />
              </div>
              <div style={{ paddingTop:".3rem" }}>
              <button
  type="submit"
  className="btn3d primary"
  onClick={handlemessageSent}
  disabled={loading}
  style={{
    opacity: loading ? 0.7 : 1,
    cursor: loading ? "not-allowed" : "pointer"
  }}
>
  <span className="top">
    {loading ? "Sending..." : "Send Message →"}
  </span>
</button>
              </div>
            </form>
          ) : (
            <div style={{ textAlign:"center", margin:"auto", padding:"2rem 0" }}>
              <div style={{ width:64, height:64, borderRadius:"50%",
                background:"linear-gradient(135deg,#00e5c8,#00aaff)",
                display:"flex", alignItems:"center", justifyContent:"center",
                margin:"0 auto 1.4rem", fontSize:"1.9rem", color:"#000", fontWeight:800 }}>✓</div>
              <h3 style={{ fontFamily:"var(--fD)", fontSize:"1.5rem", fontWeight:800, marginBottom:".4rem" }}>Message sent!</h3>
              <p style={{ color:"var(--t2)", fontSize:".88rem", lineHeight:1.8 }}>
                We&apos;ll get back to you before the coffee wears off ☕
              </p>
              <button type="button" onClick={reset} style={{ marginTop:"1.4rem", background:"none",
                border:"1px solid rgba(0,229,200,.3)", borderRadius:"8px", padding:"8px 20px",
                color:"#00e5c8", fontFamily:"var(--fM)", fontSize:".73rem", cursor:"pointer" }}>
                ← Start over
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════ */
export default function Home() {
  const [scrolled,   setScrolled]   = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showBtt,    setShowBtt]    = useState(false);
  const [activeId,   setActiveId]   = useState("home");

  const videoRef    = useRef<HTMLVideoElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);   // parallax via DOM ref, no re-render

  /* ── scroll spy + parallax via DOM (no state, no re-render = video keeps playing) ── */
  useEffect(() => {
    const ids = ["home","about","team","offerings","contact"];
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      setShowBtt(y > 400);

      /* Parallax: directly mutate video style — zero React re-renders */
      const vid = videoRef.current;
      if (vid) {
        const progress  = Math.min(y / window.innerHeight, 1);
        const scale     = 1 + progress * 0.12;          // subtle zoom-out
        const blurPx    = progress * 3;
        const opacity   = 1 - progress * 0.35;
        const translateY = progress * -40;              // slight upward drift
        vid.style.transform   = `scale(${scale}) translateY(${translateY}px)`;
        vid.style.filter      = `blur(${blurPx}px)`;
        vid.style.opacity     = String(opacity);
      }

      let cur = "home";
      ids.forEach(id => {
        const el = document.getElementById(id);
        if (el && y >= el.offsetTop - 130) cur = id;
      });
      setActiveId(cur);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── body lock ── */
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  /* ── scroll reveal ── */
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add("on"), i * 90);
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -30px 0px" });
    document.querySelectorAll(".reveal, .txt-reveal, .slide-up, .fade-scale").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  /* ── Force video autoplay ── */
useEffect(() => {
  const vid = videoRef.current;
  if (!vid) return;
  vid.muted = true; 
  vid.playsInline = true; 
  vid.volume = 0;
  
  const play = () => {
    vid.play().catch((error) => {
      console.warn('Video play failed:', error);
      // Try again after a short delay
      setTimeout(() => vid.play().catch(() => {}), 1000);
    });
  };
  
  const handleError = (error: Event) => {
    console.error('Video loading error:', error);
  };
  
  play();
  vid.addEventListener("canplay", play, { once: true });
  vid.addEventListener("error", handleError);
  const onG = () => play();
  document.addEventListener("click", onG, { once: true });
  document.addEventListener("touchstart", onG, { once: true });
  return () => {
    vid.removeEventListener("canplay", play);
    vid.removeEventListener("error", handleError);
    document.removeEventListener("click", onG);
    document.removeEventListener("touchstart", onG);
  };
}, []);

   /* ── BIG cursor glow ── */
   // Handled via CSS - no JS needed for basic functionality
   useEffect(() => {
     const cg = document.getElementById("cg");
     if (!cg) return;
     let cx = 0, cy = 0, tx = 0, ty = 0, raf = 0;
     const fn = (e: MouseEvent) => { tx = e.clientX; ty = e.clientY; };
     const animate = () => {
       cx += (tx - cx) * 0.09;
       cy += (ty - cy) * 0.09;
       cg.style.left = cx + "px";
       cg.style.top  = cy + "px";
       raf = requestAnimationFrame(animate);
     };
     window.addEventListener("mousemove", fn);
     animate();
     return () => { window.removeEventListener("mousemove", fn); cancelAnimationFrame(raf); };
   }, []);

  /* ── helpers ── */
  const go = useCallback((id: string) => {
    setDrawerOpen(false);
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), drawerOpen ? 300 : 0);
  }, [drawerOpen]);

  /* Parallax done via DOM ref above — no variables needed here */

  /* ═══════════════════════════════════════════
     RENDER
  ═══════════════════════════════════════════ */
  return (
    <>
      {/* BIG cursor glow — 600px, smooth lag follow */}
      <div id="cg" />

      {/* ══════════════ NAVBAR ══════════════ */}
      <nav id="navbar" className={scrolled ? "scrolled" : ""}>
        <button className="nav-logo" onClick={() => go("home")}>
          <Image src={logo} alt="logo" height={90} width={90}/>
          <span className="nav-logo-txt">Cognosutra</span>
        </button>
        <div className="nav-right">
          <span className="unfold-txt">Unfold</span>
          <button className={`ham-btn${drawerOpen ? " open" : ""}`}
            onClick={() => setDrawerOpen(v => !v)} aria-label="Toggle menu">
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* ══════════════ FULLSCREEN DRAWER ══════════════ */}
      <div id="drawer" className={drawerOpen ? "open" : ""}>
        <ul className="drawer-links">
          {NAV_ITEMS.map(([id, label]) => (
            <li key={id}>
              <a href={`#${id}`} onClick={e => { e.preventDefault(); go(id); }}
                style={{ color: activeId === id ? "#00e5c8" : undefined }}>{label}</a>
            </li>
          ))}
        </ul>
        <div className="drawer-divider" />
        <a href="#contact" className="drawer-cta"
          onClick={e => { e.preventDefault(); go("contact"); }}>Let&apos;s Talk →</a>
      </div>

      {/* ══════════════ §1 HERO — VIDEO + PARALLAX ══════════════ */}
      <section id="home">
        {/* Video: parallax applied directly to DOM via ref on scroll — never re-renders */}
         <video
           ref={videoRef}
           autoPlay muted loop playsInline preload="auto"
           suppressHydrationWarning
           style={{
             position:       "absolute", inset: 0,
             width:          "100%",     height: "100%",
             objectFit:      "cover",    objectPosition: "center",
             zIndex:         0,
             transformOrigin:"center center",
             willChange:     "transform, filter, opacity",
           }}
         >
           <source src="/hj.mp4" type="video/mp4" />
         </video>
        <div style={{ position:"absolute", inset:0, zIndex:1,
          background:"linear-gradient(to bottom,rgba(3,8,18,.58) 0%,rgba(3,8,18,.3) 50%,rgba(3,8,18,.8) 100%)" }} />

        <div className="hero-content">
          <h1 className="hero-title txt-reveal">
            Decoding business<br />chaos into clarity
          </h1>
        </div>

        <div className="hero-explore">
          <span className="explore-txt">Explore us down</span>
          <button className="explore-arrow-btn" onClick={() => go("about")}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M11 4v14M5 12l6 6 6-6" stroke="white" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

         <div className="hero-cloud" onClick={() => {
           document.documentElement.classList.toggle('dark');
           // Also toggle body class for compatibility
           document.body.classList.toggle('dark');
         }}>
           <span style={{ fontSize:"1.4rem" }}>☁️</span>
           <span>Touch the cloud, no thunder, promise !!</span>
         </div>
      </section>

      {/* ══════════════ §2 ABOUT ══════════════ */}
      <section id="about">
        <div className="about-intro">
          <h2 className="txt-reveal">The market is noisy!</h2>
          <p className="slide-up" style={{ marginTop:"1rem" }}>
            Conflicting data, scattered signals, price shifts that don&apos;t make sense,
            and decisions that hinge on guesswork.
          </p>
        </div>

        <div className="about-ship-img">
          <Image src={IMGS.marketNoisy} alt="Aerial shipping port — noisy market"
            fill style={{ objectFit:"cover", objectPosition:"center" }} />
        </div>

        <div className="about-ocean">
          <div>
            <h3 className="ocean-h txt-reveal">
              We dive into the ocean of your data so you can surface with one thing:
              a decision you can trust.
            </h3>
            <p className="approach-txt slide-up">
              Our approach is principle-driven:<br />
              <strong style={{ color:"#fff" }}>ingest, validate, probe, optimize, deliver.</strong>
            </p>
          </div>
          <div className="about-photo fade-scale">
            <Image src={IMGS.oceanData} alt="Business data analytics"
              fill style={{ objectFit:"cover", borderRadius:16 }} />
          </div>
        </div>
      </section>

      {/* ══════════════ §3 TEAM / VALUES ══════════════ */}
      <section id="team">
        <div className="team-hero">
          <Image src={office_meeting} alt="Built by Friends, Driven by Curiosity" />
          <div className="team-hero-ov" />
          <div className="team-hero-txt">
            <h2 className="txt-reveal">Built by Friends, Driven by Curiosity</h2>
            <p className="slide-up">Our values</p>
            <div className="team-chev reveal">
              <svg width="28" height="16" viewBox="0 0 28 16" fill="none">
                <path d="M3 3l11 10L25 3" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
              </svg>
              <svg width="28" height="16" viewBox="0 0 28 16" fill="none">
                <path d="M3 3l11 10L25 3" stroke="white" strokeWidth="2.2" strokeLinecap="round" opacity="0.38"/>
              </svg>
            </div>
          </div>
        </div>

        {/* DISCIPLINED */}
        <div className="val-disciplined">
          <div className="left-img img-zoom-hover">
            <Image src={factory_floor} alt="Precision factory — disciplined"
              fill style={{ objectFit:"cover" }} />
          </div>
          <div className="right-col">
            <div className="right-text">
              <span className="slide-up" style={{ display:"block",fontFamily:"var(--fM)",fontSize:".7rem",
                color:"var(--ac)",letterSpacing:".12em",opacity:.6,marginBottom:".5rem" }}>01</span>
              <h3 className="txt-reveal" style={{ fontFamily:"var(--fD)",
                fontSize:"clamp(1.8rem,3vw,2.8rem)",fontWeight:200,
                letterSpacing:"-.02em",marginBottom:".8rem" }}>DISCIPLINED</h3>
              <p className="slide-up" style={{ color:"var(--t2)",fontSize:".9rem",lineHeight:1.8,maxWidth:320 }}>
                Structure without rigidity. Every step measured, nothing wasted.
              </p>
            </div>
            <div className="right-img img-zoom-hover">
              <Image src={freight_coridor} alt="Business strategy session"
                fill style={{ objectFit:"cover", objectPosition:"center" }} />
            </div>
          </div>
        </div>

        {/* AGILITY — now shipyard containers */}
        <div className="val-agility">
          <div className="agility-strip-top">
            <p className="slide-up">Responsive, iterative approach. We adjust course when conditions shift.</p>
            <h3 className="txt-reveal">AGILITY</h3>
          </div>
           <div className="agility-full-img img-zoom-hover">
             <Image src={retail} alt="Shipyard containers — agility in motion"
               fill style={{ objectFit:"cover" }}  />
           </div>
          <div className="agility-strip-bottom">
            <h3 className="txt-reveal">PRAGMATIC</h3>
            <p className="slide-up">We optimize for decisions you can actually execute.</p>
          </div>
        </div>

        {/* CONSUMER CENTRIC */}
          <div className="val-pragmatic-img img-zoom-hover">
            <Image src={girl} alt="Consumer centric — people first"
               fill style={{ objectFit:"cover" }} />
          </div>
        <div className="val-consumer-strip">
          <h3 className="txt-reveal">Consumer Centric</h3>
          <p className="slide-up">We put people first. Every insight and decision begins with understanding our clients.</p>
        </div>

        {/* MOTTO */}
         <div className="motto-banner">
           <Image src={rabbit} alt="Fast thinkers. Careful validators."
             fill style={{ objectFit:"cover" }} />
          <div className="motto-ov" />
          <div className="motto-content">
            <h2 className="txt-reveal">
              Fast thinkers. Careful validators.<br />
              Both equal, both essential.
            </h2>
            <button className="btn3d ghost fade-scale" onClick={() => go("contact")}>
              <span className="top">Meet Us</span>
              {/* <span className="bot" /> */}
            </button>
          </div>
        </div>
      </section>

      {/* ══════════════ §4 OFFERINGS ══════════════ */}
      <section id="offerings">
        <div className="off-header">
          <h2 className="txt-reveal">What We Do, We search!</h2>
        </div>

        {/* <div className="eq-visualizer fade-scale">
          {EQ_COLS.map((segs, ci) => (
            <div className="eq-col" key={ci}>
              {Array.from({ length: segs }).map((_, si) => (
                <div key={si} className="eq-seg"
                  style={{ animationDelay:`${(ci*0.06+si*0.04).toFixed(2)}s` }} />
              ))}
            </div>
          ))}
        </div> */}
           <div className="eq-visualizer fade-scale">
  {EQ_COLS.map((_, ci) => (
    <div
      key={ci}
      className="eq-bar"
      style={{
        animationDelay: `${ci * 0.12}s`
      }}
    />
  ))}
</div>

        {/* Changed from "Amplitude Over Noise" → "Contact Us" */}
        <div className="amp-label txt-reveal">
          <a href="#contact" onClick={e => { e.preventDefault(); go("contact"); }}
            style={{ color:"inherit", textDecoration:"none", cursor:"pointer",
              transition:"color .2s, letter-spacing .2s", display:"inline-block" }}
            onMouseEnter={e => { (e.target as HTMLElement).style.color="#00e5c8"; (e.target as HTMLElement).style.letterSpacing=".04em"; }}
            onMouseLeave={e => { (e.target as HTMLElement).style.color="inherit"; (e.target as HTMLElement).style.letterSpacing="0"; }}>
            Contact Us →
          </a>
        </div>

        <div className="catalog-split">
          <CatalogFlipCard />
          <div className="catalog-right img-zoom-hover">
            <Image src={art} alt="Data analytics solutions" fill style={{ objectFit:"cover" }} />
          </div>
        </div>

         <div className="premium-section" >
           <div className="premium-inner" style={{ position: 'relative', zIndex: 2 }}>
             <h2 className="txt-reveal">Premium Solutions !!</h2>
             <p className="slide-up">
               We also offer advanced, customizable offers, but those deserve a proper conversation first.
             </p>
             <a href="#contact" className="coffee-btn fade-scale"
               onClick={e => { e.preventDefault(); go("contact"); }}>
               <span className="coffee-emoji">☕</span>
               <div className="coffee-btn-text">
                 <span>Let&apos;s Talk</span>
                 <span>Before the Coffee Wears Off</span>
               </div>
             </a>
           </div>
           
           
           <div className="premium-overlay" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0, 0, 0, 0.5)', zIndex: 1 }}></div>
         </div>
         <Image src={lapy} alt="Premium solutions" className="premium-img"/>
      </section>

      {/* ══════════════ §5 CONTACT ══════════════ */}
      <section id="contact">
        <div className="contact-header">
          <h2 className="txt-reveal">Find Us Without Getting Lost</h2>
          <p className="slide-up">Here&apos;s where the data magic brews. Drop by, call us, or just send a message.</p>
        </div>

        <div className="contact-body">
          <div className="fade-scale">
            <div className="map-wrap">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14731.32736532893!2d88.3974851!3d22.5726!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0275b054b58351%3A0xab15e1e5988ca905!2sBidhannagar%2C%20Kolkata%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
                width="100%" height="380"
                style={{ border:"none", borderRadius:"12px", display:"block",
                  filter:"invert(90%) hue-rotate(180deg) brightness(0.82) contrast(1.1)" }}
                allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                title="Cognosutra — Bidhannagar, Kolkata" />
            </div>
          </div>

          <div className="contact-right-col reveal">
            <p className="contact-tagline">
              Here&apos;s where the data magic brews.<br />
              Drop by, call us, or just send a message.
            </p>
            <div className="contact-icons-row">
              <a href="mailto:hello@cognosutra.com" className="cicon" title="Email">✉</a>
              <a href="tel:+91" className="cicon" title="Call us">☏</a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                className="cicon li-ico" title="LinkedIn">in</a>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ FOOTER ══════════════ */}
      <footer>
        <div className="footer-inner">
          <div className="footer-top">
            <div className="footer-brand">
              <div className="logo-row">
                <Image src={logo} alt="logo" height={48} width={48}/>
                <span className="nav-logo-txt">Cognosutra</span></div>
              <p className="text-green">Decoding business chaos into clarity.<br />Kolkata, West Bengal, India.</p>
              <div className="footer-socials">
                <a href="mailto:hello@cognosutra.com" className="f-ico" title="Email">✉</a>
                <a href="tel:+91" className="f-ico" title="Phone">☏</a>
                <a href="https://linkedin.com" className="f-ico f-li" title="LinkedIn"
                  target="_blank" rel="noopener noreferrer">in</a>
              </div>
            </div>
            <div className="footer-cols">
              <div className="f-col">
                <h4>Navigate</h4>
                {NAV_ITEMS.map(([id,label]) => (
                  <a key={id} href={`#${id}`} onClick={e=>{e.preventDefault();go(id);}}>{label}</a>
                ))}
              </div>
              <div className="f-col">
                <h4>Services</h4>
                {CATALOG_ITEMS.map(s => (
                  <a key={s} href="#offerings" onClick={e=>{e.preventDefault();go("offerings");}}>{s}</a>
                ))}
              </div>
            </div>
          </div>
          <div className="footer-bar">
            <span>© 2025 Cognosutra. All rights reserved.</span>
            <span>Built with data, driven by curiosity.</span>
          </div>
        </div>
      </footer>

      <button id="btt" className={showBtt ? "show" : ""}
        onClick={() => window.scrollTo({ top:0, behavior:"smooth" })}>↑</button>
    </>
  );
}