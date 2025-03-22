import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import localFont from "next/font/local";
import "./globals.css";

const segoeUI = localFont({
  src: "../fonts/SegoeUI.ttf",
});

const BlueParadise = localFont({
  src: "../fonts/BlueParadise.otf",
  variable: "--font-BlueParadise",
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
        className={`${segoeUI.className} ${BlueParadise.variable} text-brand-700 dark:text-white bg-white dark:bg-brand-900`}
      >
        <ThemeProvider enableSystem>{children}</ThemeProvider>
      </body>
    </html>
  );
}
