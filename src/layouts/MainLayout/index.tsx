import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <Header />
      <main className='m-2'>{children}</main>
      <Footer />
    </>
  );
};

export default MainLayout;
