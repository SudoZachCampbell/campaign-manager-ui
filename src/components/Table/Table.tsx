import { ReactNode } from 'react';

import { deepFind } from '@/utils/objects';
import { BaseDto } from 'api/model';
import 'simplebar-react/dist/simplebar.min.css';
import type { TableColumn } from './Table.model';
import './Table.styles.scss';

export interface TableProps<T extends BaseDto> {
  /**
   * An array of data to be presented in the table
   */
  data: T[];
  /**
   * The render settings for each column
   */
  columns: TableColumn<T>[];
  /**
   * The colour style of the header row
   */
  headerStyle?: 'primary' | 'secondary' | 'plain';
  /**
   * The pattern style for each data row
   */
  rowStyle?: 'alternate' | 'border';
}

export const Table = <T extends BaseDto>({
  data,
  columns,
  headerStyle = 'plain',
  rowStyle = 'border',
}: TableProps<T>): JSX.Element => {
  return (
    <div className="table__container">
      <div className="table__wrapper">
        <table className="table__table">
          <thead>
            <tr className={['table__table--header-row', headerStyle].join(' ')}>
              {columns.map(({ header }) => (
                <th className={headerStyle} key={header}>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr
                className={
                  rowStyle === 'alternate' && index % 2 === 1
                    ? 'shaded'
                    : rowStyle
                }
                key={row.id}
              >
                {columns.map((column) => (
                  <td key={column.id}>
                    {'Render' in column
                      ? column.Render?.(row)
                      : (deepFind(row, column.accessor) as ReactNode) ?? '-'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
