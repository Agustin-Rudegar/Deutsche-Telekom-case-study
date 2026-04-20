with open('/Users/agustin.rudegar/Downloads/Deutsche-Telekom-case-study/case_study_deck.jsx', 'r') as f:
    code = f.read()

# 1. Update Bubble to receive index and add animation
old_bubble = """function Bubble({ side, text }) {
  const isRight = side === "right";
  return (
    <div style={{ display: "flex", justifyContent: isRight ? "flex-end" : "flex-start" }}>"""

new_bubble = """function Bubble({ side, text, index = 0 }) {
  const isRight = side === "right";
  return (
    <div style={{ display: "flex", justifyContent: isRight ? "flex-end" : "flex-start", opacity: 0, animation: `fadeInSlide 0.4s ease ${index * 0.15 + 0.1}s forwards` }}>"""

code = code.replace(old_bubble, new_bubble)

# 2. Add indices to the conversation slides
# Booking flow
code = code.replace(
    '<Bubble side="right" text="Hi, I need an implant" />',
    '<Bubble side="right" text="Hi, I need an implant" index={0} />'
)
code = code.replace(
    '<Bubble side="left" text="Hello! Could you give me your name? I\'d also like to know if you have any previous studies, like a panoramic X-ray." />',
    '<Bubble side="left" text="Hello! Could you give me your name? I\'d also like to know if you have any previous studies, like a panoramic X-ray." index={1} />'
)
code = code.replace(
    '<Bubble side="right" text="I don\'t have any studies yet" />',
    '<Bubble side="right" text="I don\'t have any studies yet" index={2} />'
)
code = code.replace(
    '<Bubble side="left" text="I\'d recommend getting a panoramic X-ray before the appointment. Meanwhile, I can schedule you with the implant specialist. Shall I proceed?" />',
    '<Bubble side="left" text="I\'d recommend getting a panoramic X-ray before the appointment. Meanwhile, I can schedule you with the implant specialist. Shall I proceed?" index={3} />'
)
code = code.replace(
    '<Bubble side="right" text="Yes, please book it" />',
    '<Bubble side="right" text="Yes, please book it" index={4} />'
)
code = code.replace(
    '<Bubble side="left" text="Done! Monday at 3:00 PM with the implant specialist. Cost: $500. I\'ll send a reminder 24h before. See you there!" />',
    '<Bubble side="left" text="Done! Monday at 3:00 PM with the implant specialist. Cost: $500. I\'ll send a reminder 24h before. See you there!" index={5} />'
)
code = code.replace(
    '<Bubble side="right" text="Perfect, thank you!" />',
    '<Bubble side="right" text="Perfect, thank you!" index={6} />'
)

# Rescheduling flow
code = code.replace(
    '<Bubble side="left" text="Confirmed: General Dentistry with Dr. Acosta, Saturday June 10 at 10:00 AM." />',
    '<Bubble side="left" text="Confirmed: General Dentistry with Dr. Acosta, Saturday June 10 at 10:00 AM." index={0} />'
)
code = code.replace(
    '<Bubble side="right" text="Can you change it to 12 PM?" />',
    '<Bubble side="right" text="Can you change it to 12 PM?" index={1} />'
)
code = code.replace(
    '<Bubble side="left" text="No problem! Let me check Dr. Acosta\'s availability..." />',
    '<Bubble side="left" text="No problem! Let me check Dr. Acosta\'s availability..." index={2} />'
)
code = code.replace(
    '<Bubble side="left" text="Done! Rescheduled to Saturday June 10 at 12:00 PM. Your previous 10 AM slot has been cancelled." />',
    '<Bubble side="left" text="Done! Rescheduled to Saturday June 10 at 12:00 PM. Your previous 10 AM slot has been cancelled." index={3} />'
)
code = code.replace(
    '<Bubble side="right" text="Great, did you cancel the old one?" />',
    '<Bubble side="right" text="Great, did you cancel the old one?" index={4} />'
)
code = code.replace(
    '<Bubble side="left" text="Yes! You now only have the 12:00 PM slot. Any other questions?" />',
    '<Bubble side="left" text="Yes! You now only have the 12:00 PM slot. Any other questions?" index={5} />'
)
code = code.replace(
    '<Bubble side="right" text="No, that\'s all. Thanks!" />',
    '<Bubble side="right" text="No, that\'s all. Thanks!" index={6} />'
)

# Second project flow
code = code.replace(
    '<Bubble side="right" text="Do you have small star screwdrivers?" />',
    '<Bubble side="right" text="Do you have small star screwdrivers?" index={0} />'
)
code = code.replace(
    '<Bubble side="left" text={"Here are the closest options:\\n\\n1. ALLEN STAR T15 — 86.50 Bs\\n2. ALLEN STAR T20 — 114.94 Bs\\n3. ALLEN STAR T25 — 94.80 Bs\\n\\nWould you like any of these?"} />',
    '<Bubble side="left" text={"Here are the closest options:\\n\\n1. ALLEN STAR T15 — 86.50 Bs\\n2. ALLEN STAR T20 — 114.94 Bs\\n3. ALLEN STAR T25 — 94.80 Bs\\n\\nWould you like any of these?"} index={1} />'
)
code = code.replace(
    '<Bubble side="right" text="Do you have Milwaukee brand?" />',
    '<Bubble side="right" text="Do you have Milwaukee brand?" index={2} />'
)
code = code.replace(
    '<Bubble side="left" text="I don\'t have Milwaukee right now. I can offer TOTAL and similar brands. Want to see alternatives?" />',
    '<Bubble side="left" text="I don\'t have Milwaukee right now. I can offer TOTAL and similar brands. Want to see alternatives?" index={3} />'
)
code = code.replace(
    '<Bubble side="right" text="I\'ll go with option 2" />',
    '<Bubble side="right" text="I\'ll go with option 2" index={4} />'
)
code = code.replace(
    '<Bubble side="left" text={"Order summary:\\n\\n• ALLEN STAR T20 SECURITY\\n• Qty: 1 — Price: 114.94 Bs\\n\\nI need your name, phone, payment method, and delivery preference."} />',
    '<Bubble side="left" text={"Order summary:\\n\\n• ALLEN STAR T20 SECURITY\\n• Qty: 1 — Price: 114.94 Bs\\n\\nI need your name, phone, payment method, and delivery preference."} index={5} />'
)
code = code.replace(
    '<Bubble side="right" text="Roberto Gomez, delivery please" />',
    '<Bubble side="right" text="Roberto Gomez, delivery please" index={6} />'
)


# 3. Add global animations and update container styles for contrast and Touch logic
old_case_study = """export default function CaseStudyDeck() {
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(typeof window !== "undefined" ? window.innerWidth < 768 : false);

  useEffect(() => {"""

new_case_study = """export default function CaseStudyDeck() {
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(typeof window !== "undefined" ? window.innerWidth < 768 : false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  useEffect(() => {"""
code = code.replace(old_case_study, new_case_study)

old_return_div = """<div ref={containerRef} tabIndex={0}
      onClick={(e) => { const rect = containerRef.current.getBoundingClientRect(); if (e.clientX - rect.left > rect.width / 2) setCurrent((p) => Math.min(p + 1, slides.length - 1)); else setCurrent((p) => Math.max(p - 1, 0)); }}
      style={{ "--accent": "#E20074", "--fg": "#f0f0f0", "--muted": "#8a8a8a", "--card": "rgba(255,255,255,0.03)", "--border": "rgba(255,255,255,0.08)", "--display": "'DM Sans',sans-serif", "--body": "'DM Sans',sans-serif", "--mono": "'JetBrains Mono',monospace", width: "100%", height: "100vh", background: "#0a0a0a", overflowY: "auto", overflowX: "hidden", cursor: "pointer", position: "relative", userSelect: "none" }}>"""

new_return_div = """<div ref={containerRef} tabIndex={0}
      onClick={(e) => { const rect = containerRef.current.getBoundingClientRect(); if (e.clientX - rect.left > rect.width / 2) setCurrent((p) => Math.min(p + 1, slides.length - 1)); else setCurrent((p) => Math.max(p - 1, 0)); }}
      onTouchStart={(e) => { setTouchEnd(null); setTouchStart(e.targetTouches[0].clientX); }}
      onTouchMove={(e) => setTouchEnd(e.targetTouches[0].clientX)}
      onTouchEnd={() => {
        if (!touchStart || !touchEnd) return;
        const dist = touchStart - touchEnd;
        if (dist > 50) setCurrent((p) => Math.min(p + 1, slides.length - 1));
        if (dist < -50) setCurrent((p) => Math.max(p - 1, 0));
      }}
      style={{ "--accent": "#E20074", "--fg": "#f0f0f0", "--muted": "#a1a1aa", "--card": "rgba(255,255,255,0.03)", "--border": "rgba(255,255,255,0.08)", "--display": "'DM Sans',sans-serif", "--body": "'DM Sans',sans-serif", "--mono": "'JetBrains Mono',monospace", width: "100%", height: "100vh", background: "#0a0a0a", overflowY: "auto", overflowX: "hidden", cursor: "pointer", position: "relative", userSelect: "none" }}>
      <style>{`
        @keyframes fadeInSlide {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .slide-animate {
          animation: fadeInSlide 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>"""
code = code.replace(old_return_div, new_return_div)

# Add class 'slide-animate' and key to the slide wrapper
old_slide_wrapper = """<div style={{ width: "100%", minHeight: "100%", maxWidth: slides[current].id === "cover" ? "none" : 1100, margin: "0 auto", padding: slides[current].id === "cover" ? 0 : (isMobile ? "40px 20px 80px" : "40px 40px"), display: "flex", flexDirection: "column", justifyContent: "center" }}>{slides[current].render({ isMobile })}</div>"""
new_slide_wrapper = """<div key={current} className="slide-animate" style={{ width: "100%", minHeight: "100%", maxWidth: slides[current].id === "cover" ? "none" : 1100, margin: "0 auto", padding: slides[current].id === "cover" ? 0 : (isMobile ? "40px 20px 80px" : "40px 40px"), display: "flex", flexDirection: "column", justifyContent: "center" }}>{slides[current].render({ isMobile })}</div>"""
code = code.replace(old_slide_wrapper, new_slide_wrapper)

with open('/Users/agustin.rudegar/Downloads/Deutsche-Telekom-case-study/case_study_deck.jsx', 'w') as f:
    f.write(code)

