import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import localFont from "next/font/local";
import "./globals.css";

const segoeUI = localFont({
  src: "../fonts/SegoeUI.ttf",
});

const signature = localFont({
  src: "../fonts/signature.otf",
  variable: "--font-signature",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hxmoura.com.br"),
  title: {
    default: "hxmoura - Portfolio",
    template: "%s - hxmoura",
  },
  description:
    "Desenvolvedor Full-Stack especializado em aplicações web e mobile.",
  openGraph: {
    title: "hxmoura - Portfolio",
    description: "Desenvolvedor Full-Stack",
    url: "https://hxmoura.com.br",
    siteName: "hxmoura",
    locale: "pt_BR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${segoeUI.className} ${signature.variable} text-brand-500 dark:text-brand-300 bg-white dark:bg-brand-900`}
      >
        <ThemeProvider>
          {children}
          <div id="portal-root" />
        </ThemeProvider>
      </body>
      <GoogleAnalytics
        gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID as string}
      />
    </html>
  );
}
