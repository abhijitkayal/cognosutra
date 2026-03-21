import type { Metadata } from "next";
import * as React from "react";
import "./global.css";
export const metadata: Metadata = {
  title: "Cognosutra — Decoding Business Chaos Into Clarity",
  description: "Data intelligence studio — Market Insight, Pricing Intelligence, Demand Forecasting, Mobility Analysis.",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}