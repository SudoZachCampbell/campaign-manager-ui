import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import * as React from 'react';
import * as _ from 'lodash';
import CollapsibleTable from '../components/CollapsibleTable'
import Npc from '../components/Npc'

export default function NpcList(props: any) {
    const [npcs, setNpcs] = useState({});
    const [loading, setLoading] = useState(true);

    const populateNpcsData = async () => {
        const response = await fetch('Npc/Table');
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
    }, [])

    return (
        <div>
            <h1 id="tabelLabel" >Npcs</h1>
            <p>This component demonstrates fetching data from the server.</p>
            {contents}
        </div>
    );


}
