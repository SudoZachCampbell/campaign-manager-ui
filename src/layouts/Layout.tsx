import React from 'react';
import { Container } from 'reactstrap';
import NavMenu from '../components/NavMenu';

export default function Layout(props) {
    
    return (
        <div>
            <NavMenu pageName={props.pageName} />
            <Container>
                {props.children}
            </Container>
        </div>
    );
}
