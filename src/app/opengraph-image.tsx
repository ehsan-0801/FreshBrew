import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { BRAND } from "@/lib/constants";

export const alt = "FreshBrew — Slow coffee. Deep moments.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const [serif, bean] = await Promise.all([
    readFile(join(process.cwd(), "src/assets/fonts/InstrumentSerif-Regular.ttf")),
    readFile(join(process.cwd(), "src/assets/brand/bean-cream.png")),
  ]);

  // Satori renders a raster far more predictably than an inline SVG path.
  const beanSrc = `data:image/png;base64,${bean.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          backgroundColor: "#1c130d",
          backgroundImage:
            "radial-gradient(circle at 72% 32%, rgba(192,133,82,0.42) 0%, rgba(192,133,82,0.10) 38%, rgba(28,19,13,0) 65%)",
          color: "#f4ede2",
          fontFamily: "Instrument Serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <img src={beanSrc} width={46} height={46} alt="" />
          <div style={{ display: "flex", fontSize: 40 }}>
            <span>Fresh</span>
            <span style={{ color: "#d9bb94" }}>Brew</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 116, lineHeight: 1.02 }}>Slow coffee.</div>
          <div style={{ fontSize: 116, lineHeight: 1.02, color: "#d9bb94" }}>
            Deep moments.
          </div>
        </div>

        <div style={{ fontSize: 28, letterSpacing: 4, color: "#c9b49a" }}>
          {`${BRAND.name} · Dhaka, Bangladesh`}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Instrument Serif", data: serif, style: "normal", weight: 400 },
      ],
    },
  );
}
