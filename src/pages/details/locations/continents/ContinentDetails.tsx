import { useDnDApi } from 'api/dndDb';
import { Client, ContinentDto } from 'api/model';
import { Button } from 'components/Button/Button';
import { GeneratedForm } from 'components/form/GeneratedForm';
import { useAuth } from 'hooks/useAuth';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { continentForm } from './ContinentDetails.form';

interface ContinentDetailsProps {}

const client = new Client();

export const ContinentDetails: FC<ContinentDetailsProps> = ({}) => {
  const { campaignId, id: continentId } = useParams<{
    id: string;
    campaignId: string;
  }>();
  const navigate = useNavigate();

  client.setAuthToken(useAuth().token);

  const {
    loading,
    invoke,
    response: continent,
  } = useDnDApi(() =>
    client.continents_GetContinentById(campaignId ?? '', continentId ?? '', ''),
  );

  useEffect(() => {
    if (continentId) {
      invoke();
    }
  }, [continentId]);

  const form = useForm<Required<ContinentDto>>({
    mode: 'onBlur',
  });

  const { formState, handleSubmit, reset } = form;

  useEffect(() => {
    if (continent) {
      reset(continent);
    }
  }, [continent]);

  const updateContinent = async (payload: ContinentDto) => {
    if (campaignId) {
      payload = { ...payload, campaign_id: campaignId };
      if (continentId) {
        await client.continents_UpdateContinentPUT(
          campaignId,
          continentId,
          payload,
        );
      } else {
        await client.continents_CreateContinent(campaignId, payload);
      }
      navigate('../location-hub');
    }
  };

  return !loading && campaignId ? (
    <div className="form__main-container--padding">
      <form
        onSubmit={handleSubmit(updateContinent)}
        className="form__main-container"
      >
        <div className="form__header">
          <h1>{continent?.name ?? 'Create Continent'}</h1>
        </div>

        <div className="form__content">
          <GeneratedForm
            formBuilder={continentForm(campaignId)}
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
