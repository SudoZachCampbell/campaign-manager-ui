import React, { useEffect, useState } from 'react';
import CollapsibleTable from '../components/CollapsibleTable'
import { ITableList, IMonster, ITableRow } from '../interfaces/Models';
import { Box, Typography } from '@material-ui/core';
import { Type, getEntities, getTable } from '../api/dndDb';
import _ from 'lodash';
import { BPMonster } from '../interfaces/Initialisations';

export default function MonsterList(props: any) {
    const [monsters, setMonsters] = useState<ITableList<IMonster>>({
        headers: [""],
        data:
        {
            0: BPMonster
        }
    });
    const [loading, setLoading] = useState(true);

    const columns = [
        "id",
        "name",
        "passive_perception",
        "alignment"
    ]

    const populateMonstersData = async () => {
        const [tableData, monstersData]: [ITableList<IMonster>, ITableRow<IMonster>] = await getTable<IMonster>(Type.Monster, columns);
        setMonsters(tableData);
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