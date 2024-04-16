import { useDnDApi } from 'api/dndDb';
import { CampaignWithLocationsDto, Client } from 'api/model';
import { Button } from 'components/Button/Button';
import { useAuth } from 'hooks/useAuth';
import { startCase } from 'lodash';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './LocationHub.styles.scss';

const PREFIX = 'LocationHub';

const campaignsClient = new Client();

const locationColumns: (keyof CampaignWithLocationsDto)[] = [
  'worlds',
  'continents',
  'regions',
  'locales',
  'buildings',
  'dungeons',
];

export default function LocationHub() {
  const navigate = useNavigate();
  const { campaignId } = useParams<{ campaignId: string }>();

  campaignsClient.setAuthToken(useAuth().token);

  const {
    loading,
    invoke,
    response: campaign,
  } = useDnDApi(() =>
    campaignsClient.campaigns_GetCampaignWithLocations(campaignId ?? ''),
  );

  useEffect(() => {
    invoke();
  }, []);

  return loading || !campaign ? (
    <p>
      <em>Loading...</em>
    </p>
  ) : (
    <div className="locationhub__container">
      <div className="locationhub__columns">
        {locationColumns.map((type) => (
          <div className={`locationhub__column ${type}`}>
            <div className="locationhub__column--header">
              <h2>{startCase(type)}</h2>
              <Button
                type="add"
                onClick={() =>
                  navigate(`/campaigns/${campaignId}/${type}/create`)
                }
              >
                +
              </Button>
            </div>
            <div className="locationhub__column--data">
              {/* Sort types */}
              {campaign[type]?.map((thing) => (
                <div>{thing.name}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // ) : (
  //   <div className="locationhub__map">
  //     {maps && <LocationMap map={maps[currentMapIndex]} iconName={view} />}
  //   </div>
  // )}
}
