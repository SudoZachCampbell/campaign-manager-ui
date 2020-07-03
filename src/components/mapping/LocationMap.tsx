import React, { useEffect, useState } from 'react';
import { Map, Marker, TileLayer, Popup, ImageOverlay } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css';
import PersonIcon from '../../assets/icons/person.svg';
import BuildingIcon from '../../assets/icons/building.svg';
import PeopleIcon from '../../assets/icons/people.svg';
import ArrowIcon from '../../assets/icons/arrow.svg';
import { Box } from '@material-ui/core';
import { IMap, IBuilding, IMonster, INpc } from '../../interfaces/Models';
import LocationMarker from './LocationMarker'

const personIcon = new L.icon({
    iconUrl: PersonIcon,
    iconRetinaUrl: PersonIcon,
    iconAnchor: [17.5, 25],
    popupAnchor: [0, -35],
    iconSize: [45, 45]
})

const peopleIcon = new L.icon({
    iconUrl: PeopleIcon,
    iconRetinaUrl: PeopleIcon,
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

const arrowIcon = new L.icon({
    iconUrl: ArrowIcon,
    iconRetinaUrl: ArrowIcon,
    iconAnchor: [17.5, 25],
    popupAnchor: [0, -35],
    iconSize: [45, 45]
})

export default function LocationMap({ map, iconName, data }: { map: IMap, iconName: string, data?: INpc[] | IMonster[] }) {
    const [bounds, setBounds] = useState<number[][] | null>(null)
    const [icon, setIcon] = useState([buildingIcon]);

    const style = { height: '80vh', width: '75vw' }

    function findHHandWW(this: any, ev: Event) {
        setBounds([[0, 0], [this.height, this.width]]);
        return true;
    }

    useEffect(() => {
        let tempIcon: L.icon[] = []
        switch (iconName) {
            case 'buildings':
                tempIcon = [buildingIcon];
                break;
            case 'npcs':
                tempIcon = [personIcon, peopleIcon];
                break;
            default:
                tempIcon = [arrowIcon]
        }
        setIcon(() => tempIcon)
    }, [iconName]);

    const showImage = (imgPath: string) => {
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
                {data ? data.forEach((instance, index) => {
                    if (instance.building?.maps) {
                        const location = instance.building?.maps[0]
                        console.log(`Location: [${location.coords[0]},${location.coords[1]}], Npc: `, instance)
                        return <LocationMarker key={index} position={[bounds[1][0] - location.coords[0], location.coords[1]]} entities={[instance]} icon={icon} />
                    } else {
                        return null
                    }
                })
                    : map.buildings?.map(({ coords, building }, index) => {
                        switch (iconName) {
                            case 'buildings':
                                return coords ? (
                                    <LocationMarker key={index} position={[bounds[1][0] - coords[0], coords[1]]} entities={[building]} icon={icon} />
                                ) : null
                            case 'npcs':
                                return coords && building.npcs.length > 0 ? (
                                    <LocationMarker key={index} position={[bounds[1][0] - coords[0], coords[1]]} entities={building.npcs} icon={icon} />
                                ) : null
                            case 'monsters':
                                return coords && building.monsters.length > 0 ? (
                                    <LocationMarker key={index} position={[bounds[1][0] - coords[0], coords[1]]} entities={building.monsters} icon={icon} />
                                ) : null
                        }
                    })}

                <ImageOverlay
                    bounds={bounds}
                    url={`https://ddimagecollection.s3-eu-west-1.amazonaws.com/maps/${map.image_url}`}
                />
            </Map>
        </Box>
    ) : null
}