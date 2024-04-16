import { useDnDApi } from 'api/dndDb';
import { Client } from 'api/model';
import { useAuth } from 'hooks/useAuth';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

interface CampaignDashboardProps {}

const client = new Client();

export const CampaignDashboard = ({}: CampaignDashboardProps) => {
  const { id: campaignId } = useParams<{ id: string }>();

  const { invoke, response: campaign } = useDnDApi(() =>
    client.campaigns_GetCampaignById(campaignId ?? '', 'monsters'),
  );

  useEffect(() => {
    if (campaignId) {
      invoke();
    }
  }, [campaignId]);

  client.setAuthToken(useAuth().token);
  return (
    <div className="campaigndash__container">
      <div className="campaigndash__top">
        <div className="campaigndash__monster_container">
          <table>
            <thead></thead>
            <tbody>{}</tbody>
          </table>
        </div>
        <div className="campaigndash__location__container"></div>
      </div>
      <div className="campaigndash__bottom">
        <div className="campaigndash__pc__container"></div>
      </div>
    </div>
  );
};
