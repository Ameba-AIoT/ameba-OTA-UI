import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";

import "@mantine/core/styles.css";
import React from "react";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AmebaOTA",
  description: "Over-The-Air Update of firmware",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider>{children}</MantineProvider>
      </body>
    </html>
  );
}
