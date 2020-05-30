import React, { useEffect, useState } from 'react';
import CollapsibleTable from '../components/CollapsibleTable'
import { ITableList, IMonster } from '../interfaces/Models';
import { Box, Typography } from '@material-ui/core';
import { Type, getEntities } from '../api/dndDb';
import _ from 'lodash';

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

    const columns = [
        "id", 
        "name", 
        "passive_perception", 
        "alignment"
    ]

    const populateMonstersData = async () => {
        const monsters = await getEntities<IMonster[]>(Type.Monster);
        console.log("MONSTER List Data: ", monsters);
        const data: ITableList = {
            headers: columns.map(_.startCase),
            data: monsters.map(monster => _.pick(monster, columns))
        }
        console.log("Monster Data Structure: ", data);
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