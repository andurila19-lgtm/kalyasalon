import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 20,
          background: "#5A4635",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#C9A45C",
          borderRadius: 8,
          fontWeight: 700,
          fontFamily: "serif",
        }}
      >
        K
      </div>
    ),
    {
      ...size,
    }
  );
}
