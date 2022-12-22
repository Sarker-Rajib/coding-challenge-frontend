import 'leaflet/dist/leaflet.css';
import style from '../../styles/Home.module.css';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import { useSelector } from 'react-redux';


const Map = () => {
    const location = useSelector(state => state.locator.geo)
    const lat = location.lat;
    const lng = location.lng;

    return (
        <>
            <MapContainer className={style.map} center={[lat, lng]} zoom={14} scrollWheelZoom={true} animate={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[lat, lng]}>
                    <Popup>
                        <p>{lat}</p>
                        <p>{lng}</p>
                    </Popup>
                </Marker>
            </MapContainer>
        </>
    );
};

export default Map;