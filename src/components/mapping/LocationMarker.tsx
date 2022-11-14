import React from 'react';
import { Marker, TileLayer, Popup, ImageOverlay } from 'react-leaflet';
import { IModel } from '../../interfaces/Models';
import { LocalConvenienceStoreOutlined } from '@material-ui/icons';
import L from 'leaflet';
import { Typography } from '@material-ui/core';

export default function LocationMarker({
  position,
  entities,
  icon,
}: {
  key: number;
  position: number[];
  entities: IModel[];
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
