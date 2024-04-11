// @ts-ignore
import { Marker, Popup } from 'react-leaflet';
// @ts-ignore
import { Typography } from '@mui/material';
import L from 'leaflet';

import { BaseDto } from '../../api/model';

export default function LocationMarker({
  position,
  entities,
  icon,
}: {
  key: number;
  position: [number, number];
  entities: BaseDto[];
  icon: L.Icon[];
}) {
  return (
    <Marker
      icon={entities.length > 1 && icon.length > 1 ? icon[1] : icon[0]}
      position={position}
    >
      <Popup>
        {entities.map((entity) => (
          <Typography key={entity.id} variant="subtitle2">
            {/* {entity.name} */}
          </Typography>
        ))}
      </Popup>
    </Marker>
  );
}
