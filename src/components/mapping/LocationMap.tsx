/// <reference types="vite-plugin-svgr/client" />

import { useEffect, useRef, useState } from 'react';
// @ts-ignore
// @ts-ignore
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapAdder } from './MapAdder';

const personIcon = new L.Icon({
  iconUrl: '../../asserts/icons/person.svg',
  iconRetinaUrl: '../../asserts/icons/person.svg',
  iconAnchor: [17.5, 25],
  popupAnchor: [0, -35],
  iconSize: [45, 45],
});

const peopleIcon = new L.Icon({
  iconUrl: '../../asserts/icons/people.svg',
  iconRetinaUrl: '../../asserts/icons/people.svg',
  iconAnchor: [17.5, 25],
  popupAnchor: [0, -35],
  iconSize: [45, 45],
});

const buildingIcon = new L.Icon({
  iconUrl: '../../asserts/icons/building.svg',
  iconRetinaUrl: '../../asserts/icons/building.svg',
  iconAnchor: [17.5, 25],
  popupAnchor: [0, -35],
  iconSize: [45, 45],
});

const arrowIcon = new L.Icon({
  iconUrl: '../../asserts/icons/arrow.svg',
  iconRetinaUrl: '../../asserts/icons/arrow.svg',
  iconAnchor: [17.5, 25],
  popupAnchor: [0, -35],
  iconSize: [45, 45],
});

export default function LocationMap({}: {}) {
  const [bounds, setBounds] = useState<[number, number][]>();
  const [icon, setIcon] = useState<L.Icon[]>([buildingIcon]);
  const [center, setCenter] = useState<[number, number]>([0, 0]);
  const [dataPlacements, setDataPlacements] = useState<JSX.Element[]>([]);

  const mapRef = useRef();
  const style = {
    height: '100%',
    width: '100%',
  };

  function findHHandWW(this: any, ev: Event) {
    setBounds([
      [0, 0],
      [this.height, this.width],
    ]);
    return true;
  }

  // useEffect(() => {
  //   let tempIcon: L.Icon[] = [];
  //   switch (iconName) {
  //     case 'buildings':
  //       tempIcon = [buildingIcon];
  //       break;
  //     case 'npcs':
  //       tempIcon = [personIcon, peopleIcon];
  //       break;
  //     default:
  //       tempIcon = [arrowIcon];
  //   }
  //   setIcon(() => tempIcon);
  // }, [iconName]);

  const showImage = (imgPath: string) => {
    let myImage = new Image();
    myImage.name = imgPath;
    myImage.onload = findHHandWW;
    myImage.src = imgPath;
  };

  useEffect(() => {
    showImage(
      `https://ddimagecollection.s3-eu-west-1.amazonaws.com/maps/PhanDawn.jpg`,
    );
    if (bounds) {
      setCenter([bounds[1][0] / 2, bounds[0][0] / 2]);
    }
  }, []);

  useEffect(() => {
    // @ts-ignore
    mapRef.current && mapRef.current.leafletElement.panTo(center);
  }, [center]);

  useEffect(() => {
    if (dataPlacements.length !== 0) {
      let dataCenter = dataPlacements[0]['props']['position'] as [
        number,
        number,
      ];
      bounds && dataCenter && setCenter([...dataCenter]);
    }
  }, [dataPlacements]);

  // useEffect(() => {
  //   let dataCenter;
  //   map.buildings?.forEach(({ building }) =>
  //     building?.npcs?.forEach((instance, index) => {
  //       const location = building?.maps?.[0];
  //       if (location && bounds != null && location.coords != null) {
  //         dataPlacements.push(
  //           <LocationMarker
  //             key={index}
  //             position={[bounds[1][0] - location.coords[0], location.coords[1]]}
  //             entities={[instance]}
  //             icon={icon}
  //           />,
  //         );
  //         dataCenter = [bounds[1][0] - location.coords[0], location.coords[1]];
  //       }
  //     }),
  //   );
  //   setDataPlacements([...dataPlacements]);
  // }, [map, bounds]);

  return bounds ? (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        overflow: 'hidden',
      }}
    >
      <MapAdder />
      {/* <MapContainer
        crs={L.CRS.Simple}
        center={center}
        minZoom={-2}
        bounds={bounds}
        maxBounds={bounds}
        style={style}
        ref={mapRef.current}
        zoomSnap={0.01}
      >
         {map.buildings?.map(({ coords, building }, index) => {
          switch (iconName) {
            case 'buildings':
              return coords ? (
                <LocationMarker
                  key={index}
                  position={[bounds[1][0] - coords[0], coords[1]]}
                  entities={building ? [building] : []}
                  icon={icon}
                />
              ) : null;
            case 'npcs':
              return coords && building?.npcs?.length ? (
                <LocationMarker
                  key={index}
                  position={[bounds[1][0] - coords[0], coords[1]]}
                  entities={building?.npcs ?? []}
                  icon={icon}
                />
              ) : null;
            // case 'monsters':
            //   return coords && building?.monsters?.length ? (
            //     <LocationMarker
            //       key={index}
            //       position={[bounds[1][0] - coords[0], coords[1]]}
            //       entities={building?.monsters ?? []}
            //       icon={icon}
            //     />
            //   ) : null;
          }
        })} 

        <ImageOverlay
          bounds={bounds}
          url={`https://ddimagecollection.s3-eu-west-1.amazonaws.com/maps/PhanDawn.jpg`}
        />
      </MapContainer> */}
    </div>
  ) : null;
}
