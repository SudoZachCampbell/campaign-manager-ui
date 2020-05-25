import * as React from 'react';
import { useEffect, useState } from 'react';
import { Box, Button, Grid, Typography } from '@material-ui/core'
import { INpc } from '../interfaces/Models';
import { BPNpc } from '../interfaces/Initialisations';

export default function Npc(props: { id: number }) {
    let [npc, setNpc] = useState<INpc>(BPNpc);
    let [loading, setLoading] = useState(true);

    const populateNpcsData = async () => {
        const response = await fetch(`http://localhost:53596/Npc/${props.id}`);
        console.log("NPC Response: ", response);
        const data = await response.json();
        console.log("NPC Data: ", data);
        setNpc(data);
        setLoading(false);
    }

    useEffect(() => {
        populateNpcsData();
    }, [])

    const renderNpcArea = () => {
        return (
            <Box p={3}>
                <Grid container>
                    <Grid item xs={4}>
                        <h1 className="display-4">{npc.name}</h1>
                        <div>{npc.monster ? npc.monster.name : "None"}</div>
                        <Button variant="contained" color="secondary" href={`/npc-details/${npc.id}`}>Details</Button>
                    </Grid>
                    {
                        npc.picture &&
                        <Grid item xs={4}>
                            <img height={"40%"} src={`https://ddimagecollection.s3-eu-west-1.amazonaws.com/npc/${npc.picture}`} />
                        </Grid>
                    }
                </Grid>
            </Box>
        )
    }

    const renderDisplay = loading ?
        <Typography>Loading</Typography> : renderNpcArea();

    return renderDisplay;
}

