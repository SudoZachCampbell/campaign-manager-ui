import * as React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TogglingTextField from '../components/TogglingTextField';
import { INpc } from '../interfaces/Interfaces';
import { Typography } from '@material-ui/core';

export default function NpcDetails(props: { setPageName: Function }) {
    const [npc, setNpc] = useState<INpc | undefined>();
    const [loading, setLoading] = useState<boolean>(true);

    props.setPageName('Npc Details');

    const { id } = useParams();

    const populateNpcData = async () => {
        const response = await fetch(`http://localhost:53596/Npc/${id}`);
        console.log("NPC Details Response: ", response);
        const data = await response.json();
        console.log("NPC Details Data: ", data);
        setNpc(data);
        setLoading(false);
    }

    useEffect(() => {
        populateNpcData();
    }, [])

    const saveField = () => {
        
    }

    const display = (
        <>
            <TogglingTextField label='Name' text={npc?.name} saveField={saveField} />
            <TogglingTextField label='Monster Name' text={npc?.monster?.name} saveField={saveField} />
        </>
    )

    const loadingCheck = loading ?
        <Typography>Loading</Typography> :
        display

    return loadingCheck;
}