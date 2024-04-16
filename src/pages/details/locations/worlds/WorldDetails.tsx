import { useDnDApi } from 'api/dndDb';
import { Client, WorldDto } from 'api/model';
import { Button } from 'components/Button/Button';
import { GeneratedForm } from 'components/form/GeneratedForm';
import { useAuth } from 'hooks/useAuth';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { worldForm } from './WorldDetails.form';

interface WorldDetailsProps {}

const client = new Client();

export const WorldDetails: FC<WorldDetailsProps> = ({}) => {
  const { campaignId, id: worldId } = useParams<{
    id: string;
    campaignId: string;
  }>();
  const navigate = useNavigate();

  client.setAuthToken(useAuth().token);

  const {
    loading,
    invoke,
    response: world,
  } = useDnDApi(() =>
    client.worlds_GetWorldById(campaignId ?? '', worldId ?? '', ''),
  );

  useEffect(() => {
    if (worldId) {
      invoke();
    }
  }, [worldId]);

  const form = useForm<Required<WorldDto>>({
    mode: 'onBlur',
  });

  const { formState, handleSubmit, reset } = form;

  useEffect(() => {
    if (world) {
      reset(world);
    }
  }, [world]);

  const updateWorld = async (payload: WorldDto) => {
    if (campaignId) {
      payload = { ...payload, campaign_id: campaignId };
      if (worldId) {
        await client.worlds_UpdateWorldPUT(campaignId, worldId, payload);
      } else {
        await client.worlds_CreateWorld(campaignId, payload);
      }
      navigate('../location-hub');
    }
  };

  return !loading ? (
    <div className="form__main-container--padding">
      <form
        onSubmit={handleSubmit(updateWorld)}
        className="form__main-container"
      >
        <div className="form__header">
          <h1>{world?.name ?? 'Create World'}</h1>
        </div>

        <div className="form__content">
          <GeneratedForm
            formBuilder={worldForm}
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
