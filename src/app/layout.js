import { Inter } from "next/font/google";
import "./globals.css";

import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import { Providers } from "@/redux/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Beaze App",
  description: "Next Js Ecommerce App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="w-full">
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
