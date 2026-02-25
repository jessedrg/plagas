import { ImageResponse } from "next/og"

export const runtime = "edge"

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "80px",
          backgroundColor: "#1a1a1a",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 72, color: "#faf9f6", fontStyle: "italic", letterSpacing: "-2px" }}>
            plagas
          </div>
          <div style={{ fontSize: 32, color: "#faf9f680", marginTop: 16, fontFamily: "system-ui, sans-serif" }}>
            Control de plagas profesional en toda España
          </div>
          <div style={{ fontSize: 18, color: "#faf9f640", marginTop: 24, fontFamily: "system-ui, sans-serif" }}>
            Exterminadores certificados · Urgencias 24h · WhatsApp: 603 38 90 26
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
