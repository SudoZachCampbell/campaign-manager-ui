import React from 'react';
// @ts-ignore
import { Marker, TileLayer, Popup, ImageOverlay } from 'react-leaflet';
// @ts-ignore
import L from 'leaflet';
import { Typography } from '@mui/material';

import { Base } from '../../api/model/base';

export default function LocationMarker({
  position,
  entities,
  icon,
}: {
  key: number;
  position: [number, number];
  entities: Base[];
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
