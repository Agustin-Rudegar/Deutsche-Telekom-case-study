import re

with open('/Users/agustin.rudegar/Downloads/Deutsche-Telekom-case-study/case_study_deck.jsx', 'r') as f:
    code = f.read()

# Make render functions take { isMobile }
code = re.sub(r'render: \(\) => \(', r'render: ({ isMobile }) => (', code)

# Fix cover slide padding / sizes
code = code.replace(
    '<div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100%", width: "100%", textAlign: "center", position: "relative", overflow: "hidden" }}>',
    '<div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", minHeight: "100vh", width: "100%", textAlign: "center", position: "relative", overflow: "hidden", padding: isMobile ? "0 20px" : 0 }}>'
)
code = code.replace(
    '<h1 style={{ fontSize: 52, fontWeight: 300, lineHeight: 1.15, fontFamily: "var(--display)", color: "var(--fg)", margin: 0, letterSpacing: -1, position: "relative", zIndex: 1 }}>',
    '<h1 style={{ fontSize: isMobile ? 36 : 52, fontWeight: 300, lineHeight: 1.15, fontFamily: "var(--display)", color: "var(--fg)", margin: 0, letterSpacing: -1, position: "relative", zIndex: 1 }}>'
)
code = code.replace(
    '<p style={{ fontSize: 18, color: "var(--muted)", marginTop: 20, fontFamily: "var(--body)", position: "relative", zIndex: 1 }}>',
    '<p style={{ fontSize: isMobile ? 15 : 18, color: "var(--muted)", marginTop: 20, fontFamily: "var(--body)", position: "relative", zIndex: 1 }}>'
)

# Problem Slide
code = code.replace(
    '<h2 style={{ fontSize: 38, fontWeight: 300, fontFamily: "var(--display)", color: "var(--fg)", margin: "0 0 40px", lineHeight: 1.2 }}>A clinic drowning in<br /><span style={{ fontWeight: 600 }}>WhatsApp messages</span></h2>',
    '<h2 style={{ fontSize: isMobile ? 28 : 38, fontWeight: 300, fontFamily: "var(--display)", color: "var(--fg)", margin: "0 0 40px", lineHeight: 1.2 }}>A clinic drowning in<br /><span style={{ fontWeight: 600 }}>WhatsApp messages</span></h2>'
)

# Journey Slide
code = code.replace(
    '<h2 style={{ fontSize: 34, fontWeight: 300, fontFamily: "var(--display)", color: "var(--fg)", margin: "0 0 36px", lineHeight: 1.2 }}>From first message to <span style={{ fontWeight: 600 }}>confirmed appointment</span></h2>',
    '<h2 style={{ fontSize: isMobile ? 24 : 34, fontWeight: 300, fontFamily: "var(--display)", color: "var(--fg)", margin: "0 0 36px", lineHeight: 1.2 }}>From first message to <span style={{ fontWeight: 600 }}>confirmed appointment</span></h2>'
)
code = code.replace(
    '<div style={{ display: "flex", gap: 24, alignItems: "stretch" }}>',
    '<div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: isMobile ? 12 : 24, alignItems: "stretch" }}>'
)
code = code.replace(
    '{i < 4 && <div style={{ position: "absolute", right: -18, top: "50%", transform: "translateY(-50%)", color: "var(--accent)", fontSize: 18, zIndex: 1 }}>→</div>}',
    '{i < 4 && !isMobile && <div style={{ position: "absolute", right: -18, top: "50%", transform: "translateY(-50%)", color: "var(--accent)", fontSize: 18, zIndex: 1 }}>→</div>}'
)

# Decisions Slide
code = code.replace(
    '<h2 style={{ fontSize: 34, fontWeight: 300, fontFamily: "var(--display)", color: "var(--fg)", margin: "0 0 32px", lineHeight: 1.2 }}>The choices that shaped <span style={{ fontWeight: 600 }}>trust</span></h2>',
    '<h2 style={{ fontSize: isMobile ? 24 : 34, fontWeight: 300, fontFamily: "var(--display)", color: "var(--fg)", margin: "0 0 32px", lineHeight: 1.2 }}>The choices that shaped <span style={{ fontWeight: 600 }}>trust</span></h2>'
)

# Conversation Slide
code = code.replace(
    '<h2 style={{ fontSize: 34, fontWeight: 300, fontFamily: "var(--display)", color: "var(--fg)", margin: "0 0 28px", lineHeight: 1.2 }}>Real conversations, <span style={{ fontWeight: 600 }}>real patients</span></h2>',
    '<h2 style={{ fontSize: isMobile ? 24 : 34, fontWeight: 300, fontFamily: "var(--display)", color: "var(--fg)", margin: "0 0 28px", lineHeight: 1.2 }}>Real conversations, <span style={{ fontWeight: 600 }}>real patients</span></h2>'
)
code = code.replace(
    '<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>',
    '<div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 16 : 24 }}>'
)
code = code.replace(
    '<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>',
    '<div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 16 : 20 }}>'
)

# System Slide
code = code.replace(
    '<h2 style={{ fontSize: 34, fontWeight: 300, fontFamily: "var(--display)", color: "var(--fg)", margin: "0 0 32px", lineHeight: 1.2 }}>Architecture built for <span style={{ fontWeight: 600 }}>reliability</span></h2>',
    '<h2 style={{ fontSize: isMobile ? 24 : 34, fontWeight: 300, fontFamily: "var(--display)", color: "var(--fg)", margin: "0 0 32px", lineHeight: 1.2 }}>Architecture built for <span style={{ fontWeight: 600 }}>reliability</span></h2>'
)
code = code.replace(
    '<div style={{ display: "flex", gap: 16, marginBottom: 28 }}>',
    '<div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: isMobile ? 12 : 16, marginBottom: 28 }}>'
)
code = code.replace(
    '{i < 3 && <div style={{ position: "absolute", right: -14, top: "50%", transform: "translateY(-50%)", color: "var(--accent)", fontSize: 16, zIndex: 1 }}>→</div>}',
    '{i < 3 && !isMobile && <div style={{ position: "absolute", right: -14, top: "50%", transform: "translateY(-50%)", color: "var(--accent)", fontSize: 16, zIndex: 1 }}>→</div>}'
)
code = code.replace(
    '<div style={{ display: "flex", gap: 12, justifyContent: "center" }}>',
    '<div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>'
)


# Second Project Slide
code = code.replace(
    '<h2 style={{ fontSize: 34, fontWeight: 300, fontFamily: "var(--display)", color: "var(--fg)", margin: "0 0 32px", lineHeight: 1.2 }}>AI Product Search <span style={{ fontWeight: 600 }}>for Retail</span></h2>',
    '<h2 style={{ fontSize: isMobile ? 24 : 34, fontWeight: 300, fontFamily: "var(--display)", color: "var(--fg)", margin: "0 0 32px", lineHeight: 1.2 }}>AI Product Search <span style={{ fontWeight: 600 }}>for Retail</span></h2>'
)

# Learnings
code = code.replace(
    '<h2 style={{ fontSize: 34, fontWeight: 300, fontFamily: "var(--display)", color: "var(--fg)", margin: "0 0 36px", lineHeight: 1.2 }}>Designing for AI means<br /><span style={{ fontWeight: 600 }}>designing for uncertainty</span></h2>',
    '<h2 style={{ fontSize: isMobile ? 24 : 34, fontWeight: 300, fontFamily: "var(--display)", color: "var(--fg)", margin: "0 0 36px", lineHeight: 1.2 }}>Designing for AI means<br /><span style={{ fontWeight: 600 }}>designing for uncertainty</span></h2>'
)
code = code.replace(
    '<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>',
    '<div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr", gap: isMobile ? 16 : 20 }}>'
)

# Connection Slide
code = code.replace(
    '<div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100%", textAlign: "center", padding: "0 60px" }}>',
    '<div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100%", textAlign: "center" }}>'
)
code = code.replace(
    '<h2 style={{ fontSize: 38, fontWeight: 300, fontFamily: "var(--display)", color: "var(--fg)", margin: "0 0 40px", lineHeight: 1.3 }}>Ready to design<br /><span style={{ fontWeight: 600 }}>AI experiences at scale</span></h2>',
    '<h2 style={{ fontSize: isMobile ? 28 : 38, fontWeight: 300, fontFamily: "var(--display)", color: "var(--fg)", margin: "0 0 40px", lineHeight: 1.3 }}>Ready to design<br /><span style={{ fontWeight: 600 }}>AI experiences at scale</span></h2>'
)
code = code.replace(
    '<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20, width: "100%", marginBottom: 40 }}>',
    '<div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr", gap: isMobile ? 16 : 20, width: "100%", marginBottom: 40 }}>'
)
code = code.replace(
    '<p style={{ fontSize: 17, color: "var(--fg)", fontFamily: "var(--body)", lineHeight: 1.7, maxWidth: 640 }}>',
    '<p style={{ fontSize: isMobile ? 15 : 17, color: "var(--fg)", fontFamily: "var(--body)", lineHeight: 1.7, maxWidth: 640 }}>'
)
code = code.replace(
    '<div style={{ marginTop: 36, display: "flex", gap: 24, fontSize: 13, color: "var(--muted)", fontFamily: "var(--mono)" }}>',
    '<div style={{ marginTop: 36, display: "flex", gap: isMobile ? 12 : 24, flexDirection: isMobile ? "column" : "row", fontSize: 13, color: "var(--muted)", fontFamily: "var(--mono)" }}>'
)

# Adjust padding on all non-cover slides
code = re.sub(
    r'<div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", padding: "0 20px" }}>',
    r'<div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%" }}>',
    code
)

# Fix remaining general 2-column grids (like Problem)
code = code.replace(
    '<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>',
    '<div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 16 : 32 }}>'
)

# Now inject the isMobile logic into CaseStudyDeck
# Replace useState definition to add isMobile
code = re.sub(
    r'([ \t]*)const \[current, setCurrent\] = useState\(0\);',
    r'\1const [current, setCurrent] = useState(0);\n\1const [isMobile, setIsMobile] = useState(typeof window !== "undefined" ? window.innerWidth < 768 : false);\n\n\1useEffect(() => {\n\1\1const handleResize = () => setIsMobile(window.innerWidth < 768);\n\1\1window.addEventListener("resize", handleResize);\n\1\1return () => window.removeEventListener("resize", handleResize);\n\1}, []);',
    code
)

# Modify container style for overflow and dynamic rendering
code = code.replace(
    'style={{ "--accent": "#E20074", "--fg": "#f0f0f0", "--muted": "#8a8a8a", "--card": "rgba(255,255,255,0.03)", "--border": "rgba(255,255,255,0.08)", "--display": "\'DM Sans\',sans-serif", "--body": "\'DM Sans\',sans-serif", "--mono": "\'JetBrains Mono\',monospace", width: "100%", height: "100vh", background: "#0a0a0a", overflow: "hidden", cursor: "pointer", position: "relative", userSelect: "none" }}>',
    'style={{ "--accent": "#E20074", "--fg": "#f0f0f0", "--muted": "#8a8a8a", "--card": "rgba(255,255,255,0.03)", "--border": "rgba(255,255,255,0.08)", "--display": "\'DM Sans\',sans-serif", "--body": "\'DM Sans\',sans-serif", "--mono": "\'JetBrains Mono\',monospace", width: "100%", height: "100vh", background: "#0a0a0a", overflowY: "auto", overflowX: "hidden", cursor: "pointer", position: "relative", userSelect: "none" }}>'
)

code = code.replace(
    '<div style={{ width: "100%", height: "100%", maxWidth: slides[current].id === "cover" ? "none" : 1100, margin: "0 auto", padding: slides[current].id === "cover" ? 0 : "40px 40px" }}>{slides[current].render()}</div>',
    '<div style={{ width: "100%", minHeight: "100%", maxWidth: slides[current].id === "cover" ? "none" : 1100, margin: "0 auto", padding: slides[current].id === "cover" ? 0 : (isMobile ? "40px 20px 80px" : "40px 40px"), display: "flex", flexDirection: "column", justifyContent: "center" }}>{slides[current].render({ isMobile })}</div>'
)

code = code.replace(
    '<div style={{ position: "absolute", bottom: 20, left: 30, fontSize: 11, fontFamily: "var(--mono)", color: "rgba(255,255,255,0.2)" }}>← → or click to navigate</div>',
    '<div style={{ position: "absolute", bottom: 20, left: 30, fontSize: 11, fontFamily: "var(--mono)", color: "rgba(255,255,255,0.2)", display: isMobile ? "none" : "block" }}>← → or click to navigate</div>'
)


with open('/Users/agustin.rudegar/Downloads/Deutsche-Telekom-case-study/case_study_deck.jsx', 'w') as f:
    f.write(code)

