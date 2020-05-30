import React, { useEffect, useState } from 'react';
import CollapsibleTable from '../components/CollapsibleTable'
import { ITableList, IMonster } from '../interfaces/Models';
import { Box, Typography } from '@material-ui/core';
import { getTable, Type } from '../api/dndDb';

export default function MonsterList(props: any) {
    const [monsters, setMonsters] = useState<ITableList>({
        headers: [""],
        data: [
            {
                id: 0
            }
        ]
    });
    const [loading, setLoading] = useState(true);

    const populateMonstersData = async () => {
        const monsters = await getTable<IMonster>(Type.Monster);
        console.log("MONSTER List Data: ", monsters);
        const data: ITableList = { headers: ["ID", "Name", "Passive Perception", "Alignment"], data: monsters }
        setMonsters(data);
        setLoading(false);
    }

    const renderMonstersTable = () => {
        return (
            <CollapsibleTable dataSet={monsters} component={"MonsterSummary"} />
        )
    }

    const contents = loading
        ? <p><em>Loading...</em></p>
        : renderMonstersTable();


    useEffect(() => {
        populateMonstersData();
        props.setPageName('Monster List');
    }, [])

    return (
        <Box p={5}>
            <Box pb={2}>
                <Typography id="tabelLabel" variant='h2' gutterBottom>Monsters</Typography>
            </Box>
            <Box>
                {contents}
            </Box>
        </Box>
    );
}