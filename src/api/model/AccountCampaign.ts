import { Account } from './Account';
import { Campaign } from './Campaign';

export interface AccountCampaign {
  accountId: string;
  account?: Account | undefined;
  campaignId: string;
  campaign?: Campaign | undefined;
}
