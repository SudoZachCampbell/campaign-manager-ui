import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import * as React from 'react';
import * as _ from 'lodash';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import { ITableData } from '../interfaces/ITableData';
import Npc from './Npc';

export default function CollapsibleTable(props: ITableData) {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell key="Empty"></TableCell>
                        {props.dataSet.headers.map((header: string) => {
                            return <TableCell key={header}>{header}</TableCell>
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        props.dataSet.data.map((instance: { id: number }) => {
                            return <Row key={instance.id} component={props.component} instance={instance} />
                        })
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );

}

function Row(props: { component: string, instance: { id: number } }) {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <>
            <TableRow>
                <TableCell>
                    <IconButton size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    </IconButton>
                </TableCell>
                {
                    _.map(props.instance, (instanceData: string | number | boolean) => {
                        return <TableCell>{instanceData}</TableCell>
                    })
                }
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={Object.keys(props.instance).length}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box>
                            <Npc id={props.instance.id} />
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    )
}