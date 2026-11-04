import type { ReactNode } from "react";
import "./globals.css";
export const instant = false;
export const metadata = {
  title: "Exam App",
};
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
