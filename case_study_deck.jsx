import { useState, useEffect, useRef } from "react";

const slides = [
  {
    id: "cover",
    render: () => (
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100%", textAlign: "center", position: "relative" }}>
        <div style={{ position: "absolute", top: 40, left: 40, fontSize: 13, letterSpacing: 3, color: "var(--muted)", fontFamily: "var(--mono)", textTransform: "uppercase" }}>Case Study</div>
        <div style={{ marginBottom: 32 }}>
          <div style={{ width: 64, height: 4, background: "var(--accent)", margin: "0 auto 24px" }} />
          <h1 style={{ fontSize: 52, fontWeight: 300, lineHeight: 1.15, fontFamily: "var(--display)", color: "var(--fg)", margin: 0, letterSpacing: -1 }}>
            Designing an AI Concierge<br />
            <span style={{ fontWeight: 600 }}>for Healthcare</span>
          </h1>
          <p style={{ fontSize: 18, color: "var(--muted)", marginTop: 20, fontFamily: "var(--body)", fontWeight: 400 }}>
            How conversational AI transformed appointment scheduling<br />for a dental clinic in Buenos Aires
          </p>
        </div>
        <div style={{ position: "absolute", bottom: 40, display: "flex", gap: 32, fontSize: 13, color: "var(--muted)", fontFamily: "var(--mono)" }}>
          <span>Agustín Rüdegar</span>
          <span style={{ color: "var(--border)" }}>·</span>
          <span>AI Product Designer</span>
          <span style={{ color: "var(--border)" }}>·</span>
          <span>2025</span>
        </div>
      </div>
    ),
  },
  {
    id: "problem",
    render: () => (
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", padding: "0 20px" }}>
        <div style={{ fontSize: 12, letterSpacing: 3, color: "var(--accent)", fontFamily: "var(--mono)", textTransform: "uppercase", marginBottom: 16 }}>01 — The Problem</div>
        <h2 style={{ fontSize: 38, fontWeight: 300, fontFamily: "var(--display)", color: "var(--fg)", margin: "0 0 40px", lineHeight: 1.2 }}>
          A clinic drowning in<br /><span style={{ fontWeight: 600 }}>WhatsApp messages</span>
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
          <div style={{ background: "var(--card)", borderRadius: 12, padding: 28, border: "1px solid var(--border)" }}>
            <div style={{ fontSize: 13, fontFamily: "var(--mono)", color: "var(--accent)", marginBottom: 12, textTransform: "uppercase", letterSpacing: 2 }}>Before</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                "Staff manually cross-referencing 5+ Google Calendars",
                "Back-and-forth messages to find available slots",
                "Double-bookings and scheduling errors",
                "No availability outside office hours",
                "Patient frustration → lost appointments"
              ].map((t, i) => (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <span style={{ color: "#e05252", fontSize: 16, marginTop: 2, flexShrink: 0 }}>✕</span>
                  <span style={{ fontSize: 14, color: "var(--fg)", fontFamily: "var(--body)", lineHeight: 1.5 }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: "var(--card)", borderRadius: 12, padding: 28, border: "1px solid var(--accent)", boxShadow: "0 0 0 1px var(--accent)" }}>
            <div style={{ fontSize: 13, fontFamily: "var(--mono)", color: "var(--accent)", marginBottom: 12, textTransform: "uppercase", letterSpacing: 2 }}>After</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                "AI handles scheduling across 5 practitioners autonomously",
                "Patients book, reschedule, or cancel in one conversation",
                "Real-time calendar sync — zero conflicts",
                "24/7 availability via WhatsApp",
                "Staff freed for in-person patient care"
              ].map((t, i) => (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <span style={{ color: "var(--accent)", fontSize: 16, marginTop: 2, flexShrink: 0 }}>✓</span>
                  <span style={{ fontSize: 14, color: "var(--fg)", fontFamily: "var(--body)", lineHeight: 1.5 }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "journey",
    render: () => (
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", padding: "0 20px" }}>
        <div style={{ fontSize: 12, letterSpacing: 3, color: "var(--accent)", fontFamily: "var(--mono)", textTransform: "uppercase", marginBottom: 16 }}>02 — User Journey</div>
        <h2 style={{ fontSize: 34, fontWeight: 300, fontFamily: "var(--display)", color: "var(--fg)", margin: "0 0 36px", lineHeight: 1.2 }}>
          From first message to <span style={{ fontWeight: 600 }}>confirmed appointment</span>
        </h2>
        <div style={{ display: "flex", gap: 4, alignItems: "stretch" }}>
          {[
            { step: "01", title: "Intent Recognition", desc: "Patient messages on WhatsApp. AI identifies need: booking, info, rescheduling, or cancellation.", icon: "💬" },
            { step: "02", title: "Smart Routing", desc: "AI maps symptoms/needs to the right specialist and their specific calendar.", icon: "🔀" },
            { step: "03", title: "Availability Check", desc: "Real-time query across Google Calendar API. Shows available slots.", icon: "📅" },
            { step: "04", title: "Negotiation", desc: "If slot unavailable, AI proposes alternatives. Patient chooses. Handles back-and-forth naturally.", icon: "🤝" },
            { step: "05", title: "Confirmation", desc: "Books event, sends details with calendar link, event ID for future changes, and prep instructions.", icon: "✅" },
          ].map((s, i) => (
            <div key={i} style={{ flex: 1, background: "var(--card)", borderRadius: 12, padding: "24px 18px", border: "1px solid var(--border)", display: "flex", flexDirection: "column", position: "relative" }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>{s.icon}</div>
              <div style={{ fontSize: 11, fontFamily: "var(--mono)", color: "var(--accent)", letterSpacing: 2, marginBottom: 6 }}>STEP {s.step}</div>
              <div style={{ fontSize: 15, fontWeight: 600, fontFamily: "var(--display)", color: "var(--fg)", marginBottom: 8 }}>{s.title}</div>
              <div style={{ fontSize: 12.5, color: "var(--muted)", fontFamily: "var(--body)", lineHeight: 1.55 }}>{s.desc}</div>
              {i < 4 && <div style={{ position: "absolute", right: -12, top: "50%", transform: "translateY(-50%)", color: "var(--accent)", fontSize: 18, zIndex: 1 }}>→</div>}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "decisions",
    render: () => (
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", padding: "0 20px" }}>
        <div style={{ fontSize: 12, letterSpacing: 3, color: "var(--accent)", fontFamily: "var(--mono)", textTransform: "uppercase", marginBottom: 16 }}>03 — Design Decisions</div>
        <h2 style={{ fontSize: 34, fontWeight: 300, fontFamily: "var(--display)", color: "var(--fg)", margin: "0 0 32px", lineHeight: 1.2 }}>
          The choices that shaped <span style={{ fontWeight: 600 }}>trust</span>
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {[
            {
              q: "What if the patient doesn't know which specialist they need?",
              a: "Default to General Dentistry. The AI tells them: \"Dr. Acosta will evaluate you and refer you to the right specialist if needed.\" This removes friction — patients don't need medical knowledge to book.",
              label: "Reduce cognitive load"
            },
            {
              q: "How do you prevent AI hallucination in healthcare?",
              a: "A strict behavioral rule in the system prompt: \"NEVER invent anything. If you don't have the real data, always ask the user.\" The AI validates availability before every booking and never confirms without a real event ID.",
              label: "Anti-hallucination by design"
            },
            {
              q: "What happens when the patient's preferred slot isn't available?",
              a: "The AI proposes alternatives on the same day or nearby dates, presenting 2-3 options. It never dead-ends — always offers a path forward. And it never apologizes first; it leads with solutions.",
              label: "Graceful negotiation"
            },
            {
              q: "How does the AI handle a complex multi-step action like rescheduling?",
              a: "One message from the patient triggers a chain: validate new slot → cancel old event → book new event → confirm both actions. The AI handles the complexity so the patient doesn't have to.",
              label: "Autonomous orchestration"
            },
          ].map((d, i) => (
            <div key={i} style={{ background: "var(--card)", borderRadius: 12, padding: 24, border: "1px solid var(--border)" }}>
              <div style={{ fontSize: 11, fontFamily: "var(--mono)", color: "var(--accent)", letterSpacing: 2, marginBottom: 10, textTransform: "uppercase" }}>{d.label}</div>
              <div style={{ fontSize: 14, fontWeight: 600, fontFamily: "var(--display)", color: "var(--fg)", marginBottom: 10, lineHeight: 1.4 }}>"{d.q}"</div>
              <div style={{ fontSize: 13, color: "var(--muted)", fontFamily: "var(--body)", lineHeight: 1.6 }}>{d.a}</div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "conversation",
    render: () => (
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", padding: "0 20px" }}>
        <div style={{ fontSize: 12, letterSpacing: 3, color: "var(--accent)", fontFamily: "var(--mono)", textTransform: "uppercase", marginBottom: 16 }}>04 — Conversation Design</div>
        <h2 style={{ fontSize: 34, fontWeight: 300, fontFamily: "var(--display)", color: "var(--fg)", margin: "0 0 28px", lineHeight: 1.2 }}>
          Real conversations, <span style={{ fontWeight: 600 }}>real patients</span>
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          <div style={{ background: "var(--card)", borderRadius: 12, padding: 24, border: "1px solid var(--border)" }}>
            <div style={{ fontSize: 11, fontFamily: "var(--mono)", color: "var(--accent)", letterSpacing: 2, marginBottom: 16, textTransform: "uppercase" }}>Booking Flow</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <Bubble side="right" text="Hi, I need an implant" />
              <Bubble side="left" text="Hello! Could you give me your name? I'd also like to know if you have any previous studies, like a panoramic X-ray, needed for the implant consultation." />
              <Bubble side="right" text="I don't have any studies yet" />
              <Bubble side="left" text="I'd recommend getting a panoramic X-ray before the appointment to optimize the process. Meanwhile, I can schedule you with the implant specialist. Would you like to proceed?" />
              <Bubble side="right" text="Yes, I'd like to book" />
              <Bubble side="left" text="Your appointment is booked for Monday at 3:00 PM with the implant specialist. Remember to bring your X-ray. Cost: $500. A reminder will be sent 24h before via WhatsApp." />
            </div>
          </div>
          <div style={{ background: "var(--card)", borderRadius: 12, padding: 24, border: "1px solid var(--border)" }}>
            <div style={{ fontSize: 11, fontFamily: "var(--mono)", color: "var(--accent)", letterSpacing: 2, marginBottom: 16, textTransform: "uppercase" }}>Rescheduling Flow</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <Bubble side="left" text="Your appointment is confirmed: General Dentistry with Dr. Acosta, Saturday June 10 at 10:00 AM." />
              <Bubble side="right" text="I made a mistake, can you change it to 12 PM?" />
              <Bubble side="left" text="No problem! Let me check Dr. Acosta's availability for that time..." />
              <Bubble side="left" text="Done! Rescheduled to Saturday June 10 at 12:00 PM with Dr. Acosta. Your previous 10 AM slot has been cancelled." />
              <Bubble side="right" text="Great, did you cancel the previous one?" />
              <Bubble side="left" text="Yes! Your old appointment has been cancelled. You now only have the 12:00 PM slot confirmed. Any other questions?" />
            </div>
          </div>
        </div>
        <div style={{ fontSize: 12, color: "var(--muted)", fontFamily: "var(--mono)", marginTop: 16, textAlign: "center" }}>
          Translated from real WhatsApp conversations (originally in Spanish)
        </div>
      </div>
    ),
  },
  {
    id: "system",
    render: () => (
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", padding: "0 20px" }}>
        <div style={{ fontSize: 12, letterSpacing: 3, color: "var(--accent)", fontFamily: "var(--mono)", textTransform: "uppercase", marginBottom: 16 }}>05 — System Overview</div>
        <h2 style={{ fontSize: 34, fontWeight: 300, fontFamily: "var(--display)", color: "var(--fg)", margin: "0 0 32px", lineHeight: 1.2 }}>
          Architecture built for <span style={{ fontWeight: 600 }}>reliability</span>
        </h2>
        <div style={{ display: "flex", gap: 16, marginBottom: 28 }}>
          {[
            { label: "Ingestion", items: ["WhatsApp via Evolution API", "Redis message buffering", "Session state management"], color: "#3b82f6" },
            { label: "AI Engine", items: ["GPT-4o for NLU & intent", "Rule-based prompt orchestration", "Specialist-to-calendar routing"], color: "var(--accent)" },
            { label: "Actions", items: ["Google Calendar API (5 calendars)", "Real-time availability check", "Event CRUD operations"], color: "#22c55e" },
            { label: "Output", items: ["Natural language response", "Booking confirmation + calendar link", "CRM logging via Baserow"], color: "#a855f7" },
          ].map((col, i) => (
            <div key={i} style={{ flex: 1, borderRadius: 12, padding: "20px 16px", background: "var(--card)", border: "1px solid var(--border)", position: "relative" }}>
              <div style={{ width: "100%", height: 3, background: col.color, borderRadius: 2, marginBottom: 14 }} />
              <div style={{ fontSize: 14, fontWeight: 600, fontFamily: "var(--display)", color: "var(--fg)", marginBottom: 12 }}>{col.label}</div>
              {col.items.map((item, j) => (
                <div key={j} style={{ fontSize: 12.5, color: "var(--muted)", fontFamily: "var(--body)", lineHeight: 1.5, marginBottom: 6 }}>
                  {item}
                </div>
              ))}
              {i < 3 && <div style={{ position: "absolute", right: -14, top: "50%", transform: "translateY(-50%)", color: "var(--accent)", fontSize: 16, zIndex: 1 }}>→</div>}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          {["n8n", "GPT-4o", "Google Calendar API", "Redis", "Baserow", "Evolution API", "MCP"].map((t, i) => (
            <div key={i} style={{ fontSize: 11, fontFamily: "var(--mono)", color: "var(--muted)", background: "var(--card)", border: "1px solid var(--border)", borderRadius: 6, padding: "6px 12px" }}>{t}</div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "second",
    render: () => (
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", padding: "0 20px" }}>
        <div style={{ fontSize: 12, letterSpacing: 3, color: "var(--accent)", fontFamily: "var(--mono)", textTransform: "uppercase", marginBottom: 16 }}>06 — Additional Project</div>
        <h2 style={{ fontSize: 34, fontWeight: 300, fontFamily: "var(--display)", color: "var(--fg)", margin: "0 0 32px", lineHeight: 1.2 }}>
          AI Product Search <span style={{ fontWeight: 600 }}>for Retail</span>
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          <div>
            <p style={{ fontSize: 15, color: "var(--fg)", fontFamily: "var(--body)", lineHeight: 1.7, marginBottom: 20 }}>
              Deployed an AI-powered product discovery assistant for a hardware retailer in Venezuela. The system enabled customers to search a catalog of thousands of products using natural language via WhatsApp.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { label: "Semantic Search", desc: "Vector database (Qdrant) with product catalog embeddings enabled fuzzy, intent-based search instead of exact keyword matching" },
                { label: "Smart Alternatives", desc: "When a specific brand wasn't available, the AI proactively suggested comparable alternatives from available stock" },
                { label: "Human Handoff", desc: "The AI's role was explicitly defined: inform, assist, and transfer. After product selection, the order summary was sent simultaneously to both the human agent and the customer — the agent then validated stock, confirmed payment, and coordinated delivery" },
              ].map((item, i) => (
                <div key={i} style={{ borderLeft: "2px solid var(--accent)", paddingLeft: 16 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, fontFamily: "var(--display)", color: "var(--fg)", marginBottom: 4 }}>{item.label}</div>
                  <div style={{ fontSize: 12.5, color: "var(--muted)", fontFamily: "var(--body)", lineHeight: 1.5 }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: "var(--card)", borderRadius: 12, padding: 24, border: "1px solid var(--border)" }}>
            <div style={{ fontSize: 11, fontFamily: "var(--mono)", color: "var(--accent)", letterSpacing: 2, marginBottom: 16, textTransform: "uppercase" }}>Conversation Example</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <Bubble side="right" text="Do you have small star screwdrivers?" />
              <Bubble side="left" text={"Here are the closest options we have:\n\n1. ALLEN STAR T15 — 86.50 Bs\n2. ALLEN STAR T20 — 114.94 Bs\n3. ALLEN STAR T25 — 94.80 Bs\n\nWould you like any of these?"} />
              <Bubble side="right" text="Do you have Milwaukee brand?" />
              <Bubble side="left" text="I don't have Milwaukee available right now. I can offer TOTAL and similar brands. Would you like to see alternatives?" />
              <Bubble side="right" text="I'll go with option 2" />
              <Bubble side="left" text={"Order summary:\n\n• ALLEN STAR T20 SECURITY\n• Qty: 1 — Price: 114.94 Bs\n\nI need: your name, phone, payment method, and delivery preference."} />
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "learnings",
    render: () => (
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", padding: "0 20px" }}>
        <div style={{ fontSize: 12, letterSpacing: 3, color: "var(--accent)", fontFamily: "var(--mono)", textTransform: "uppercase", marginBottom: 16 }}>08 — What I Learned</div>
        <h2 style={{ fontSize: 34, fontWeight: 300, fontFamily: "var(--display)", color: "var(--fg)", margin: "0 0 36px", lineHeight: 1.2 }}>
          Designing for AI means<br /><span style={{ fontWeight: 600 }}>designing for uncertainty</span>
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
          {[
            {
              num: "01",
              title: "The edge cases ARE the design",
              desc: "The happy path is easy. What matters is what happens when the AI can't find a slot, when the patient writes with typos, when they ask something outside scope. Each of these moments is a trust-building opportunity."
            },
            {
              num: "02",
              title: "Prototyping with real AI is non-negotiable",
              desc: "Static mockups can't capture the non-deterministic nature of AI responses. I prototyped with the actual GPT-4o model to test edge cases, tone variations, and failure modes that would never appear in a Figma prototype."
            },
            {
              num: "03",
              title: "Transparency builds trust faster than perfection",
              desc: "When the AI couldn't access a calendar, it said so honestly and offered alternatives. Patients responded better to honest limitations than to a system that pretended to be infallible."
            },
            {
              num: "04",
              title: "Human handoff is a design decision, not a failure",
              desc: "Knowing when NOT to use AI is as important as knowing when to use it. I designed clear boundaries: clinical advice → human, payment processing → human, scheduling → AI."
            },
            {
              num: "05",
              title: "Conversation design is interaction design",
              desc: "Every AI response is a UI element. The structure, tone, spacing, and information hierarchy of a WhatsApp message requires the same design rigor as any visual interface."
            },
            {
              num: "06",
              title: "Scale reveals design flaws",
              desc: "Managing 5 specialist calendars with different schedules, time zones, and availability rules taught me that AI experience design must account for system complexity the user never sees."
            },
          ].map((l, i) => (
            <div key={i} style={{ background: "var(--card)", borderRadius: 12, padding: 22, border: "1px solid var(--border)" }}>
              <div style={{ fontSize: 24, fontWeight: 700, fontFamily: "var(--display)", color: "var(--accent)", marginBottom: 10, opacity: 0.6 }}>{l.num}</div>
              <div style={{ fontSize: 14, fontWeight: 600, fontFamily: "var(--display)", color: "var(--fg)", marginBottom: 8, lineHeight: 1.3 }}>{l.title}</div>
              <div style={{ fontSize: 12.5, color: "var(--muted)", fontFamily: "var(--body)", lineHeight: 1.6 }}>{l.desc}</div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "connection",
    render: () => (
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100%", textAlign: "center", padding: "0 60px" }}>
        <div style={{ fontSize: 12, letterSpacing: 3, color: "var(--accent)", fontFamily: "var(--mono)", textTransform: "uppercase", marginBottom: 24 }}>08 — Why Deutsche Telekom</div>
        <h2 style={{ fontSize: 38, fontWeight: 300, fontFamily: "var(--display)", color: "var(--fg)", margin: "0 0 40px", lineHeight: 1.3 }}>
          From 5 calendars to<br /><span style={{ fontWeight: 600 }}>248 million customers</span>
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20, width: "100%", marginBottom: 40 }}>
          {[
            { mine: "WhatsApp AI concierge for healthcare", dt: "Magenta AI Call Assistant", link: "Agentic AI that takes real-world actions during conversations" },
            { mine: "n8n workflow orchestration + MCP", dt: "Telekom CoMind platform", link: "Same automation stack for conversational AI at enterprise scale" },
            { mine: "ElevenLabs voice integration", dt: "ElevenLabs partnership for voice agents", link: "Voice AI for natural, human-like customer interactions" },
          ].map((row, i) => (
            <div key={i} style={{ background: "var(--card)", borderRadius: 12, padding: 22, border: "1px solid var(--border)", textAlign: "left" }}>
              <div style={{ fontSize: 12, color: "var(--muted)", fontFamily: "var(--mono)", marginBottom: 8 }}>My experience</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--fg)", fontFamily: "var(--display)", marginBottom: 14 }}>{row.mine}</div>
              <div style={{ width: "100%", height: 1, background: "var(--border)", margin: "0 0 14px" }} />
              <div style={{ fontSize: 12, color: "var(--accent)", fontFamily: "var(--mono)", marginBottom: 8 }}>Deutsche Telekom</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--fg)", fontFamily: "var(--display)", marginBottom: 10 }}>{row.dt}</div>
              <div style={{ fontSize: 12, color: "var(--muted)", fontFamily: "var(--body)", lineHeight: 1.5, fontStyle: "italic" }}>{row.link}</div>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 17, color: "var(--fg)", fontFamily: "var(--body)", lineHeight: 1.7, maxWidth: 640, fontWeight: 400 }}>
          I don't design <em>about</em> AI — I design <em>with</em> AI and <em>for</em> AI.<br />
          I understand the technology deeply enough to make informed design decisions,<br />
          and I understand design deeply enough to make the technology human.
        </p>
        <div style={{ marginTop: 36, display: "flex", gap: 24, fontSize: 13, color: "var(--muted)", fontFamily: "var(--mono)" }}>
          <span>agustinrudegar.com</span>
          <span style={{ color: "var(--border)" }}>·</span>
          <span>projects@agustinrudegar.com</span>
        </div>
      </div>
    ),
  },
];

function Bubble({ side, text }) {
  const isRight = side === "right";
  return (
    <div style={{ display: "flex", justifyContent: isRight ? "flex-end" : "flex-start" }}>
      <div style={{
        maxWidth: "82%",
        background: isRight ? "var(--accent)" : "rgba(255,255,255,0.06)",
        color: isRight ? "#fff" : "var(--fg)",
        borderRadius: isRight ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
        padding: "10px 14px",
        fontSize: 12.5,
        fontFamily: "var(--body)",
        lineHeight: 1.5,
        whiteSpace: "pre-line",
      }}>
        {text}
      </div>
    </div>
  );
}

export default function CaseStudyDeck() {
  const [current, setCurrent] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        setCurrent((p) => Math.min(p + 1, slides.length - 1));
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setCurrent((p) => Math.max(p - 1, 0));
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onClick={(e) => {
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        if (x > rect.width / 2) setCurrent((p) => Math.min(p + 1, slides.length - 1));
        else setCurrent((p) => Math.max(p - 1, 0));
      }}
      style={{
        "--accent": "#E20074",
        "--fg": "#f0f0f0",
        "--muted": "#8a8a8a",
        "--card": "rgba(255,255,255,0.03)",
        "--border": "rgba(255,255,255,0.08)",
        "--display": "'DM Sans', sans-serif",
        "--body": "'DM Sans', sans-serif",
        "--mono": "'JetBrains Mono', monospace",
        width: "100%",
        height: "100vh",
        background: "#0a0a0a",
        overflow: "hidden",
        cursor: "pointer",
        position: "relative",
        userSelect: "none",
      }}
    >
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=JetBrains+Mono:wght@300;400;500&display=swap" rel="stylesheet" />
      <div style={{ width: "100%", height: "100%", maxWidth: 1100, margin: "0 auto", padding: "40px 40px" }}>
        {slides[current].render()}
      </div>
      {/* Navigation */}
      <div style={{ position: "absolute", bottom: 20, left: 0, right: 0, display: "flex", justifyContent: "center", alignItems: "center", gap: 6 }}>
        {slides.map((_, i) => (
          <div
            key={i}
            onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
            style={{
              width: i === current ? 24 : 8,
              height: 8,
              borderRadius: 4,
              background: i === current ? "var(--accent)" : "rgba(255,255,255,0.15)",
              transition: "all 0.3s ease",
              cursor: "pointer",
            }}
          />
        ))}
      </div>
      <div style={{ position: "absolute", bottom: 20, right: 30, fontSize: 12, fontFamily: "var(--mono)", color: "var(--muted)" }}>
        {current + 1} / {slides.length}
      </div>
      <div style={{ position: "absolute", bottom: 20, left: 30, fontSize: 11, fontFamily: "var(--mono)", color: "rgba(255,255,255,0.2)" }}>
        ← → or click to navigate
      </div>
    </div>
  );
}
