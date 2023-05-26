import { Controller, useForm } from 'react-hook-form';
import { Campaign, CampaignsClient, CampaignType } from '../api/Model';
import { useAuth } from '../hooks/useAuth';
import { useParams } from 'react-router-dom';
import { useDnDApi } from '../api/dndDb';
import { useEffect } from 'react';
import { FormTextField } from '../components/formInputs/FormTextField';
import _ from 'lodash';
import { FormSelect } from '../components/formInputs/FormSelect';

interface CampaignDetailsProps {}

const client = new CampaignsClient();

export const CampaignDetails = ({}: CampaignDetailsProps) => {
  const { id: campaignId } = useParams<{ id: string }>();

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

  const updateCampaign = (payload: Campaign) => {
    if (campaignId) {
    } else {
      client.createCampaign(payload);
    }
  };

  console.log(
    `CampaignDetails.tsx:46 Object.values(CampaignType)`,
    Object.values(CampaignType).slice(
      0,
      Object.values(CampaignType).length / 2,
    ),
  );

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
              options={Object.values(CampaignType)
                .slice(0, Object.values(CampaignType).length / 2)
                .map((type) => ({
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
