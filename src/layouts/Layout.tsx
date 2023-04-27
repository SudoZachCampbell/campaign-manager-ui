import React, { ReactNode, Suspense } from 'react';
import { Container } from 'reactstrap';
import NavMenu from './NavMenu/NavMenu';

interface LayoutProps {
  pageName: string;
  pageBanner: any;
  children: ReactNode;
}

export default function Layout({
  pageName,
  pageBanner,
  children,
}: LayoutProps) {
  return (
    <div style={{ height: '1080px' }}>
      <NavMenu pageName={pageName} pageBanner={pageBanner} />
      <Container>
        <Suspense fallback={<h1>Loading</h1>}>{children}</Suspense>
      </Container>
    </div>
  );
}
