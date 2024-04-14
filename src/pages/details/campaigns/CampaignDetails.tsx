import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { useDnDApi } from '../../../api/dndDb';
import { CampaignDto, CampaignsClient } from '../../../api/model';
import { Button } from '../../../components/Button/Button';
import { GeneratedForm } from '../../../components/form/GeneratedForm';
import { useAuth } from '../../../hooks/useAuth';
import { campaignForm } from './CampaignDetails.form';

interface CampaignDetailsProps {}

const client = new CampaignsClient();

export const CampaignDetails = ({}: CampaignDetailsProps) => {
  const { id: campaignId } = useParams<{ id: string }>();
  const navigate = useNavigate();

  client.setAuthToken(useAuth().token);

  const {
    loading,
    invoke,
    response: campaign,
  } = useDnDApi(() => client.getCampaignById(campaignId ?? '', null, ''));

  useEffect(() => {
    if (campaignId) {
      invoke();
    }
  }, [campaignId]);

  const form = useForm<Required<CampaignDto>>({
    mode: 'onBlur',
  });

  const { formState, handleSubmit, reset } = form;

  useEffect(() => {
    if (campaign) {
      reset(campaign);
    }
  }, [campaign]);

  const updateCampaign = async (payload: CampaignDto) => {
    if (campaignId) {
      await client.updateCampaignPUT(campaignId, payload);
    } else {
      await client.createCampaign(payload);
      navigate(`/campaigns`);
    }
  };

  return !loading ? (
    <>
      <form
        onSubmit={handleSubmit(updateCampaign)}
        className="monsterform__main-container"
      >
        <div className="monsterform__header">
          <h1>{campaign?.name ?? 'Create Campaign'}</h1>
          <div>
            <Button text="Create" submit type="submit" />
          </div>
        </div>

        <div className="monsterform__content">
          <GeneratedForm
            formBuilder={campaignForm}
            form={form}
            errors={formState.errors}
          />
        </div>
      </form>
    </>
  ) : (
    <ClipLoader />
  );
};
