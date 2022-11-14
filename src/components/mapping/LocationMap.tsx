import React, { useEffect, useState, useRef } from 'react';
import { Map, Marker, TileLayer, Popup, ImageOverlay } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import PersonIcon from '../../assets/icons/person.svg';
import BuildingIcon from '../../assets/icons/building.svg';
import PeopleIcon from '../../assets/icons/people.svg';
import ArrowIcon from '../../assets/icons/arrow.svg';
import { Box } from '@material-ui/core';
import { IMap, IBuilding, IMonster, INpc } from '../../interfaces/Models';
import LocationMarker from './LocationMarker';

const personIcon = new L.icon({
  iconUrl: PersonIcon,
  iconRetinaUrl: PersonIcon,
  iconAnchor: [17.5, 25],
  popupAnchor: [0, -35],
  iconSize: [45, 45],
});

const peopleIcon = new L.icon({
  iconUrl: PeopleIcon,
  iconRetinaUrl: PeopleIcon,
  iconAnchor: [17.5, 25],
  popupAnchor: [0, -35],
  iconSize: [45, 45],
});

const buildingIcon = new L.icon({
  iconUrl: BuildingIcon,
  iconRetinaUrl: BuildingIcon,
  iconAnchor: [17.5, 25],
  popupAnchor: [0, -35],
  iconSize: [45, 45],
});

const arrowIcon = new L.icon({
  iconUrl: ArrowIcon,
  iconRetinaUrl: ArrowIcon,
  iconAnchor: [17.5, 25],
  popupAnchor: [0, -35],
  iconSize: [45, 45],
});

export default function LocationMap({
  map,
  iconName,
  data,
}: {
  map: IMap;
  iconName: string;
  data?: INpc[] | IMonster[];
}) {
  const [bounds, setBounds] = useState<number[][] | null>(null);
  const [icon, setIcon] = useState([buildingIcon]);
  const [center, setCenter] = useState([0, 0]);
  const [dataPlacements, setDataPlacements] = useState<any[]>([]);

  const mapRef = useRef();

  const style = { height: data?.length ? '50vh' : '80vh', width: '100%' };

  function findHHandWW(this: any, ev: Event) {
    setBounds([
      [0, 0],
      [this.height, this.width],
    ]);
    return true;
  }

  useEffect(() => {
    let tempIcon: L.icon[] = [];
    switch (iconName) {
      case 'buildings':
        tempIcon = [buildingIcon];
        break;
      case 'npcs':
        tempIcon = [personIcon, peopleIcon];
        break;
      default:
        tempIcon = [arrowIcon];
    }
    setIcon(() => tempIcon);
  }, [iconName]);

  const showImage = (imgPath: string) => {
    let myImage = new Image();
    myImage.name = imgPath;
    myImage.onload = findHHandWW;
    myImage.src = imgPath;
  };

  useEffect(() => {
    showImage(
      `https://ddimagecollection.s3-eu-west-1.amazonaws.com/maps/${map.image_url}`,
    );
    if (bounds) {
      setCenter([bounds[1][0] / 2, bounds[0][0] / 2]);
    }
  }, [map]);

  useEffect(() => {
    // @ts-ignore
    mapRef.current && mapRef.current.leafletElement.panTo(center);
  }, [center]);

  useEffect(() => {
    console.log('Data: ', dataPlacements);
    if (dataPlacements.length !== 0) {
      let dataCenter = dataPlacements[0]['props']['position'];
      bounds && dataCenter && setCenter([...dataCenter]);
    }
  }, [dataPlacements]);

  useEffect(() => {
    let dataCenter;
    data?.forEach((instance, index) => {
      if (instance.building?.maps) {
        const location = instance.building?.maps[0];
        console.log(
          `Location: [${location.coords[0]},${location.coords[1]}], Npc: `,
          instance,
        );
        if (bounds != null) {
          dataPlacements.push(
            <LocationMarker
              key={index}
              position={[bounds[1][0] - location.coords[0], location.coords[1]]}
              entities={[instance]}
              icon={icon}
            />,
          );
          dataCenter = [bounds[1][0] - location.coords[0], location.coords[1]];
        }
      } else {
        return null;
      }
    });
    setDataPlacements([...dataPlacements]);
  }, [data, bounds]);

  console.log('Center: ', center);

  return bounds ? (
    <Box display='flex' justifyContent='center' height='100%' overflow='hidden'>
      <Map
        crs={L.CRS.Simple}
        center={center}
        minZoom={-2}
        bounds={bounds}
        style={style}
        ref={mapRef}
      >
        {data
          ? dataPlacements
          : map.buildings?.map(({ coords, building }, index) => {
              switch (iconName) {
                case 'buildings':
                  return coords ? (
                    <LocationMarker
                      key={index}
                      position={[bounds[1][0] - coords[0], coords[1]]}
                      entities={[building]}
                      icon={icon}
                    />
                  ) : null;
                case 'npcs':
                  return coords && building.npcs.length > 0 ? (
                    <LocationMarker
                      key={index}
                      position={[bounds[1][0] - coords[0], coords[1]]}
                      entities={building.npcs}
                      icon={icon}
                    />
                  ) : null;
                case 'monsters':
                  return coords && building.monsters.length > 0 ? (
                    <LocationMarker
                      key={index}
                      position={[bounds[1][0] - coords[0], coords[1]]}
                      entities={building.monsters}
                      icon={icon}
                    />
                  ) : null;
              }
            })}

        <ImageOverlay
          bounds={bounds}
          url={`https://ddimagecollection.s3-eu-west-1.amazonaws.com/maps/${map.image_url}`}
        />
      </Map>
    </Box>
  ) : null;
}
