import React, { useEffect, useState } from 'react';
import CollapsibleTable from '../components/CollapsibleTable'
import { ITableList } from '../interfaces/Interfaces';
import { Box, Typography } from '@material-ui/core';

export default function NpcList(props: any) {
    const [npcs, setNpcs] = useState<ITableList>({
        headers: [""],
        data: [
            {
                id: 0
            }
        ]
    });
    const [loading, setLoading] = useState(true);

    const populateNpcsData = async () => {
        const response = await fetch('http://localhost:53596/Npc/Table');
        console.log("NPC List Response: ", response);
        const data = await response.json();
        console.log("NPC List Data: ", data);
        setNpcs(data);
        setLoading(false);
    }

    const renderNpcsTable = () => {
        return (
            <CollapsibleTable dataSet={npcs} component={"Npc"} />
        )
    }

    const contents = loading
        ? <p><em>Loading...</em></p>
        : renderNpcsTable();


    useEffect(() => {
        populateNpcsData();
        props.setPageName('Npc List');
    }, [])

    return (
        <Box p={5}>
            <Box pb={2}>
                <Typography id="tabelLabel" variant='h2' gutterBottom>Npcs</Typography>
            </Box>
            <Box>
                {contents}
            </Box>
        </Box>
    );
}