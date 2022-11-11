import React, { Suspense } from 'react';
import { Container } from 'reactstrap';
import NavMenu from './NavMenu/NavMenu';

export default function Layout(props) {
  return (
    <div style={{ height: '1080px' }}>
      <NavMenu pageName={props.pageName} pageBanner={props.pageBanner} />
      <Container>
        <Suspense fallback={<h1>Loading</h1>}>{props.children}</Suspense>
      </Container>
    </div>
  );
}
