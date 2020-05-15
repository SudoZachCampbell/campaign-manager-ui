import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import * as React from 'react';
import Character from './Character';
import { Accordion, Card, Button, Table } from 'react-bootstrap';
import Tr from './TableAccordionToggle';

export default function CharacterList(props: any) {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [lastOpened, setLastOpened] = useState(0);

    const populateCharactersData = async () => {
        const response = await fetch('character');
        const data = await response.json();
        setCharacters(data);
        setLoading(false);
    }

    const customOnClick = (row: any) => {
        console.log(`Callback fired: ${row}`);
        const rowElement = document.getElementById(`hide-row-${row}`);
        if (rowElement) {
            if (lastOpened) {
                console.log(`Last Opened: ${lastOpened}`)
                const lastRowElement = document.getElementById(`hide-row-${lastOpened}`);
                if (lastRowElement) lastRowElement.style.display = "none"
            }
            rowElement.style.display = rowElement.style.display === "none" ? "table-row" : "none";
            setLastOpened(row);
            console.log("test")
        }
    }

    const renderCharactersTable = (characters: any[]) => {
        return (
            <Router>
                <div>
                    <Accordion>
                        <Table hover>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Armour Class</th>
                                    <th>Hit Points</th>
                                    <th>Alignment</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    characters.map((character: any) =>
                                        <>
                                            <Tr eventKey={`${character.characterId}`} key={character.name} customOnClick={customOnClick}>
                                                <td>{character.characterId}</td>
                                                <td>{character.name}</td>
                                                <td>{character.ac}</td>
                                                <td>{character.hp}</td>
                                                <td>{character.alignment}</td>
                                            </Tr>
                                            <tr id={`hide-row-${character.characterId}`} style={{ display: "none" }}>
                                                <td colSpan={5}>
                                                    <Accordion.Collapse eventKey={`${character.characterId}`}>
                                                        <Character character={character} />
                                                    </Accordion.Collapse>
                                                </td>
                                            </tr>
                                        </>
                                    )
                                }
                            </tbody>
                        </Table>
                    </Accordion>

                    <Switch>
                        {characters.map((character: any) =>
                            <Route exact path={`/character/${character.characterId}`}>
                                <Character character={character} />
                            </Route>
                        )}
                    </Switch>
                </div>
            </Router>
        );
    }

    const contents = loading
        ? <p><em>Loading...</em></p>
        : renderCharactersTable(characters);


    useEffect(() => {
        populateCharactersData();
    }, [])

    return (
        <div>
            <h1 id="tabelLabel" >Characters</h1>
            <p>This component demonstrates fetching data from the server.</p>
            {contents}
        </div>
    );


}
