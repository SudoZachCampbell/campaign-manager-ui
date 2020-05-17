import * as React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function NpcDetails(props: { setPageName: Function }) {
    const [npc, setNpc] = useState();

    props.setPageName('Npc Details');

    // useEffect(() => {
    //     const response = await fetch('npc/')
    // })

    const { id } = useParams();

    return (
        <div>{id}</div>
    )
}