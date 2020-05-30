import React, { useState, useEffect } from 'react';
import { IMonster } from '../interfaces/Models';
import { BPMonster } from '../interfaces/Initialisations';

export default function Monster(props: { monster: IMonster, id: number }) {
    const [monster, setMonster] = useState(BPMonster);
    const [loading, setLoading] = useState(true);

    const getMonster = async () => {
        const response = await fetch(`http://localhost:53596/Npc/${id}`)
    }

    useEffect(() => {
        props.monster ? setMonster(props.monster) : getMonster()
    }, [])
}