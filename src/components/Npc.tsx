import * as React from 'react';
import { useEffect, useState } from 'react';
import { Box, Button, Grid, Typography } from '@material-ui/core'

export default function Npc(props: { id: number }) {
    let [npc, setNpc] = useState<INpc>({ Id: 0, Name: "", Monster: { Name: "" }, Picture: "" });
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
            <Box p={3}>
                <Grid container>
                    <Grid item xs={4}>
                        <h1 className="display-4">{npc.Name}</h1>
                        <div>{npc.Monster ? npc.Monster.Name : "None"}</div>
                        <Button variant="contained" color="secondary" href={`/npc-details/${npc.Id}`}>Details</Button>
                    </Grid>
                    {
                        npc.Picture &&
                        <Grid item xs={4}>
                            <img height={"40%"} src={`https://ddimagecollection.s3-eu-west-1.amazonaws.com/npc/${npc.Picture}`} />
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

interface INpc {
    Id: number,
    Name: string,
    Monster: IMonster,
    Picture: string
}

interface IMonster {
    Name: string
}