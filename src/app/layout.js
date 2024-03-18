import { Inter } from "next/font/google";
import "./globals.css";

import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import { Providers } from "@/redux/provider";
import fav from '../../public/images/logo.png'
import NextTopLoader from "nextjs-toploader";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Beaze App",
  description: "Next Js Ecommerce App",
  images: 
    {
      url: "/images/logo.png",
      width: 1200,
      height: 630,
    },
  
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <link rel="icon" href="fav" type="image/png" sizes="32x32" />
    </head>
      <body className="w-full">
        <Providers>
          <Header />
          <NextTopLoader color="#F8B43A" height={5}  />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}