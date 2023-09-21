import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDnDApi } from '../api/dndDb';
import { LocalesClient, Map } from '../api/model';
import LocationMap from '../components/mapping/LocationMap';
import './LocationHub.styles.scss';

const PREFIX = 'LocationHub';

const classes = {
  root: `${PREFIX}-root`,
};

const localeClient = new LocalesClient();

export default function LocationHub() {
  const [maps, setMaps] = useState<Map[]>();
  const [view, setView] = useState<string>('buildings');
  const [currentMapIndex, setCurrentMapIndex] = useState(0);

  const { campaignId } = useParams<{ campaignId: string }>();

  // TODO replace
  const fixedid: string = '97e40163-3c5c-4f76-b3ce-e6e88ec936ed';

  const {
    loading,
    invoke,
    response: locale,
  } = useDnDApi((id: string) =>
    localeClient.getLocaleById(
      campaignId ?? '',
      id,
      null,
      'Maps.Buildings.Building.Npcs',
    ),
  );

  useEffect(() => {
    invoke(fixedid);
  }, []);

  useEffect(() => {
    locale?.maps && setMaps(locale.maps);
  }, [locale]);

  const setMap = (_: unknown, index: number) => {
    setCurrentMapIndex(index);
  };

  const setMapIcons = (_: unknown, nextView: string) => {
    setView(nextView);
  };

  return loading ? (
    <p>
      <em>Loading...</em>
    </p>
  ) : (
    <div className="locationhub__container">
      <div className="locationhub__map">
        {maps && <LocationMap map={maps[currentMapIndex]} iconName={view} />}
      </div>
    </div>
  );
}
