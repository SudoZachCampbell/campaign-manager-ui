import React from 'react';
import { useState } from 'react';
import { Route } from 'react-router';
import Layout from './layouts/Layout';
import Home from './pages/Home'
import NpcList from './pages/NpcList';
import MonsterList from './pages/MonsterList';
import 'typeface-roboto'

import './custom.css'
import NpcDetails from './pages/NpcDetails';
import MonsterDetails from './pages/MonsterDetails';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';

export default function App(props) {
    const [pageName, setPageName] = useState('');
    const [pageBanner, setPageBanner] = useState('');

    const theme = createMuiTheme({
        typography: {
            fontFamily: 'Segoe UI',
            body2: {
                fontWeight: 320
            },
            subtitle2: {
                fontWeight: 400
            }
        },
    })

    return (
        <MuiThemeProvider theme={theme}>
            <Layout pageName={pageName} pageBanner={pageBanner}>
                <Route exact path='/' render={(props) => <Home setPageName={setPageName} />} />
                <Route path='/npcs' render={(props) => <NpcList setPageName={setPageName} />} />
                <Route path='/monsters' render={(props) => <MonsterList setPageName={setPageName} />} />
                <Route path='/npc-details/:id' render={(props) => <NpcDetails setPageName={setPageName} setPageBanner={setPageBanner} />} />
                <Route path='/monster-details/:id' render={(props) => <MonsterDetails setPageName={setPageName} setPageBanner={setPageBanner} />} />
            </Layout>
        </MuiThemeProvider>
    );
}
