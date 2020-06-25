import React, { useEffect, useState } from 'react';
import { Circle, Map, Marker, TileLayer, Popup, ImageOverlay } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css';
import PersonIcon from '../assets/icons/person.svg';
import BuildingIcon from '../assets/icons/building.svg';
import { Box } from '@material-ui/core';
import { IMap } from '../interfaces/Models';

export default function LocationMap({ map, icons }: { map: IMap, icons: string }) {
    const [bounds, setBounds] = useState<number[][] | null>(null)
    const personIcon = new L.icon({
        iconUrl: PersonIcon,
        iconRetinaUrl: PersonIcon,
        iconAnchor: [17.5, 25],
        popupAnchor: [0, -35],
        iconSize: [45, 45]
    })

    const buildingIcon = new L.icon({
        iconUrl: BuildingIcon,
        iconRetinaUrl: BuildingIcon,
        iconAnchor: [17.5, 25],
        popupAnchor: [0, -35],
        iconSize: [45, 45]
    })
    const style = { height: '80vh', width: '75vw' }

    function findHHandWW(this: any, ev: Event) {
        setBounds([[0, 0], [this.height, this.width]]);
        return true;
    }

    console.log('Bounds: ', bounds)

    function showImage(imgPath: string) {
        let myImage = new Image();
        myImage.name = imgPath;
        myImage.onload = findHHandWW;
        myImage.src = imgPath;
    }

    useEffect(() => {
        showImage(`https://ddimagecollection.s3-eu-west-1.amazonaws.com/maps/${map.image_url}`);
    }, [map])

    return bounds ? (
        <Box display='flex' justifyContent='center'>
            <Map crs={L.CRS.Simple} center={[0, 0]} minZoom={-2} bounds={bounds} style={style}>
                {map.buildings?.map(({ coords, building }) => {
                    return coords ? (
                        <Marker key={building.id} icon={buildingIcon} position={[bounds[1][0] - coords[0], coords[1]]}>
                            <Popup>
                                {building.name}
                            </Popup>
                        </Marker>
                    ) : null
                })}

                <ImageOverlay
                    bounds={bounds}
                    url={`https://ddimagecollection.s3-eu-west-1.amazonaws.com/maps/${map.image_url}`}
                />
                <Circle center={[0, 0]} radius={200} fillColor='blue' />
            </Map>
        </Box>
    ) : null
}