import { ImageResponse } from "next/og";

export const alt =
  "Code2Conquer — Empowering the Next Generation of Innovators";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background:
            "radial-gradient(60% 50% at 50% 0%, #1a160c 0%, #0d0d0d 45%, #070707 100%)",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Ring motif, top-right */}
        <div
          style={{
            position: "absolute",
            top: "-140px",
            right: "-120px",
            width: "520px",
            height: "520px",
            borderRadius: "50%",
            border: "3px solid rgba(212,175,55,0.55)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "360px",
              height: "360px",
              borderRadius: "50%",
              border: "10px solid rgba(212,175,55,0.85)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "150px",
                height: "150px",
                borderRadius: "50%",
                background: "rgba(212,175,55,0.9)",
              }}
            />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            color: "#9a9a9a",
            fontSize: "24px",
            letterSpacing: "6px",
            textTransform: "uppercase",
          }}
        >
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              background: "#d4af37",
            }}
          />
          Student-led STEM initiative
        </div>

        <div
          style={{
            display: "flex",
            marginTop: "28px",
            fontSize: "88px",
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 1.05,
            maxWidth: "820px",
          }}
        >
          Empowering the Next Generation of Innovators
        </div>

        <div
          style={{
            display: "flex",
            marginTop: "40px",
            fontSize: "40px",
            fontWeight: 700,
            color: "#d4af37",
          }}
        >
          Code2Conquer
        </div>
      </div>
    ),
    { ...size },
  );
}
