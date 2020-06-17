import React from 'react';
import { Circle, Map, Marker, TileLayer, Popup, ImageOverlay } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css';
import icon from '../assets/icons/person.svg';
import { Box } from '@material-ui/core';
import { IMap } from '../interfaces/Models';

export default function LocationMap({ map }: { map: IMap }) {

    const personIcon = new L.icon({
        iconUrl: icon,
        iconRetinaUrl: icon,
        iconAnchor: [17.5, 25],
        popupAnchor: [0, -35],
        iconSize: [45, 45]
    })

    const buildingIcon = new L.icon({
        iconUrl: icon,
        iconRetinaUrl: icon,
        iconAnchor: [17.5, 25],
        popupAnchor: [0, -35],
        iconSize: [45, 45]
    })

    const bounds = [[0, 0], [4734, 7000]]
    const style = { height: '80vh', width: '75vw' }

    return (
        <Box display='flex' justifyContent='center'>
            <Map crs={L.CRS.Simple} center={[0, 0]} minZoom={-2} bounds={bounds} style={style}>
                {map.buildings.map(building => {
                    return building.coords ? (
                        <Marker icon={buildingIcon} position={[bounds[1][0] - building.coords[0], building.coords[1]]}>
                            <Popup>
                                {building.name} <br /> Easily customizable.
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
    )
}