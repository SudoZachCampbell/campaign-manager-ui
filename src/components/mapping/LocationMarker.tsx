import React from 'react';
import { Marker, TileLayer, Popup, ImageOverlay } from 'react-leaflet';
import L from 'leaflet';
import { Typography } from '@material-ui/core';
import { Base } from '../../api/Model';

export default function LocationMarker({
  position,
  entities,
  icon,
}: {
  key: number;
  position: number[];
  entities: Base[];
  icon: L.icon[];
}) {
  return (
    <Marker
      icon={entities.length > 1 && icon.length > 1 ? icon[1] : icon[0]}
      position={position}
    >
      <Popup>
        {entities.map((entity) => (
          <Typography variant='subtitle2'>{entity.name}</Typography>
        ))}
      </Popup>
    </Marker>
  );
}
