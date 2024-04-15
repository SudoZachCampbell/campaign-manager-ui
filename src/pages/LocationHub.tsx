import { useDndCollectionApi } from 'api/dndDb';
import { WorldsClient } from 'api/model';
import { Button } from 'components/Button/Button';
import { startCase } from 'lodash';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './LocationHub.styles.scss';

const PREFIX = 'LocationHub';

const classes = {
  root: `${PREFIX}-root`,
};

const worldClient = new WorldsClient();

export default function LocationHub() {
  const navigate = useNavigate();
  const { campaignId } = useParams<{ campaignId: string }>();

  // TODO replace
  const fixedid: string = '97e40163-3c5c-4f76-b3ce-e6e88ec936ed';

  const {
    loading,
    invoke,
    response: worlds,
  } = useDndCollectionApi(() =>
    worldClient.getCampaignWorlds(campaignId ?? ''),
  );

  useEffect(() => {
    invoke(fixedid);
  }, []);

  return loading ? (
    <p>
      <em>Loading...</em>
    </p>
  ) : (
    <div className="locationhub__container">
      <div className="locationhub__columns">
        {[
          'worlds',
          'continents',
          'regions',
          'locales',
          'buildings',
          'dungeons',
        ].map((type) => (
          <div className={`locationhub__column ${type}`}>
            <div className="locationhub__column--header">
              <h2>{startCase(type)}</h2>
              <Button type="add">+</Button>
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
