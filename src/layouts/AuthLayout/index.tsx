import React from 'react';
import Header from '@/components/Header';
import { AuthLayoutProps } from '@/types';

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <>
      <Header />
      <main className='m-2'>{children}</main>
    </>
  )
}

export default AuthLayout