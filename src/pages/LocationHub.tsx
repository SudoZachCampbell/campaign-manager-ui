import React from 'react';
import { Map, Marker, TileLayer, Popup, ImageOverlay } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css';
import icon from '../assets/icons/person.svg';

export default function LocationHub(props) {

    const personIcon = new L.icon({
        iconUrl: icon,
        iconRetinaUrl: icon,
        iconAnchor: [20, 40],
        popupAnchor: [0, -35],
        iconSize: [60, 60]
    }) 

    const bounds = [[0, 0], [4734, 7000]]
    const style = { height: '80vh', width: '75vw' }

    return (
        <Map crs={L.CRS.Simple} minZoom={-3} bounds={bounds} style={style}>
            <Marker icon={personIcon} position={[bounds[1][0] - 1830, 3083]}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
            </Marker>
            <ImageOverlay
                bounds={bounds}
                url='https://ddimagecollection.s3-eu-west-1.amazonaws.com/maps/PhanDay.jpg'
            />

        </Map>
    )
}