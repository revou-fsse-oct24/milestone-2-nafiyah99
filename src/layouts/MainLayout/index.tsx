import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MainLayoutProps } from "@/types";

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <Header />
      <main className="m-20 p-10">{children}</main>
      <Footer />
    </>
  );
};

export default MainLayout;
