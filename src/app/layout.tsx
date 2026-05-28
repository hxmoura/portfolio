import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import localFont from "next/font/local";
import theme from "../../content/settings/settings.json";
import "./globals.css";

const segoeUI = localFont({
  src: "../fonts/SegoeUI.ttf",
});

const signature = localFont({
  src: "../fonts/signature.otf",
  variable: "--font-signature",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hxmoura.vercel.app"),
  title: {
    default: "hxmoura - Portfolio",
    template: "%s - hxmoura",
  },
  description:
    "Desenvolvedor Full-Stack com foco na criação de aplicações bem estruturadas, unindo código, arquitetura e produto.",
  openGraph: {
    title: "hxmoura - Portfolio",
    description: "Desenvolvedor Full-Stack com foco na criação de aplicações bem estruturadas, unindo código, arquitetura e produto.",
    url: "https://hxmoura.vercel.app",
    siteName: "hxmoura",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1400,
        height: 819,
        alt: "hxmoura portfolio cover",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "hxmoura - Portfolio",
    description: "hxmoura portfolio cover",
    images: ["/og.png"],
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
        style={
          {
            "--color-primary": theme.primaryColor,
            "--color-primary-dark": theme.primaryColorDark,
            "--color-primary-light": theme.primaryColorLight,
          } as React.CSSProperties
        }
        className={`${segoeUI.className} ${signature.variable} text-brand-500 dark:text-brand-300 bg-white dark:bg-brand-900`}
      >
        <ThemeProvider>
          {children}
          <div id="portal-root" />
        </ThemeProvider>
      </body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID!} />
    </html>
  );
}
