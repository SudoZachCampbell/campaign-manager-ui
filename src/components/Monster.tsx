import React, { useState, useEffect } from 'react';
import { IMonster } from '../interfaces/Models';
import BP from '../interfaces/Initialisations';
import { getEntity, Type } from '../api/dndDb';

export default function Monster(props: { monster: IMonster; id: string }) {
  const [monster, setMonster] = useState(BP.Monster);
  const [loading, setLoading] = useState(true);

  const getMonster = async () => {
    const monster: IMonster = await getEntity<IMonster>(
      Type.MONSTER,
      props.id,
      [''],
    );
  };

  useEffect(() => {
    props.monster ? setMonster(props.monster) : getMonster();
  }, []);
}
