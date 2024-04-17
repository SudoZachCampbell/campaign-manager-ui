import { useMemo, useState } from 'react';

import { BaseDto } from 'api/model';
import { Button } from 'components/Button/Button';
import { Table, TableProps } from 'components/Table/Table';
import './PaginatedTable.scss';

interface PaginatedTableProps<T extends BaseDto> extends TableProps<T> {
  /**
   * Whether to include a search bar
   */
  search?: boolean;
}

export const PaginatedTable = <T extends BaseDto>({
  data,
  columns,
  headerStyle = 'primary',
  rowStyle = 'alternate',
}: PaginatedTableProps<T>): JSX.Element => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize] = useState<number>(10);

  const pages: number[] = useMemo(() => {
    const numbers = [];
    for (let i = 1; i <= data.length; i += pageSize) {
      numbers.push(numbers.length + 1);
    }
    return numbers;
  }, [pageSize, data, columns]);

  const firstEntry = (currentPage - 1) * pageSize;
  const lastEntry =
    (currentPage - 1) * pageSize + pageSize > data.length
      ? data.length
      : (currentPage - 1) * pageSize + pageSize;

  return (
    <div className="paginatedtable__container">
      {/* <PaginatedTableToolbar /> */}
      <div className="paginatedtable__table">
        <Table
          data={data.slice(firstEntry, lastEntry)}
          columns={columns}
          headerStyle={headerStyle}
          rowStyle={rowStyle}
        />
      </div>
      <div className="paginatedtable__footer">
        <div>
          Showing {firstEntry + 1} to {lastEntry} of {data.length} entries
        </div>
        <div className="paginatedtable__footer--page-buttons">
          <Button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </Button>
          {pages.map((page) => (
            <Button
              styling={page === currentPage ? 'primary' : 'clear'}
              onClick={() => setCurrentPage(page)}
            >
              {page.toString()}
            </Button>
          ))}
          <Button
            disabled={lastEntry === data.length}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};
