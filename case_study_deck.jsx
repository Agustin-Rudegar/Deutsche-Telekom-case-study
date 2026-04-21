import { useState, useEffect, useRef } from "react";
import Grainient from "./Grainient";

function Bubble({ side, text, index = 0 }) {
  const isRight = side === "right";
  return (
    <div style={{ display: "flex", justifyContent: isRight ? "flex-end" : "flex-start", opacity: 0, animation: `fadeInSlide 0.4s ease ${index * 0.15 + 0.1}s forwards` }}>
      <div style={{
        maxWidth: "82%",
        background: isRight ? "var(--accent)" : "rgba(255,255,255,0.06)",
        color: isRight ? "#fff" : "var(--fg)",
        borderRadius: isRight ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
        padding: "10px 14px", fontSize: 12.5, fontFamily: "var(--body)", lineHeight: 1.5, whiteSpace: "pre-line",
      }}>{text}</div>
    </div>
  );
}

const slides = [
  {
    id: "cover", render: ({ isMobile }) => (
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", minHeight: "100dvh", width: "100%", textAlign: "center", position: "relative", overflow: "hidden", padding: isMobile ? "0 20px" : 0 }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 0, pointerEvents: "none", opacity: 1 }}>
          <Grainient
            color1="#000000"
            color2="#E20074"
            color3="#050002"
            timeSpeed={0.03}
            colorBalance={-0.6}
            warpStrength={0.2}
            warpFrequency={0.1}
            warpSpeed={0.05}
            warpAmplitude={0}
            blendAngle={160}
            blendSoftness={1.0}
            rotationAmount={0}
            noiseScale={0.1}
            grainAmount={0.015}
            grainScale={0.5}
            grainAnimated={false}
            contrast={1.05}
            gamma={1.0}
            saturation={1.0}
            centerX={0.5}
            centerY={0.7}
            zoom={1.3}
          />
        </div>
        <div style={{ position: "absolute", top: 40, left: 40, fontSize: 13, letterSpacing: 3, color: "var(--muted)", fontFamily: "var(--mono)", textTransform: "uppercase", zIndex: 1 }}>Case Study</div>
        <img src="/logo.png" alt="AR" style={{ width: 48, height: 48, objectFit: "contain", marginBottom: 12, opacity: 0.7, position: "relative", zIndex: 1 }} />
        <div style={{ fontSize: 13, color: "var(--muted)", fontFamily: "var(--mono)", marginBottom: 24, position: "relative", zIndex: 1 }}>
          Agustín Rüdegar
        </div>
        <div style={{ width: 64, height: 3, background: "var(--accent)", margin: "0 auto 24px", position: "relative", zIndex: 1 }} />
        <h1 style={{ fontSize: isMobile ? 36 : 52, fontWeight: 300, lineHeight: 1.15, fontFamily: "var(--display)", color: "var(--fg)", margin: 0, letterSpacing: -1, position: "relative", zIndex: 1 }}>
          Designing an AI Concierge<br /><span style={{ fontWeight: 600 }}>for Healthcare</span>
        </h1>
        <p style={{ fontSize: isMobile ? 15 : 18, color: "var(--muted)", marginTop: 20, fontFamily: "var(--body)", position: "relative", zIndex: 1, marginBottom: 24 }}>
          How conversational AI transformed appointment scheduling<br />for a dental clinic in Buenos Aires
        </p>
        <div style={{ position: "absolute", bottom: isMobile ? 80 : 60, fontSize: 12, color: "var(--muted)", fontFamily: "var(--mono)", zIndex: 1, textTransform: "uppercase", letterSpacing: 2 }}>
          Digital Designer <span style={{ color: "var(--accent)" }}>AI Experience</span>
        </div>
      </div>
    )
  },
  {
    id: "problem", render: ({ isMobile }) => (
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", flex: 1, width: "100%" }}>
        <div style={{ fontSize: 12, letterSpacing: 3, color: "var(--accent)", fontFamily: "var(--mono)", textTransform: "uppercase", marginBottom: 16 }}>01 — The Problem</div>
        <h2 style={{ fontSize: isMobile ? 28 : 38, fontWeight: 300, fontFamily: "var(--display)", color: "var(--fg)", margin: "0 0 40px", lineHeight: 1.2 }}>A clinic drowning in<br /><span style={{ fontWeight: 600 }}>WhatsApp messages</span></h2>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 16 : 32 }}>
          <div style={{ background: "var(--card)", borderRadius: 12, padding: 28, border: "1px solid var(--border)" }}>
            <div style={{ fontSize: 13, fontFamily: "var(--mono)", color: "var(--accent)", marginBottom: 12, textTransform: "uppercase", letterSpacing: 2 }}>Before</div>
            {["Staff manually cross-referencing 5+ Google Calendars", "Back-and-forth messages to find available slots", "Double-bookings and scheduling errors", "No availability outside office hours", "Patient frustration and lost appointments"].map((t, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 12 }}>
                <span style={{ color: "#e05252", fontSize: 14, marginTop: 2, flexShrink: 0 }}>✕</span>
                <span style={{ fontSize: 14, color: "var(--fg)", fontFamily: "var(--body)", lineHeight: 1.5 }}>{t}</span>
              </div>
            ))}
          </div>
          <div style={{ background: "var(--card)", borderRadius: 12, padding: 28, border: "1px solid var(--accent)", boxShadow: "0 0 0 1px var(--accent)" }}>
            <div style={{ fontSize: 13, fontFamily: "var(--mono)", color: "var(--accent)", marginBottom: 12, textTransform: "uppercase", letterSpacing: 2 }}>After</div>
            {["AI handles scheduling across 5 practitioners autonomously", "Patients book, reschedule, or cancel in one conversation", "Real-time calendar sync — zero conflicts", "24/7 availability via WhatsApp", "Staff freed for in-person patient care"].map((t, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 12 }}>
                <span style={{ color: "var(--accent)", fontSize: 14, marginTop: 2, flexShrink: 0 }}>✓</span>
                <span style={{ fontSize: 14, color: "var(--fg)", fontFamily: "var(--body)", lineHeight: 1.5 }}>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  },
  {
    id: "journey", render: ({ isMobile }) => (
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", flex: 1, width: "100%" }}>
        <div style={{ fontSize: 12, letterSpacing: 3, color: "var(--accent)", fontFamily: "var(--mono)", textTransform: "uppercase", marginBottom: 16 }}>02 — User Journey</div>
        <h2 style={{ fontSize: isMobile ? 24 : 34, fontWeight: 300, fontFamily: "var(--display)", color: "var(--fg)", margin: "0 0 36px", lineHeight: 1.2 }}>From first message to <span style={{ fontWeight: 600 }}>confirmed appointment</span></h2>
        <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: isMobile ? 12 : 24, alignItems: "stretch" }}>
          {[
            { step: "01", title: "Intent Recognition", desc: "Patient messages on WhatsApp. AI identifies need: booking, info, rescheduling, or cancellation." },
            { step: "02", title: "Smart Routing", desc: "AI maps symptoms or needs to the right specialist and their specific calendar." },
            { step: "03", title: "Availability Check", desc: "Real-time query across Google Calendar API. Shows available time slots." },
            { step: "04", title: "Negotiation", desc: "If slot unavailable, AI proposes alternatives. Patient chooses. Handles back-and-forth naturally." },
            { step: "05", title: "Confirmation", desc: "Books event, sends details with calendar link, event ID for future changes, and prep instructions." },
          ].map((s, i) => (
            <div key={i} style={{ flex: 1, background: "var(--card)", borderRadius: 12, padding: "24px 18px", border: "1px solid var(--border)", display: "flex", flexDirection: "column", position: "relative" }}>
              <div style={{ fontSize: 20, fontWeight: 700, fontFamily: "var(--display)", color: "var(--accent)", opacity: 0.4, marginBottom: 10 }}>{s.step}</div>
              <div style={{ fontSize: 15, fontWeight: 600, fontFamily: "var(--display)", color: "var(--fg)", marginBottom: 8 }}>{s.title}</div>
              <div style={{ fontSize: 12.5, color: "var(--muted)", fontFamily: "var(--body)", lineHeight: 1.55 }}>{s.desc}</div>
              {i < 4 && !isMobile && <div style={{ position: "absolute", right: -18, top: "50%", transform: "translateY(-50%)", color: "var(--accent)", fontSize: 18, zIndex: 1 }}>→</div>}
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    id: "decisions", render: ({ isMobile }) => (
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", flex: 1, width: "100%" }}>
        <div style={{ fontSize: 12, letterSpacing: 3, color: "var(--accent)", fontFamily: "var(--mono)", textTransform: "uppercase", marginBottom: 16 }}>03 — Design Decisions</div>
        <h2 style={{ fontSize: isMobile ? 24 : 34, fontWeight: 300, fontFamily: "var(--display)", color: "var(--fg)", margin: "0 0 32px", lineHeight: 1.2 }}>The choices that shaped <span style={{ fontWeight: 600 }}>trust</span></h2>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 16 : 20 }}>
          {[
            { q: "What if the patient doesn't know which specialist they need?", a: "Default to General Dentistry. The AI tells them: \"Dr. Acosta will evaluate you and refer you to the right specialist if needed.\" This removes friction — patients don't need medical knowledge to book.", label: "Reduce cognitive load" },
            { q: "How do you prevent AI hallucination in healthcare?", a: "A strict behavioral rule in the system prompt: \"NEVER invent anything. If you don't have the real data, always ask the user.\" The AI validates availability before every booking and never confirms without a real ID.", label: "Anti-hallucination by design" },
            { q: "What happens when the patient's preferred slot isn't available?", a: "The AI proposes alternatives on the same day or nearby dates, presenting 2-3 options. It never dead-ends — always offers a path forward. And it never apologizes first; it leads with solutions.", label: "Graceful negotiation" },
            { q: "How does the AI handle rescheduling?", a: "One message from the patient triggers a chain: validate new slot → cancel old event → book new event → confirm both actions. The AI handles the complexity so the patient doesn't have to.", label: "Autonomous orchestration" },
          ].map((d, i) => (
            <div key={i} style={{ background: "var(--card)", borderRadius: 12, padding: 24, border: "1px solid var(--border)" }}>
              <div style={{ fontSize: 11, fontFamily: "var(--mono)", color: "var(--accent)", letterSpacing: 2, marginBottom: 10, textTransform: "uppercase" }}>{d.label}</div>
              <div style={{ fontSize: 14, fontWeight: 600, fontFamily: "var(--display)", color: "var(--fg)", marginBottom: 10, lineHeight: 1.4 }}>"{d.q}"</div>
              <div style={{ fontSize: 13, color: "var(--muted)", fontFamily: "var(--body)", lineHeight: 1.6 }}>{d.a}</div>
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    id: "conversation", render: ({ isMobile }) => (
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", flex: 1, width: "100%" }}>
        <div style={{ fontSize: 12, letterSpacing: 3, color: "var(--accent)", fontFamily: "var(--mono)", textTransform: "uppercase", marginBottom: 16 }}>04 — Conversation Design</div>
        <h2 style={{ fontSize: isMobile ? 24 : 34, fontWeight: 300, fontFamily: "var(--display)", color: "var(--fg)", margin: "0 0 28px", lineHeight: 1.2 }}>Real conversations, <span style={{ fontWeight: 600 }}>real patients</span></h2>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 16 : 24 }}>
          <div style={{ background: "var(--card)", borderRadius: 12, padding: 24, border: "1px solid var(--border)" }}>
            <div style={{ fontSize: 11, fontFamily: "var(--mono)", color: "var(--accent)", letterSpacing: 2, marginBottom: 16, textTransform: "uppercase" }}>Booking Flow</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <Bubble side="right" text="Hi, I need an implant" index={0} />
              <Bubble side="left" text="Hello! Could you give me your name? I'd also like to know if you have any previous studies, like a panoramic X-ray." index={1} />
              <Bubble side="right" text="I don't have any studies yet" index={2} />
              <Bubble side="left" text="I'd recommend getting a panoramic X-ray before the appointment. Meanwhile, I can schedule you with the implant specialist. Shall I proceed?" index={3} />
              <Bubble side="right" text="Yes, please book it" index={4} />
              <Bubble side="left" text="Done! Monday at 3:00 PM with the implant specialist. Cost: $500. I'll send a reminder 24h before. See you there!" index={5} />
              <Bubble side="right" text="Perfect, thank you!" index={6} />
            </div>
          </div>
          <div style={{ background: "var(--card)", borderRadius: 12, padding: 24, border: "1px solid var(--border)" }}>
            <div style={{ fontSize: 11, fontFamily: "var(--mono)", color: "var(--accent)", letterSpacing: 2, marginBottom: 16, textTransform: "uppercase" }}>Rescheduling Flow</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <Bubble side="left" text="Confirmed: General Dentistry with Dr. Acosta, Saturday June 10 at 10:00 AM." index={0} />
              <Bubble side="right" text="Can you change it to 12 PM?" index={1} />
              <Bubble side="left" text="No problem! Let me check Dr. Acosta's availability..." index={2} />
              <Bubble side="left" text="Done! Rescheduled to Saturday June 10 at 12:00 PM. Your previous 10 AM slot has been cancelled." index={3} />
              <Bubble side="right" text="Great, did you cancel the old one?" index={4} />
              <Bubble side="left" text="Yes! You now only have the 12:00 PM slot. Any other questions?" index={5} />
              <Bubble side="right" text="No, that's all. Thanks!" index={6} />
            </div>
          </div>
        </div>
        <div style={{ fontSize: 12, color: "var(--muted)", fontFamily: "var(--mono)", marginTop: 16, textAlign: "center" }}>Translated from real WhatsApp conversations (originally in Spanish)</div>
      </div>
    )
  },
  {
    id: "system", render: ({ isMobile }) => (
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", flex: 1, width: "100%" }}>
        <div style={{ fontSize: 12, letterSpacing: 3, color: "var(--accent)", fontFamily: "var(--mono)", textTransform: "uppercase", marginBottom: 16 }}>05 — System Overview</div>
        <h2 style={{ fontSize: isMobile ? 24 : 34, fontWeight: 300, fontFamily: "var(--display)", color: "var(--fg)", margin: "0 0 32px", lineHeight: 1.2 }}>Architecture built for <span style={{ fontWeight: 600 }}>reliability</span></h2>
        <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: isMobile ? 12 : 16, marginBottom: 28 }}>
          {[
            { label: "Message Ingestion", role: "Input", items: ["WhatsApp via Evolution API", "Redis message buffering", "Session state management"] },
            { label: "AI Engine", role: "Processing", items: ["GPT-4o for language understanding", "Rule-based prompt orchestration", "Specialist-to-calendar routing"] },
            { label: "Calendar Actions", role: "External", items: ["Google Calendar API (5 calendars)", "Real-time availability check", "Create, update, and cancel events"] },
            { label: "Response & Storage", role: "Output", items: ["Natural language response", "Booking conf. + calendar link", "Patient records via Baserow"] },
          ].map((col, i) => (
            <div key={i} style={{ flex: 1, borderRadius: 12, padding: "20px 16px", background: "var(--card)", border: "1px solid var(--border)", position: "relative" }}>
              <div style={{ fontSize: 10, fontFamily: "var(--mono)", color: "var(--accent)", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 12 }}>{col.role}</div>
              <div style={{ fontSize: 14, fontWeight: 600, fontFamily: "var(--display)", color: "var(--fg)", marginBottom: 12 }}>{col.label}</div>
              {col.items.map((item, j) => (<div key={j} style={{ fontSize: 12.5, color: "var(--muted)", fontFamily: "var(--body)", lineHeight: 1.5, marginBottom: 6 }}>{item}</div>))}
              {i < 3 && !isMobile && <div style={{ position: "absolute", right: -14, top: "50%", transform: "translateY(-50%)", color: "var(--accent)", fontSize: 16, zIndex: 1 }}>→</div>}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          {["n8n", "GPT-4o", "Google Calendar API", "Redis", "Baserow", "Evolution API", "MCP"].map((t, i) => (
            <div key={i} style={{ fontSize: 11, fontFamily: "var(--mono)", color: "var(--muted)", background: "var(--card)", border: "1px solid var(--border)", borderRadius: 6, padding: "6px 12px" }}>{t}</div>
          ))}
        </div>
      </div>
    )
  },
  {
    id: "second", render: ({ isMobile }) => (
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", flex: 1, width: "100%" }}>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 16 : 24, alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 12, letterSpacing: 3, color: "var(--accent)", fontFamily: "var(--mono)", textTransform: "uppercase", marginBottom: 16 }}>06 — Additional Project</div>
            <h2 style={{ fontSize: isMobile ? 24 : 34, fontWeight: 300, fontFamily: "var(--display)", color: "var(--fg)", margin: "0 0 32px", lineHeight: 1.2 }}>AI Product Search <span style={{ fontWeight: 600 }}>for Retail</span></h2>
            <p style={{ fontSize: 15, color: "var(--fg)", fontFamily: "var(--body)", lineHeight: 1.7, marginBottom: 20 }}>Deployed an AI-powered product discovery assistant for a hardware retailer in Venezuela. Customers could search thousands of products using natural language via WhatsApp.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { label: "Semantic Search", desc: "Vector database (Qdrant) with product catalog embeddings enabled fuzzy, intent-based search instead of exact keyword matching" },
                { label: "Smart Alternatives", desc: "When a specific brand wasn't available, the AI proactively suggested comparable alternatives from available stock" },
                { label: "Human Handoff", desc: "The AI's role was explicitly defined: inform, assist, and transfer. After product selection, the order was sent to both the human agent and the customer for validation" },
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
              <Bubble side="right" text="Do you have small star screwdrivers?" index={0} />
              <Bubble side="left" text={"Here are the closest options:\n\n1. ALLEN STAR T15 — 86.50 Bs\n2. ALLEN STAR T20 — 114.94 Bs\n3. ALLEN STAR T25 — 94.80 Bs\n\nWould you like any of these?"} index={1} />
              <Bubble side="right" text="Do you have Milwaukee brand?" index={2} />
              <Bubble side="left" text="I don't have Milwaukee right now. I can offer TOTAL and similar brands. Want to see alternatives?" index={3} />
              <Bubble side="right" text="I'll go with option 2" index={4} />
              <Bubble side="left" text={"Order summary:\n\n• ALLEN STAR T20 SECURITY\n• Qty: 1 — Price: 114.94 Bs\n\nI need your name, phone, payment method, and delivery preference."} index={5} />
              <Bubble side="right" text="Roberto Gomez, delivery please" index={6} />
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "learnings", render: ({ isMobile }) => (
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", flex: 1, width: "100%" }}>
        <div style={{ fontSize: 12, letterSpacing: 3, color: "var(--accent)", fontFamily: "var(--mono)", textTransform: "uppercase", marginBottom: 16 }}>07 — What I Learned</div>
        <h2 style={{ fontSize: isMobile ? 24 : 34, fontWeight: 300, fontFamily: "var(--display)", color: "var(--fg)", margin: "0 0 36px", lineHeight: 1.2 }}>Designing for AI means<br /><span style={{ fontWeight: 600 }}>designing for uncertainty</span></h2>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr", gap: isMobile ? 16 : 20 }}>
          {[
            { num: "01", title: "The edge cases ARE the design", desc: "The happy path is easy. What matters is what happens when the AI can't find a slot, when the patient writes with typos, or asks something outside scope. Each moment is a trust-building opportunity." },
            { num: "02", title: "Prototyping with real AI reveals what mockups can't", desc: "The same question can produce different answers. Testing with the actual model exposed edge cases in tone, timing, and failure modes that only appear with live output." },
            { num: "03", title: "Transparency builds trust faster than perfection", desc: "When the AI couldn't access a calendar, it said so honestly and offered alternatives. Users responded better to honest limitations than to a system that pretended to be perfect." },
            { num: "04", title: "Human handoff is a design decision", desc: "AI it can schedule appointments on its own, but medical advice and payment processing is always for a human. Knowing when NOT to use AI is just as important as knowing when to use it." },
            { num: "05", title: "Conversation design is interaction design", desc: "Every AI response is a UI element. The structure, tone, and information hierarchy of a WhatsApp message requires the same design thinking as any visual interface." },
            { num: "06", title: "Scale reveals design flaws", desc: "Managing 5 specialist calendars with different schedules and availability rules taught me that AI experience design must account for system complexity the user never sees." },
          ].map((l, i) => (
            <div key={i} style={{ background: "var(--card)", borderRadius: 12, padding: 22, border: "1px solid var(--border)" }}>
              <div style={{ fontSize: 24, fontWeight: 700, fontFamily: "var(--display)", color: "var(--accent)", marginBottom: 10, opacity: 0.6 }}>{l.num}</div>
              <div style={{ fontSize: 14, fontWeight: 600, fontFamily: "var(--display)", color: "var(--fg)", marginBottom: 8, lineHeight: 1.3 }}>{l.title}</div>
              <div style={{ fontSize: 12.5, color: "var(--muted)", fontFamily: "var(--body)", lineHeight: 1.6 }}>{l.desc}</div>
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    id: "connection", render: ({ isMobile }) => (
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", flex: 1, width: "100%", textAlign: "center" }}>
        <div style={{ fontSize: 12, letterSpacing: 3, color: "var(--accent)", fontFamily: "var(--mono)", textTransform: "uppercase", marginBottom: 24 }}>08 — Why Deutsche Telekom</div>
        <h2 style={{ fontSize: isMobile ? 28 : 38, fontWeight: 300, fontFamily: "var(--display)", color: "var(--fg)", margin: "0 0 40px", lineHeight: 1.3 }}>Ready to design<br /><span style={{ fontWeight: 600 }}>AI experiences at scale</span></h2>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr", gap: isMobile ? 16 : 20, width: "100%", marginBottom: 40 }}>
          {[
            { mine: "WhatsApp AI concierge for healthcare", dt: "Magenta AI Call Assistant", link: "Agentic AI that takes real-world actions during conversations" },
            { mine: "n8n + MCP workflow orchestration", dt: "Telekom CoMind platform", link: "Same automation stack for conversational AI at enterprise scale" },
            { mine: "Search with Qdrant + embeddings", dt: "AI-powered product discovery", link: "Semantic understanding for intelligent customer interactions" },
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
        <p style={{ fontSize: isMobile ? 15 : 17, color: "var(--fg)", fontFamily: "var(--body)", lineHeight: 1.7, maxWidth: 640 }}>
          Designing the future where art, intelligence, and automation converge —<br />
          exploring the boundaries between what is human, what is artificial,<br />
          and what lies beyond both.
        </p>
        <div style={{ marginTop: 36, display: "flex", gap: isMobile ? 12 : 24, flexDirection: isMobile ? "column" : "row", fontSize: 13, color: "var(--muted)", fontFamily: "var(--mono)" }}>
          <a href="https://agustinrudegar.com" target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "none" }}>agustinrudegar.com</a><span style={{ color: "var(--border)" }}>·</span><a href="mailto:agustin.rudegar@gmail.com" style={{ color: "inherit", textDecoration: "none" }}>agustin.rudegar@gmail.com</a>
        </div>
      </div>
    )
  },
];

export default function CaseStudyDeck() {
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(typeof window !== "undefined" ? window.innerWidth < 768 : false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const containerRef = useRef(null);
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight" || e.key === " ") { e.preventDefault(); setCurrent((p) => Math.min(p + 1, slides.length - 1)); }
      if (e.key === "ArrowLeft") { e.preventDefault(); setCurrent((p) => Math.max(p - 1, 0)); }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div ref={containerRef} tabIndex={0}
      onClick={(e) => { const rect = containerRef.current.getBoundingClientRect(); if (e.clientX - rect.left > rect.width / 2) setCurrent((p) => Math.min(p + 1, slides.length - 1)); else setCurrent((p) => Math.max(p - 1, 0)); }}
      onTouchStart={(e) => { setTouchEnd(null); setTouchStart(e.targetTouches[0].clientX); }}
      onTouchMove={(e) => setTouchEnd(e.targetTouches[0].clientX)}
      onTouchEnd={() => {
        if (!touchStart || !touchEnd) return;
        const dist = touchStart - touchEnd;
        if (dist > 50) setCurrent((p) => Math.min(p + 1, slides.length - 1));
        if (dist < -50) setCurrent((p) => Math.max(p - 1, 0));
      }}
      style={{ "--accent": "#E20074", "--fg": "#f0f0f0", "--muted": "#a1a1aa", "--card": "rgba(255,255,255,0.03)", "--border": "rgba(255,255,255,0.08)", "--display": "'DM Sans',sans-serif", "--body": "'DM Sans',sans-serif", "--mono": "'JetBrains Mono',monospace", width: "100%", height: "100%", display: "flex", flexDirection: "column", background: "#0a0a0a", overflowY: "auto", overflowX: "hidden", cursor: "pointer", position: "relative", userSelect: "none" }}>
      <style>{`
        @keyframes fadeInSlide {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .slide-animate {
          animation: fadeInSlide 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=JetBrains+Mono:wght@300;400;500&display=swap" rel="stylesheet" />
      <div key={current} className="slide-animate" style={{ width: "100%", flex: "1 0 auto", maxWidth: slides[current].id === "cover" ? "none" : 1100, margin: "0 auto", padding: slides[current].id === "cover" ? 0 : (isMobile ? "40px 20px 80px" : "40px 40px"), display: "flex", flexDirection: "column", justifyContent: "center" }}>{slides[current].render({ isMobile })}</div>
      <div style={{ position: "fixed", bottom: 20, left: 0, right: 0, display: "flex", justifyContent: "center", alignItems: "center", gap: 6, zIndex: 10 }}>
        {slides.map((_, i) => (<div key={i} onClick={(e) => { e.stopPropagation(); setCurrent(i); }} style={{ width: i === current ? 24 : 8, height: 8, borderRadius: 4, background: i === current ? "var(--accent)" : "rgba(255,255,255,0.15)", transition: "all 0.3s ease", cursor: "pointer" }} />))}
      </div>
      <div style={{ position: "fixed", bottom: 20, right: 30, fontSize: 12, fontFamily: "var(--mono)", color: "var(--muted)", zIndex: 10 }}>{current + 1} / {slides.length}</div>
      <div style={{ position: "fixed", bottom: 20, left: 30, fontSize: 11, fontFamily: "var(--mono)", color: "rgba(255,255,255,0.2)", display: isMobile ? "none" : "block", zIndex: 10 }}>← → or click to navigate</div>
    </div>
  );
}

