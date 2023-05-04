import * as React from 'react';
import { useState, useEffect } from 'react';
import { useAccordionButton } from 'react-bootstrap';

export default function TableAccordionToggle(props: any) {
  const decoratedOnClick = useAccordionButton(props.eventKey, () => {
    props.customOnClick(props.eventKey);
  });

  return (
    <tr onClick={decoratedOnClick} key={props.key}>
      {props.children}
    </tr>
  );
}
