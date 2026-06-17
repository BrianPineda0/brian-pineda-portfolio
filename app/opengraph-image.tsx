import { ImageResponse } from "next/og";

// Social share card (Twitter/LinkedIn/iMessage previews). On-brand: ink
// background, teal dot-grid wash, name + tagline. 1200x630 is the standard size.
export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Brian Pineda — CS + EE @ Rutgers · AI-Native Builder";

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
          background: "#0a0a0a",
          backgroundImage:
            "radial-gradient(rgba(94,234,212,0.10) 1.5px, transparent 1.5px)",
          backgroundSize: "32px 32px",
          padding: "72px 80px",
          color: "#e5e5e5",
        }}
      >
        {/* Availability chip */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontFamily: "monospace",
            fontSize: 22,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#737373",
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: "#5eead4",
            }}
          />
          Available · Summer 2026
        </div>

        {/* Name */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 140,
              fontWeight: 600,
              letterSpacing: "-0.05em",
              lineHeight: 1,
              display: "flex",
            }}
          >
            Brian Pineda<span style={{ color: "#5eead4" }}>.</span>
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 30,
              color: "rgba(229,229,229,0.85)",
              maxWidth: 880,
            }}
          >
            Full-stack products with an AI-native workflow. TypeScript, Next.js,
            Python, and the LLM systems on top.
          </div>
        </div>

        {/* Footer meta */}
        <div
          style={{
            display: "flex",
            gap: 28,
            fontFamily: "monospace",
            fontSize: 22,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#737373",
          }}
        >
          <span>CS + EE @ Rutgers</span>
          <span style={{ color: "#1f1f1f" }}>/</span>
          <span>New Brunswick, NJ</span>
          <span style={{ color: "#1f1f1f" }}>/</span>
          <span style={{ color: "#5eead4" }}>brianpineda.dev</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
