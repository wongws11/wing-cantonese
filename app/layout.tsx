import { Navbar } from "../components/Navbar";
import Script from "next/script";
import "./global.scss";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-2MYL11Y6QW"
      />
      <Script src="./tag.js" />
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
