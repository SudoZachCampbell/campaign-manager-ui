import React, { useEffect, useState } from 'react';
import CollapsibleTable from '../components/CollapsibleTable'
import { ITableList, INpc, ITableData, ITableRows } from '../interfaces/Models';
import { Box, Typography } from '@material-ui/core';
import { Type, getTable } from '../api/dndDb';
import _ from 'lodash';
import BP from '../interfaces/Initialisations';

export default function NpcList(props: any) {
    const [npcTableData, setNpcsTableData] = useState<ITableList<INpc>>({
        headers: [""],
        data: {
            0: BP.Npc
        }
    });
    const [npcs, setNpcs] = useState({ 0: BP.Npc })
    const [loading, setLoading] = useState(true);

    const columns = [
        "id",
        "name",
        "monster.name",
        "location"
    ]

    const include = [
        "Monster",
        "Building",
        "Locale"
    ]

    const populateNpcsData = async () => {
        let [tableData, npcsData]: [ITableList<INpc>, ITableRows<INpc>] = await getTable<INpc>(Type.Npc, columns, include);
        tableData.data = _.map(tableData.data, row => {
            const npc = npcsData[row.id]
            row["location"] = npc.building ? `${npc.building.name} in ${npc.building.locale.name}` : npc.locale?.name
            return row;
        });
        console.log('Post Location NPC Table Data: ', tableData);
        console.log('NPCs Data: ', npcsData);
        setNpcsTableData(tableData);
        setLoading(false);
    }

    const renderNpcsTable = () => {
        return (
            <CollapsibleTable dataSet={npcTableData} component={"NpcSummary"} />
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
            <Box>
                {contents}
            </Box>
        </Box>
    );
}