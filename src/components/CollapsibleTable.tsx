import { useState } from 'react';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import * as _ from 'lodash';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp';
import { ITableList } from '../interfaces/Models';
import NpcSummary from './NpcSummary';
import MonsterSummary from './MonsterSummary';
import { Base } from '../api/Model';

const PREFIX = 'CollapsibleTable';

const classes = {
  root: `${PREFIX}-root`,
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')({
  [`& .${classes.root}`]: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

//#region TableData
export interface CollapsibleTableProps<T> {
  Component?: React.FC<{ id: string }>;
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
              return <Row key={instance.id} instance={picked} />;
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
