import { useDnDApi } from 'api/dndDb';
import { Client, LocaleDto } from 'api/model';
import { Button } from 'components/Button/Button';
import { GeneratedForm } from 'components/form/GeneratedForm';
import { useAuth } from 'hooks/useAuth';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { localeForm } from './LocaleDetails.form';

interface LocaleDetailsProps {}

const client = new Client();

export const LocaleDetails: FC<LocaleDetailsProps> = ({}) => {
  const { campaignId, id: localeId } = useParams<{
    id: string;
    campaignId: string;
  }>();
  const navigate = useNavigate();

  client.setAuthToken(useAuth().token);

  const {
    loading,
    invoke,
    response: locale,
  } = useDnDApi(() =>
    client.locales_GetLocaleById(campaignId ?? '', localeId ?? '', ''),
  );

  useEffect(() => {
    if (localeId) {
      invoke();
    }
  }, [localeId]);

  const form = useForm<Required<LocaleDto>>({
    mode: 'onBlur',
  });

  const { formState, handleSubmit, reset } = form;

  useEffect(() => {
    if (locale) {
      reset(locale);
    }
  }, [locale]);

  const updateLocale = async (payload: LocaleDto) => {
    if (campaignId) {
      payload = { ...payload, campaign_id: campaignId };
      if (localeId) {
        await client.locales_UpdateLocalePUT(campaignId, localeId, payload);
      } else {
        await client.locales_CreateLocale(campaignId, payload);
      }
      navigate('../location-hub');
    }
  };

  return !loading && campaignId ? (
    <div className="form__main-container--padding">
      <form
        onSubmit={handleSubmit(updateLocale)}
        className="form__main-container"
      >
        <div className="form__header">
          <h1>{locale?.name ?? 'Create Locale'}</h1>
        </div>

        <div className="form__content">
          <GeneratedForm
            formBuilder={localeForm(campaignId)}
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
