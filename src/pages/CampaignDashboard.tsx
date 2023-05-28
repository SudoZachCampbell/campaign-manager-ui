import { Controller, useForm } from 'react-hook-form';
import { Campaign, CampaignsClient, CampaignType } from '../api/Model';
import { useAuth } from '../hooks/useAuth';
import { useParams } from 'react-router-dom';
import { useDnDApi } from '../api/dndDb';
import { useEffect } from 'react';
import { FormTextField } from '../components/formInputs/FormTextField';
import _ from 'lodash';
import { FormSelect } from '../components/formInputs/FormSelect';

interface CampaignDashboardProps {}

const client = new CampaignsClient();

export const CampaignDashboard = ({}: CampaignDashboardProps) => {
  const { id: campaignId } = useParams<{ id: string }>();

  const { invoke, response: campaign } = useDnDApi(() =>
    client.getCampaignById(campaignId ?? '', 'monsters'),
  );

  useEffect(() => {
    if (campaignId) {
      invoke();
    }
  }, [campaignId]);

  client.setAuthToken(useAuth().token);
  return (
    <div className='campaigndash__container'>
      <div className='campaigndash__top'>
        <div className='campaigndash__monster_container'>
          <table>
            <thead></thead>
            <tbody>{}</tbody>
          </table>
        </div>
        <div className='campaigndash__location__container'></div>
      </div>
      <div className='campaigndash__bottom'>
        <div className='campaigndash__player__container'></div>
      </div>
    </div>
  );
};
