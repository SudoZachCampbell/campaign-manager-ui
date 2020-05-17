import React from 'react';
import {useState, useEffect} from 'react';
import { Route } from 'react-router';
import Layout from './layouts/Layout';
import Home from './pages/Home'
import CharacterList from './components/CharacterList';
import NpcList from './pages/NpcList';
import 'typeface-roboto'

import './custom.css'
import CharacterDetails from './components/CharacterDetails';
import NpcDetails from './pages/NpcDetails';

export default function App(props) {
    const [pageName, setPageName] = useState('');

    return (
        <Layout pageName={pageName}>
            <Route exact path='/' component={Home} />
            <Route path='/characters' component={CharacterList} />
            <Route path='/character-details/:id' children={<CharacterDetails />} />
            <Route path='/npcs' render={(props) => <NpcList setPageName={setPageName} />} />
            <Route path='/npc-details/:id' render={(props) => <NpcDetails setPageName={setPageName} />} />
        </Layout>
    );
}
