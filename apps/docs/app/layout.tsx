import type { ReactNode } from "react";
import { ThemeStyles } from "@/components/ui/theme";

export const metadata = {
  title: "zerostyled/ui",
  description: "Copy-paste React components for Next.js, written with styled components. No setup.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeStyles />
        {children}
      </body>
    </html>
  );
}
