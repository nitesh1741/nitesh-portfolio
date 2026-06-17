import { ImageResponse } from "next/og";
import { profile } from "@/data/portfolio";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#10110f",
          color: "#f4f2ea",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "76px",
          fontFamily: "Arial",
        }}
      >
        <div style={{ color: "#5eead4", fontSize: 28, fontWeight: 700 }}>
          .NET Backend & Agentic AI Engineer
        </div>
        <div style={{ marginTop: 28, fontSize: 78, fontWeight: 900, lineHeight: 1 }}>
          {profile.name}
        </div>
        <div style={{ marginTop: 28, maxWidth: 900, fontSize: 34, lineHeight: 1.25 }}>
          Azure microservices, Kafka pipelines, Redis caching, LangChain, RAG, and
          production-grade backend systems.
        </div>
      </div>
    ),
    size
  );
}
