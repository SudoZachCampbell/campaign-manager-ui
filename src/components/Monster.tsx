import * as React from 'react';
import { useEffect, useState } from 'react';
import { Box, Button, Grid, Typography } from '@material-ui/core'
import { IMonster } from '../interfaces/Interfaces';

export default function Monster(props: { id: number }) {
    let [monster, setMonster] = useState<IMonster>({ Id: 0, Name: "", Monster: { Name: "" }, Picture: "",Building: { Name: "" } ,Locale: { Name: "" } });
    let [loading, setLoading] = useState(true);
    
    const populateMonstersData = async () => {
        const response = await fetch(`http://localhost:53596/Monster/${props.id}`);
        console.log("MONSTER Response: ", response);
        const data = await response.json();
        console.log("MONSTER Data: ", data);
        setMonster(data);
        setLoading(false);
    }

    useEffect(() => {
        populateMonstersData();
    }, [])

    const renderMonsterArea = () => {
        return (
            <Box p={3}>
                <Grid container>
                    <Grid item xs={4}>
                        <h1 className="display-4">{monster.Name}</h1>
                        <div>{monster.Monster ? monster.Monster.Name : "None"}</div>
                        <Button variant="contained" color="secondary" href={`/monster-details/${monster.Id}`}>Details</Button>
                    </Grid>
                    {
                        monster.Picture &&
                        <Grid item xs={4}>
                            <img height={"40%"} src={`https://ddimagecollection.s3-eu-west-1.amazonaws.com/monster/${monster.Picture}`} />
                        </Grid>
                    }
                </Grid>
            </Box>
        )
    }

    const renderDisplay = loading ?
        <Typography>Loading</Typography> : renderMonsterArea();

    return renderDisplay;
}

