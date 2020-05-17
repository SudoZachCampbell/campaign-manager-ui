import * as React from 'react';
import { useEffect, useState } from 'react';
import { Button, Grid } from '@material-ui/core'
import * as _ from 'lodash';

export default function Npc(props: { id: number }) {
    let [npc, setNpc] = useState<INpc>({ Name: "", Monster: { Name: "" }, Picture: "" });
    let [loading, setLoading] = useState(true);
    const populateNpcsData = async () => {
        const response = await fetch(`http://localhost:53596/Npc/${props.id}`);
        console.log("NPC Response: ", response);
        const data = await response.json();
        console.log("NPC Data: ", data);
        setNpc(data[0]);
        setLoading(false);
    }

    useEffect(() => {
        populateNpcsData();
    }, [])

    const renderNpcArea = () => {
        return (
            <Grid container xs={12}>
                <Grid item xs={6}>
                    <h1 className="display-4">{npc.Name}</h1>
                    <div>{npc.Monster ? npc.Monster.Name : "None"}</div>
                    <Button variant="contained" color="secondary">Details</Button>
                </Grid>
                {
                    npc.Picture &&
                    <Grid item xs={6}>
                        <img src={`https\://ddimagecollection.s3-eu-west-1.amazonaws.com/npc/${npc.Picture}`} />
                    </Grid>
                }
            </Grid>
        )
    }

    return renderNpcArea();
}

interface INpc {
    Name: string,
    Monster: IMonster,
    Picture: string
}

interface IMonster {
    Name: string
}