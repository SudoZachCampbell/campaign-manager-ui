import { useDnDApi } from 'api/dndDb';
import { BuildingDto, Client } from 'api/model';
import { Button } from 'components/Button/Button';
import { GeneratedForm } from 'components/form/GeneratedForm';
import { useAuth } from 'hooks/useAuth';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { buildingForm } from './BuildingDetails.form';

interface BuildingDetailsProps {}

const client = new Client();

export const BuildingDetails: FC<BuildingDetailsProps> = ({}) => {
  const { campaignId, id: buildingId } = useParams<{
    id: string;
    campaignId: string;
  }>();
  const navigate = useNavigate();

  client.setAuthToken(useAuth().token);

  const {
    loading,
    invoke,
    response: building,
  } = useDnDApi(() =>
    client.buildings_GetBuildingById(campaignId ?? '', buildingId ?? '', ''),
  );

  useEffect(() => {
    if (buildingId) {
      invoke();
    }
  }, [buildingId]);

  const form = useForm<Required<BuildingDto>>({
    mode: 'onBlur',
  });

  const { formState, handleSubmit, reset } = form;

  useEffect(() => {
    if (building) {
      reset(building);
    }
  }, [building]);

  const updateBuilding = async (payload: BuildingDto) => {
    if (campaignId) {
      payload = { ...payload, campaign_id: campaignId };
      if (buildingId) {
        await client.buildings_UpdateBuildingPUT(
          campaignId,
          buildingId,
          payload,
        );
      } else {
        await client.buildings_CreateBuilding(campaignId, payload);
      }
      navigate('../location-hub');
    }
  };

  return !loading ? (
    <div className="form__main-container--padding">
      <form
        onSubmit={handleSubmit(updateBuilding)}
        className="form__main-container"
      >
        <div className="form__header">
          <h1>{building?.name ?? 'Create Building'}</h1>
        </div>

        <div className="form__content">
          <GeneratedForm
            formBuilder={buildingForm}
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
