// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
// Importing date picker library
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import styles from "./Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import { useUrlPosition } from "../Hooks/useUrlPosition";
import Message from "./Message";
import Spinner from "./Spinner";
import { useCities } from "../contexts/CitiesContext";
import { useNavigate } from "react-router-dom";

export function convertToEmoji(countryCode) {
	const codePoints = countryCode
		.toUpperCase()
		.split("")
		.map((char) => 127397 + char.charCodeAt());
	return String.fromCodePoint(...codePoints);
}

function Form() {
	const navigate = useNavigate();
	const [cityName, setCityName] = useState("");
	const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
	const [country, setCountry] = useState("");
	const [date, setDate] = useState(new Date());
	const [notes, setNotes] = useState("");
	const [lat, lng] = useUrlPosition();
	const [emoji, setEmoji] = useState();
	const [geoCodingError, setGeoCodingError] = useState("");
	const { createCity, isLoading } = useCities();
	const URL_BASE = "https://api.bigdatacloud.net/data/reverse-geocode-client";

	useEffect(
		function () {
			if (!lat && !lng) return;
			async function fetchCityData() {
				try {
					setIsLoadingGeocoding(true);
					setGeoCodingError("");
					const res = await fetch(
						`${URL_BASE}?latitude=${lat}&longitude=${lng}`
					);
					const data = await res.json();
					if (!data.countryName)
						throw new Error(
							"That doesn't seems to be a city, click somewhere else!"
						);

					setCityName(data.cityName || data.locality || "");
					setCountry(data.countryName);
					setEmoji(convertToEmoji(data.countryCode));
				} catch (err) {
					setGeoCodingError(err.message);
				} finally {
					setIsLoadingGeocoding(false);
				}
			}
			fetchCityData();
		},
		[lat, lng]
	);
	async function handelSubmit(e) {
		e.preventDefault();
		if (!cityName || !date) return;
		const newCity = {
			cityName,
			country,
			emoji,
			date,
			notes,
			position: { lat, lng },
		};
		// console.log(newCity);
		await createCity(newCity);
		navigate("/app");
	}

	if (isLoadingGeocoding) return <Spinner />;
	if (!lat && !lng)
		return <Message message="Start by cliking somewhere on the map" />;
	if (geoCodingError) return <Message message={geoCodingError} />;
	return (
		<form
			className={`${styles.form} ${isLoading ? styles.loading : ""}`}
			onSubmit={handelSubmit}
		>
			<div className={styles.row}>
				<label htmlFor="cityName">City name</label>
				<input
					id="cityName"
					onChange={(e) => setCityName(e.target.value)}
					value={cityName}
				/>
				<span className={styles.flag}>{emoji}</span>
			</div>

			<div className={styles.row}>
				<label htmlFor="date">When did you go to {cityName}?</label>
				<DatePicker
					id="date"
					selected={date}
					onChange={(date) => setDate(date)}
					dateFormat="dd/MM/yyyy"
				/>
			</div>

			<div className={styles.row}>
				<label htmlFor="notes">Notes about your trip to {cityName}</label>
				<textarea
					id="notes"
					onChange={(e) => setNotes(e.target.value)}
					value={notes}
				/>
			</div>

			<div className={styles.buttons}>
				<Button type="primary">Add</Button>
				<BackButton />
			</div>
		</form>
	);
}

export default Form;
