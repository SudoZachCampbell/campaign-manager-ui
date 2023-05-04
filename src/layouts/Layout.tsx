import React, { ReactNode, Suspense } from 'react';
import { NavMenu } from './NavMenu/NavMenu';
import './layout.scss';
interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className='global__container'>
      <NavMenu />
      <div className='global__content'>
        <Suspense fallback={<h1>Loading</h1>}>{children}</Suspense>
      </div>
    </div>
  );
}
