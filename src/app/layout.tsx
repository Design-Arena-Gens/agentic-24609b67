import type { Metadata } from "next";
import "./globals.css";
import { TouchHint } from "./components/TouchHint";

export const metadata: Metadata = {
  title: "Тихий туман — Sora 2 сценарий",
  description: "Психологический триллер в тумане: монтажный пакет с озвучкой, эффектами и субтитрами."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <div className="grain" aria-hidden />
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div className="fog">
            <div className="fog-layer" />
            <div className="fog-layer" />
            <div className="fog-layer" />
          </div>
        </div>
        <div className="flash-cut" id="flash-cut" />
        {children}
        <TouchHint />
      </body>
    </html>
  );
}
