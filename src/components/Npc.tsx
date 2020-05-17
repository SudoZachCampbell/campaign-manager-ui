import * as React from 'react';
import { useEffect, useState } from 'react';
import { Button, Col, Container, Image, Row } from 'react-bootstrap';
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

    const renderNpcArea = () =>
        <Container>
            <Row>
                <Col>
                    <h1 className="display-4">{npc.Name}</h1>
                    <div>{npc.Monster ? npc.Monster.Name : "None"}</div>
                    <Button variant="outline-info">Details</Button>
                </Col>
                {npc.Picture &&
                    <Col style={{ height: "100px" }}>
                        <Image src={`https\://ddimagecollection.s3-eu-west-1.amazonaws.com/npc/${npc.Picture}`} />
                    </Col>
                }
            </Row>
        </Container>

    const contents = loading
        ? <p><em>Loading...</em></p>
        : renderNpcArea();

    return contents;
}

interface INpc {
    Name: string,
    Monster: IMonster,
    Picture: string
}

interface IMonster {
    Name: string
}