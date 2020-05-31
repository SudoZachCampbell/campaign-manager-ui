import React, { useEffect, useState } from 'react';
import CollapsibleTable from '../components/CollapsibleTable'
import { ITableList, INpc } from '../interfaces/Models';
import { Box, Typography } from '@material-ui/core';
import { Type, getTable } from '../api/dndDb';

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

    const columns = [
        "id", 
        "name", 
        "passive_perception", 
        "alignment"
    ]

    const populateNpcsData = async () => {
        const data = await getTable<INpc>(Type.Npc, columns);
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