import styles from "./Map.module.css";
import { useNavigate } from "react-router-dom";
import {
	MapContainer,
	TileLayer,
	Marker,
	Popup,
	useMap,
	useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/CitiesContext";
// import City from "./City";
import { useGeolocation } from "../Hooks/useGeoloacation";
import Button from "./Button";
import { useUrlPosition } from "../Hooks/useUrlPosition";
function Map() {
	// const navigate = useNavigate();
	const { cities } = useCities();
	const {
		isLoading: isLoadingPosition,
		position: geolocationPosition,
		getPosition,
	} = useGeolocation();
	const [mapPosition, setMapPosition] = useState([40, 0]);
	const [mapLat, mapLng] = useUrlPosition();

	useEffect(
		function () {
			if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
		},
		[mapLat, mapLng]
	);

	useEffect(
		function () {
			if (geolocationPosition)
				setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
		},
		[geolocationPosition]
	);
	return (
		<div className={styles.mapContainer}>
			{!geolocationPosition && (
				<Button type="position" onClick={getPosition}>
					{isLoadingPosition ? "Loading ..." : "use your position"}
				</Button>
			)}
			<MapContainer
				center={mapPosition}
				// center={[mapLat , mapLng]}
				zoom={6}
				scrollWheelZoom={true}
				className={styles.map}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
				/>
				{cities.map((city) => (
					<Marker
						position={[city.position.lat, city.position.lng]}
						key={city.id}
					>
						<Popup>
							<span>{city.emoji}</span>
							<span>{city.cityName}</span>
						</Popup>
					</Marker>
				))}
				{/*calling changeView comp to focus on the selected City */}
				<ChangeView position={mapPosition} />
				<DetectClick />
			</MapContainer>
		</div>
	);
}
function ChangeView({ position }) {
	const map = useMap();
	map.setView(position);
	return null;
}
function DetectClick() {
	const navigate = useNavigate();
	useMapEvents({
		click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
	});
}
export default Map;
