import _ from 'lodash';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { Campaign, CampaignType, CampaignsClient } from '../api/Model';
import { useDnDApi } from '../api/dndDb';
import { FormSelect } from '../components/formInputs/FormSelect';
import { FormawdawdTextField } from '../components/formInputs/FormTextField';
import { useAuth } from '../hooks/useAuth';

interface CampaignDetailsProps {}

const client = new CampaignsClient();

export const CampaignDetails = ({}: CampaignDetailsProps) => {
  const { id: campaignId } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { invoke, response: campaign } = useDnDApi(() =>
    client.getCampaignById(campaignId ?? ''),
  );

  useEffect(() => {
    if (campaignId) {
      invoke();
    }
  }, [campaignId]);

  client.setAuthToken(useAuth().token);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
    watch,
    trigger,
  } = useForm<Campaign>({ mode: 'onBlur' });

  const updateCampaign = async (payload: Campaign) => {
    if (campaignId) {
    } else {
      const { id } = await client.createCampaign(payload);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(updateCampaign)}>
        <Controller
          name='name'
          control={control}
          render={({ field: { onChange, onBlur, name, value } }) => (
            <FormTextField
              onChange={onChange}
              onBlur={onBlur}
              name={name}
              value={value}
              label='Name'
            />
          )}
        />
        <Controller
          name='type'
          control={control}
          render={({ field: { onChange, onBlur, name, value } }) => (
            <FormSelect
              onChange={onChange}
              onBlur={onBlur}
              name={name}
              value={value}
              options={Object.values(CampaignType).map((type) => ({
                value: type.toString(),
                label: _.startCase(type.toString()),
              }))}
            />
          )}
        />
        <input value='Create' type='submit' />
      </form>
    </div>
  );
};
