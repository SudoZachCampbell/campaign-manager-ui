import { CampaignDto, CampaignTypeDto } from '../../../api/model';
import { FormInput } from '../../../components/form/Form.model';
import { generateOptionsFromEnum } from '../../../components/form/Form.utils';

export const campaignForm: FormInput<Required<CampaignDto>>[] = [
  {
    name: 'name',
    label: 'Name',
    type: 'text',
    required: true,
  },
  {
    name: 'type',
    label: 'Type',
    type: 'select',
    required: true,
    options: generateOptionsFromEnum(CampaignTypeDto),
    defaultValue: CampaignTypeDto.FiveE,
  },
];
