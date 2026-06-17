import { ImageResponse } from "next/og";

// Generated favicon — white "B" on the brand gradient, matching the nav monogram.
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
          background: "linear-gradient(135deg, #0a84ff 0%, #6d5bd0 50%, #1eb6a0 100%)",
          color: "#ffffff",
          fontSize: 22,
          fontWeight: 700,
          borderRadius: 7,
        }}
      >
        B
      </div>
    ),
    { ...size }
  );
}
