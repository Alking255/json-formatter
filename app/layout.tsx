import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JSON Formatter - Beautify, Validate & Minify JSON Online | Free Tool",
  description: "Free online JSON formatter, validator, and beautifier. Format, validate, minify JSON instantly. Features include tree view, error detection, TypeScript conversion, and dark mode. No signup required.",
  keywords: [
    "json formatter",
    "json validator",
    "json beautifier",
    "json minifier",
    "json viewer",
    "json tree view",
    "json to typescript",
    "format json online",
    "validate json",
    "json tool"
  ],
  authors: [{ name: "JSON Formatter Tool" }],
  creator: "JSON Formatter",
  publisher: "JSON Formatter",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://json-formatter-jet-five.vercel.app",
    title: "JSON Formatter - Free Online JSON Tool",
    description: "Format, validate, and beautify JSON instantly. Free online tool with tree view, error detection, and more.",
    siteName: "JSON Formatter",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "JSON Formatter Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JSON Formatter - Free Online JSON Tool",
    description: "Format, validate, and beautify JSON instantly. Free online tool with tree view and error detection.",
    images: ["/og-image.png"],
  },
  verification: {
    google: "your-google-verification-code",
  },
  alternates: {
    canonical: "https://json-formatter-jet-five.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Fira+Code:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('json_formatter_settings');
                if (theme) {
                  try {
                    const settings = JSON.parse(theme);
                    document.documentElement.setAttribute('data-theme', settings.theme || 'dark');
                  } catch (e) {
                    document.documentElement.setAttribute('data-theme', 'dark');
                  }
                } else {
                  document.documentElement.setAttribute('data-theme', 'dark');
                }
              })();
            `,
          }}
        />
        {/* Google AdSense Script */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
