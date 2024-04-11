import * as React from 'react';

import { Link } from 'react-router-dom';
import { BaseDto } from '../../api/model';
import './Table.styles.scss';
//#region TableData
export interface CollapsibleTableProps<T extends BaseDto> {
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

interface TableData extends BaseDto {
  name?: string;
}

export const Table = <T extends TableData>({
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

  return (
    <div className="table__container">
      <table>
        <thead>
          <tr>
            <td key="Empty"></td>
            {columns.map(({ header }) => (
              <td key={header}>{header}</td>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataSet.map((instance: T) => (
            <Row
              key={instance.id}
              instance={instance}
              columnMeta={columnLookup}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

interface RowProps<T> {
  instance: Partial<T>;
  columnMeta: Record<string, TableColumn>;
}

const Row = <T extends BaseDto>({
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
                  <Link to={columnEntry.link(instance)}>{instanceData}</Link>
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
