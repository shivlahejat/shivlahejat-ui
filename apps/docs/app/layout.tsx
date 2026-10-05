import type { ReactNode } from "react";
import { ThemeStyles } from "@/components/ui/theme";
import { Toaster } from "@/components/ui/toast";
import { themeScript } from "@/components/site/theme-toggle";

export const metadata = {
  title: { default: "shivlahejat/ui", template: "%s · shivlahejat/ui" },
  description: "Copy-paste React components for Next.js, written with styled components. No setup.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <ThemeStyles />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
