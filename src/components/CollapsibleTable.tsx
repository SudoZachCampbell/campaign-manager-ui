import { useState } from 'react';
import * as React from 'react';
import * as _ from 'lodash';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import { makeStyles } from '@material-ui/core';
import { ITableList } from '../interfaces/Models';
import NpcSummary from './NpcSummary';
import MonsterSummary from './MonsterSummary';
import { Base } from '../api/Model';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

//#region TableData
export interface CollapsibleTableProps<T> {
  Component?: React.FC<{ id?: string }>;
  dataSet: T[];
  columns: TableColumn[];
}

export interface TableColumn {
  name: string;
  header: string;
  hidden?: boolean;
}

export const CollapsibleTable = <T extends Base>({
  dataSet,
  Component,
  columns,
}: CollapsibleTableProps<T>): JSX.Element => {
  const columnNames = columns.reduce<string[]>((acc, { name }) => {
    acc.push(name);
    return acc;
  }, []);

  return (
    <Grid item style={{ margin: 'auto' }} xs={10}>
      <TableContainer component={Paper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell key='Empty'></TableCell>
              {columns.map(({ header }) => (
                <TableCell key={header}>{header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {dataSet.map((instance: T) => {
              const picked = _.pick(instance, columnNames);
              return (
                <Row
                  key={instance.id}
                  Component={Component && <Component id={instance.id} />}
                  instance={picked}
                />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
};

interface RowProps<T> {
  Component?: React.ReactNode;
  instance: Partial<T>;
}

const Row = <T extends Base>({
  Component,
  instance,
}: RowProps<T>): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false);
  const classes = useRowStyles();

  const types = {
    NpcSummary: NpcSummary,
    MonsterSummary: MonsterSummary,
  };

  return (
    <>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton size='small' onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        {Object.entries(instance).map(([key, instanceData]) => {
          return <TableCell key={key}>{instanceData}</TableCell>;
        })}
      </TableRow>
      <TableRow>
        <TableCell
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={Object.keys(instance).length + 1}
        >
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box>{Component}</Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};
