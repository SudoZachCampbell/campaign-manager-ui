import { useState } from 'react';
import * as React from 'react';
import * as _ from 'lodash';
import NpcSummary from './NpcSummary';
import MonsterSummary from './MonsterSummary';
import { Base } from '../api/Model';

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
  link?: (props: Record<string, any>) => string;
}

interface TableData extends Base {
  name: string;
}

export const CollapsibleTable = <T extends TableData>({
  dataSet,
  Component,
  columns,
}: CollapsibleTableProps<T>): JSX.Element => {
  const columnLookup = columns.reduce<Record<string, TableColumn>>(
    (acc, column) => {
      acc[column.name] = column;
      return acc;
    },
    {},
  );

  console.log(`CollapsibleTable.tsx:39 columnLookup`, columnLookup);

  return (
    <div className='table__container'>
      <table>
        <thead>
          <tr>
            <td key='Empty'></td>
            {columns.map(({ header }) => (
              <td key={header}>{header}</td>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataSet.map((instance: T) => {
            console.log(`CollapsibleTable.tsx:52 instance`, instance);
            return (
              <Row
                key={instance.id}
                instance={instance}
                columnMeta={columnLookup}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

interface RowProps<T> {
  instance: Partial<T>;
  columnMeta: Record<string, TableColumn>;
}

const Row = <T extends Base>({
  instance,
  columnMeta,
}: RowProps<T>): JSX.Element => {
  return (
    <tr>
      <td>
        {/* <IconButton size='small' onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton> */}
      </td>
      {Object.entries(instance).reduce<JSX.Element[]>(
        (acc, [key, instanceData]) => {
          const columnEntry = columnMeta[key];
          if (columnEntry) {
            acc.push(
              <td key={key}>
                {columnEntry.link ? (
                  <a href={columnEntry.link(instance)}>{instanceData}</a>
                ) : (
                  instanceData
                )}
              </td>,
            );
          }
          return acc;
        },
        [],
      )}
    </tr>
  );
};
