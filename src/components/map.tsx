import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api"

interface Location {
	lat: number
	lon: number
}

interface MapProps {
	location: Location | undefined
	zoom?: number
	height?: string
}

const DEFAULT_LOCATION = {
	lat: -25.618745,
	lng: -54.57684,
}

const DEFAULT_CONTAINER_STYLE = {
	width: "100%",
	height: "400px",
	borderRadius: "12px",
}

export default function Map({ location, zoom = 14, height = "400px" }: MapProps) {
	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: import.meta.env.PUBLIC_GOOGLE_MAPS_API_KEY,
	})

	if (!isLoaded) {
		return (
			<div
				className="flex animate-skeleton items-center justify-center rounded-xl bg-airbnb-gray-100"
				style={{ height }}
			>
				<div className="flex flex-col items-center gap-3">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="1.5"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="size-8 text-airbnb-gray-300"
					>
						<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
						<circle cx="12" cy="10" r="3" />
					</svg>
					<span className="text-sm text-airbnb-gray-300">Cargando mapa...</span>
				</div>
			</div>
		)
	}

	if (loadError) {
		return (
			<div
				className="flex items-center justify-center rounded-xl border border-airbnb-gray-200 bg-airbnb-gray-50"
				style={{ height }}
			>
				<div className="flex flex-col items-center gap-3 px-4 text-center">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="1.5"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="size-8 text-airbnb-gray-300"
					>
						<circle cx="12" cy="12" r="10" />
						<path d="m15 9-6 6" />
						<path d="m9 9 6 6" />
					</svg>
					<p className="text-sm text-airbnb-gray-400">
						No se pudo cargar el mapa. Intenta nuevamente mas tarde.
					</p>
				</div>
			</div>
		)
	}

	const markerPosition =
		location?.lat && location?.lon
			? {
					lat: Number(location.lat.toFixed(6)),
					lng: Number(location.lon.toFixed(6)),
				}
			: DEFAULT_LOCATION

	const containerStyle = {
		...DEFAULT_CONTAINER_STYLE,
		height,
	}

	return (
		<div className="relative overflow-hidden rounded-xl">
			<GoogleMap
				zoom={zoom}
				center={markerPosition}
				mapContainerStyle={containerStyle}
				options={{
					zoomControl: true,
					streetViewControl: false,
					mapTypeControl: false,
					fullscreenControl: false,
					styles: [
						{
							featureType: "poi",
							elementType: "labels",
							stylers: [{ visibility: "off" }],
						},
					],
				}}
			>
				{location?.lat && location?.lon && (
					<Marker
						position={{
							lat: location.lat,
							lng: location.lon,
						}}
					/>
				)}
			</GoogleMap>
		</div>
	)
}
