import { ImageResponse } from "next/og";

// Social share card (Twitter/LinkedIn/iMessage previews). Light "Apple" canvas,
// gradient name, glass-ish chips. 1200x630 is the standard size.
export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Brian Pineda — CS + EE @ Rutgers";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          // Satori (next/og) only supports simple gradients — keep it linear.
          background:
            "linear-gradient(135deg, #e3eeff 0%, #f4f4f6 42%, #e7faf4 100%)",
          padding: "72px 80px",
          color: "#1d1d1f",
        }}
      >
        {/* Top row: monogram + availability */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: 28,
              fontWeight: 700,
              background: "linear-gradient(135deg, #0a84ff, #6d5bd0 50%, #1eb6a0)",
            }}
          >
            BP
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "10px 18px",
              borderRadius: 999,
              background: "rgba(255,255,255,0.65)",
              border: "1px solid rgba(255,255,255,0.8)",
              fontFamily: "monospace",
              fontSize: 20,
              color: "#6e6e73",
            }}
          >
            <div style={{ width: 12, height: 12, borderRadius: 999, background: "#1eb6a0" }} />
            Open to Summer 2026 internships
          </div>
        </div>

        {/* Name + tagline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 130, fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 1 }}>
            Brian Pineda
          </div>
          <div style={{ marginTop: 24, fontSize: 32, color: "#6e6e73", maxWidth: 900 }}>
            First-gen CS + EE student at Rutgers building full-stack products and
            LLM systems with an AI-native workflow.
          </div>
        </div>

        {/* Footer chips */}
        <div style={{ display: "flex", gap: 14, fontFamily: "monospace", fontSize: 22 }}>
          {["CS + EE @ Rutgers", "New Brunswick, NJ", "brianpineda.dev"].map((t, i) => (
            <div
              key={t}
              style={{
                padding: "10px 18px",
                borderRadius: 999,
                background: "rgba(255,255,255,0.6)",
                border: "1px solid rgba(255,255,255,0.8)",
                color: i === 2 ? "#0a84ff" : "#6e6e73",
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
