import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './pages/Home'
import CharacterList from './components/CharacterList';
import NpcList from './pages/NpcList';
import Counter from './components/Counter';
import 'typeface-roboto'

import './custom.css'
import CharacterDetails from './components/CharacterDetails';

export default function App(props) {
    const displayName = App.name;

    return (
        <Layout>
            <Route exact path='/' component={Home} />
            <Route path='/counter' component={Counter} />
            <Route path='/characters' component={CharacterList} />
            <Route path='/character-details/:id' children={<CharacterDetails />} />
            <Route path='/npcs' component={NpcList} />
        </Layout>
    );
}
