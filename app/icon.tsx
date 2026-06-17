import { ImageResponse } from "next/og";

// Generated favicon — teal "B." mark on ink, matching the site's brand tokens.
export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0a",
          color: "#5eead4",
          fontSize: 24,
          fontWeight: 600,
          letterSpacing: "-0.04em",
        }}
      >
        B
        <span style={{ color: "#5eead4" }}>.</span>
      </div>
    ),
    { ...size }
  );
}
