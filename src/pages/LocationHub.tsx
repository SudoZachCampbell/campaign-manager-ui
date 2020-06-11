import React from 'react';
import { Map, Marker, TileLayer, Popup, ImageOverlay } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

export default function LocationHub(props) {
    // const bounds = [[0, 0], [1095, 800]]

    // return (
    //     <Map

    //         center={[100,0]}
    //         bounds={bounds}
    //         minZoom={2}>
    //         <ImageOverlay
    //             url='https://ddimagecollection.s3-eu-west-1.amazonaws.com/maps/AreaReduced.jpg
    //             '
    //             bounds={bounds} />
    //         <Marker position={[100, 100]}>
    //             <Popup>
    //                 A Pretty Popup
    //                 </Popup>
    //         </Marker>
    //     </Map>
    // );

    let DefaultIcon = L.icon({
        iconUrl: icon,
        shadowUrl: iconShadow
    });
    
    L.Marker.prototype.options.icon = DefaultIcon;

    const bounds = [[0, 0], [1095, 800]]
    const style = { height: '80vh', width: '75vw' }

    return (
        <Map crs={L.CRS.Simple} minZoom={0} bounds={bounds} style={style}>
            <Marker position={[bounds[1][0] - 852, 458]}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
            </Marker>
            <ImageOverlay
                bounds={bounds}
                url='https://ddimagecollection.s3-eu-west-1.amazonaws.com/maps/AreaReduced.jpg'
            />

        </Map>
    )
}