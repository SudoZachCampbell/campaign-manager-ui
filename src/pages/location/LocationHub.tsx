import CreateIcon from '@mui/icons-material/Create';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import { useDnDApi } from 'api/dndDb';
import { Client } from 'api/model';
import { Button } from 'components/Button/Button';
import { useAuth } from 'hooks/useAuth';
import { startCase } from 'lodash';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { LocationInterface, SelectedLocation } from './LocationHub.model';
import './LocationHub.styles.scss';
import { generateLocation, locationColumns } from './LocationHub.utils';

const client = new Client();

export default function LocationHub() {
  const navigate = useNavigate();
  const { campaignId } = useParams<{ campaignId: string }>();

  const [selectedReference, setSelectedReference] =
    useState<LocationInterface>();

  const [selected, setSelected] = useState<SelectedLocation>();

  client.setAuthToken(useAuth().token);

  const {
    loading,
    invoke,
    response: campaign,
  } = useDnDApi(() =>
    client.campaigns_GetCampaignWithLocations(campaignId ?? ''),
  );

  useEffect(() => {
    setReference();
  }, [campaign, selected]);

  const setReference = async () => {
    setSelectedReference(await generateLocation(client, selected, campaignId));
  };

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
                styling="success"
                onClick={() =>
                  navigate(`/campaigns/${campaignId}/${type}/create`)
                }
              >
                +
              </Button>
            </div>
            <div className="locationhub__column--data">
              {(selectedReference ?? campaign)[type]?.map((location) => {
                return (
                  <div className="locationhub__column-item">
                    <div
                      onClick={() =>
                        setSelected(
                          selected?.type !== type
                            ? { type, instance: location }
                            : undefined,
                        )
                      }
                      style={{
                        color:
                          selected?.instance.id === location.id
                            ? 'grey'
                            : 'black',
                      }}
                    >
                      {location.name}
                    </div>
                    <div className="locationhub__column--icon-group">
                      <div className="locationhub__column--icon">
                        <CreateIcon />
                      </div>
                      <div
                        onClick={() =>
                          navigate(`/campaigns/${campaignId}/location-map`)
                        }
                        className="locationhub__column--icon"
                      >
                        <MapOutlinedIcon />
                      </div>
                    </div>
                  </div>
                );
              })}
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
