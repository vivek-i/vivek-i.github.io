import type { Metadata } from "next";
import { Manrope } from "next/font/google"; // Import Manrope from next/font/google
import "./globals.css";

// Load the Manrope font from Google Fonts
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"], // Specify the weights you need
  variable: "--font-manrope", // Create a custom CSS variable for the font
});

export const metadata: Metadata = {
  title: "vivek isukapalli",
  description: "vivek isukapalli",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={manrope.variable}> {/* Use Manrope font globally */}
        {children}
      </body>
    </html>
  );
}
