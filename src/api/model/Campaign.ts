import { Owned } from './Owned';
import { AccountCampaign } from './AccountCampaign';
import { CampaignType } from './CampaignType';

export interface Campaign extends Owned {
  name: string;
  type: CampaignType;
  players?: AccountCampaign[] | undefined;
}
