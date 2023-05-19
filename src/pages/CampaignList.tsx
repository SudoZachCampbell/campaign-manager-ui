import { useEffect } from 'react';
import { CampaignClient } from '../api/Model';
import { useDndCollectionApi } from '../api/dndDb';

const campaignClient = new CampaignClient();

export const CampaignList = () => {
  const { invoke, response: campaigns } = useDndCollectionApi(() =>
    campaignClient.getCampaigns(),
  );

  useEffect(() => {
    invoke();
  }, []);

  return (
    <div>
      <table>
        <thead></thead>
        <tbody>
          {campaigns?.map((campaign) => (
            <tr>{campaign.id}</tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
