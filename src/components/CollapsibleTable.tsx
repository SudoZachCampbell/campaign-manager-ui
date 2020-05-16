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

export default function CollapsibleTable(props: ITableData) {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        {props.dataSet.headers.map((header: string) => {
                            return <TableCell key={header}>{header}</TableCell>
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        props.dataSet.data.map((instance: { Id: number }) => {
                            console.log("Instance: ", instance);
                            return <Row key={instance.Id} component={props.component} data={props.dataSet.data} instance={instance} />
                        })
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );

}

function Row(props: any) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <TableRow>
                <TableCell>
                    <IconButton size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    </IconButton>
                </TableCell>
                {
                    _.mapValues(props.instance, (instanceData: any) => {
                        return <TableCell>{instanceData}</TableCell>
                    })
                }
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={Object.keys(props.instance).length}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box>
                            {<props.component id={props.instance.Id} />}
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    )
}