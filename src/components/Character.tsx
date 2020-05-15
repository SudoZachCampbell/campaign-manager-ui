import * as React from 'react';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

export default function Character(props: any) {

    return (
        <div>
            <div>Name: {props.character["name"]}</div>
            <div>Str: {props.character["str"]}</div>
            <div>Dex: {props.character["dex"]}</div>
            <div>Con: {props.character["con"]}</div>
            <div>Int: {props.character["int"]}</div>
            <div>Wis: {props.character["wis"]}</div>
            <div>Cha: {props.character["cha"]}</div>
            <Button variant="outline-info">Details</Button>
        </div>
    )
}