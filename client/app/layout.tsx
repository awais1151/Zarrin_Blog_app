import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/Components/Navbar/Nav";
import Footer from "@/Components/Footer/Footer";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blog App",
  description: "This is Blog App where user can write and read the blogs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <div className="flex flex-col justify-between min-h-screen">
          <ToastContainer />
          <Nav/>
          {children}
          <Footer/>
        </div>
      
      
      </body>
    </html>
  );
}
