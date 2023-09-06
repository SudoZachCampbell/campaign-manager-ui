import { Npc } from '../../../api/model';
import { FormInput } from '../../../components/form/Form.model';

export const npcForm: FormInput<Required<Npc>>[] = [
  {
    name: 'name',
    label: 'Name',
    type: 'text',
  },
  {
    name: 'background',
    label: 'Background',
    type: 'text',
  },
  //   {
  //     name: 'noteable_events',
  //     label: 'Noteable Events',
  //     type: FieldType.Array,
  //   },
  //   {
  //     name: 'beliefs',
  //     label: 'Beliefs',
  //     type: FieldType.Array,
  //   },
  //   {
  //     name: 'passions',
  //     label: 'Passions',
  //     type: FieldType.Array,
  //   },
  //   {
  //     name: 'flaws',
  //     label: 'Flaws',
  //     type: FieldType.Array,
  //   },
];
