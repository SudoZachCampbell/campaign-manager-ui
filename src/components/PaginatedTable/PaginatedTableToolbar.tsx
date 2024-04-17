import { Select } from 'components/inputs/Select';
import { TextField } from 'components/inputs/TextField';
import { FC } from 'react';
import './PaginatedTable.scss';

interface PaginatedTableToolbarProps {}

export const PaginatedTableToolbar: FC<PaginatedTableToolbarProps> = ({}) => {
  return (
    <div className="paginatedtable__toolbar">
      <div className="paginatedtable__show">
        <div>Show</div>
        <Select
          options={[10, 20, 50, 100].map((option) => ({
            value: option,
            label: `${option}`,
          }))}
        />
        <div>Entries</div>
      </div>
      <TextField />
    </div>
  );
};
