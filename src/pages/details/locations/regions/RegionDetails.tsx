import { useDnDApi } from 'api/dndDb';
import { Client, RegionDto } from 'api/model';
import { Button } from 'components/Button/Button';
import { GeneratedForm } from 'components/form/GeneratedForm';
import { useAuth } from 'hooks/useAuth';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { regionForm } from './RegionDetails.form';

interface RegionDetailsProps {}

const client = new Client();

export const RegionDetails: FC<RegionDetailsProps> = ({}) => {
  const { campaignId, id: regionId } = useParams<{
    id: string;
    campaignId: string;
  }>();
  const navigate = useNavigate();

  client.setAuthToken(useAuth().token);

  const {
    loading,
    invoke,
    response: region,
  } = useDnDApi(() =>
    client.regions_GetRegionById(campaignId ?? '', regionId ?? '', ''),
  );

  useEffect(() => {
    if (regionId) {
      invoke();
    }
  }, [regionId]);

  const form = useForm<Required<RegionDto>>({
    mode: 'onBlur',
  });

  const { formState, handleSubmit, reset } = form;

  useEffect(() => {
    if (region) {
      reset(region);
    }
  }, [region]);

  const updateRegion = async (payload: RegionDto) => {
    if (campaignId) {
      payload = { ...payload, campaign_id: campaignId };
      if (regionId) {
        await client.regions_UpdateRegionPUT(campaignId, regionId, payload);
      } else {
        await client.regions_CreateRegion(campaignId, payload);
      }
      navigate('../location-hub');
    }
  };

  return !loading ? (
    <div className="form__main-container--padding">
      <form
        onSubmit={handleSubmit(updateRegion)}
        className="form__main-container"
      >
        <div className="form__header">
          <h1>{region?.name ?? 'Create Region'}</h1>
        </div>

        <div className="form__content">
          <GeneratedForm
            formBuilder={regionForm}
            form={form}
            errors={formState.errors}
          />
        </div>

        <div className="form__footer">
          <div>
            <Button type="submit">Create</Button>
          </div>
        </div>
      </form>
    </div>
  ) : (
    <ClipLoader />
  );
};
