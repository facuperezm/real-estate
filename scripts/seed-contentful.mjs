/**
 * Contentful Seed Script
 *
 * This script populates your Contentful space with fake property data.
 *
 * Setup:
 * 1. Install the management SDK: pnpm add -D contentful-management
 * 2. Get your Management Token from: https://app.contentful.com/account/profile/cma_tokens
 * 3. Run: CONTENTFUL_MANAGEMENT_TOKEN=your_token node scripts/seed-contentful.mjs
 */

import contentfulManagement from "contentful-management"

// Configuration
const SPACE_ID = process.env.CONTENTFUL_SPACE_ID
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN
const ENVIRONMENT = "master"
const NUM_PROPERTIES = 30 // Number of properties to create

// Fake data generators
const propertyTypes = ["Casa", "Departamento", "Terreno", "Local", "Oficina", "Penthouse", "Villa", "Loft"]

// Locations around the world with coordinates
const locations = [
	// USA
	{ city: "Manhattan", country: "Nueva York", lat: 40.7831, lon: -73.9712 },
	{ city: "Brooklyn", country: "Nueva York", lat: 40.6782, lon: -73.9442 },
	{ city: "Miami Beach", country: "Florida", lat: 25.7907, lon: -80.1300 },
	{ city: "Beverly Hills", country: "California", lat: 34.0736, lon: -118.4004 },
	{ city: "San Francisco", country: "California", lat: 37.7749, lon: -122.4194 },
	// Europe
	{ city: "Le Marais", country: "Paris", lat: 48.8566, lon: 2.3522 },
	{ city: "Notting Hill", country: "Londres", lat: 51.5154, lon: -0.2050 },
	{ city: "Chelsea", country: "Londres", lat: 51.4875, lon: -0.1687 },
	{ city: "Eixample", country: "Barcelona", lat: 41.3918, lon: 2.1640 },
	{ city: "Trastevere", country: "Roma", lat: 41.8819, lon: 12.4706 },
	{ city: "Kreuzberg", country: "Berlin", lat: 52.4934, lon: 13.4234 },
	{ city: "Jordaan", country: "Amsterdam", lat: 52.3738, lon: 4.8820 },
	// Latin America
	{ city: "Palermo", country: "Buenos Aires", lat: -34.5880, lon: -58.4307 },
	{ city: "Recoleta", country: "Buenos Aires", lat: -34.5875, lon: -58.3935 },
	{ city: "Ipanema", country: "Rio de Janeiro", lat: -22.9838, lon: -43.1985 },
	{ city: "Leblon", country: "Rio de Janeiro", lat: -22.9847, lon: -43.2240 },
	{ city: "Polanco", country: "Ciudad de Mexico", lat: 19.4326, lon: -99.1918 },
	{ city: "Condesa", country: "Ciudad de Mexico", lat: 19.4111, lon: -99.1744 },
	{ city: "Miraflores", country: "Lima", lat: -12.1211, lon: -77.0300 },
	{ city: "Providencia", country: "Santiago", lat: -33.4280, lon: -70.6100 },
	// Asia & Oceania
	{ city: "Shibuya", country: "Tokio", lat: 35.6580, lon: 139.7016 },
	{ city: "Central", country: "Hong Kong", lat: 22.2800, lon: 114.1588 },
	{ city: "Orchard", country: "Singapur", lat: 1.3048, lon: 103.8318 },
	{ city: "Bondi Beach", country: "Sydney", lat: -33.8915, lon: 151.2767 },
	{ city: "Surry Hills", country: "Sydney", lat: -33.8830, lon: 151.2110 },
	// Middle East
	{ city: "Dubai Marina", country: "Dubai", lat: 25.0805, lon: 55.1403 },
	{ city: "Palm Jumeirah", country: "Dubai", lat: 25.1124, lon: 55.1390 },
	{ city: "Tel Aviv Beach", country: "Israel", lat: 32.0853, lon: 34.7818 },
]

const descriptions = [
	"Stunning property with breathtaking views and modern amenities. Perfect for those seeking luxury living.",
	"Beautifully renovated space in prime location. Walking distance to restaurants, shops, and public transit.",
	"Unique opportunity in sought-after neighborhood. Bright, spacious, and full of character.",
	"Contemporary design meets classic elegance. High ceilings, premium finishes throughout.",
	"Rare find in exclusive area. Private terrace, state-of-the-art kitchen, and designer touches.",
	"Sun-drenched residence with open floor plan. Ideal for entertaining or peaceful retreat.",
	"Sophisticated urban oasis with panoramic city views. Concierge service and world-class amenities.",
	"Charming property blending historic architecture with modern comfort. A true gem.",
	"Luxurious living space with floor-to-ceiling windows. Steps from cultural attractions.",
	"Impeccably maintained home in prestigious location. Smart home features and eco-friendly design.",
]

// More diverse real estate images
const propertyImages = [
	"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
	"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
	"https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
	"https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800",
	"https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800",
	"https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800",
	"https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800",
	"https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800",
	"https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?w=800",
	"https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800",
	"https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800",
	"https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800",
	"https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
	"https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800",
	"https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800",
	"https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800",
	"https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800",
	"https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800",
	"https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=800",
	"https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800",
]

function randomBetween(min, max) {
	return Math.random() * (max - min) + min
}

function randomInt(min, max) {
	return Math.floor(randomBetween(min, max + 1))
}

function randomItem(arr) {
	return arr[Math.floor(Math.random() * arr.length)]
}

function shuffleArray(arr) {
	return [...arr].sort(() => Math.random() - 0.5)
}

function generateProperty(index) {
	const type = randomItem(propertyTypes)
	const location = randomItem(locations)
	const rooms = type === "Terreno" ? 0 : randomInt(1, 6)
	const m2 = type === "Terreno" ? randomInt(200, 2000) : randomInt(50, 500)

	// Price logic based on location and type (premium cities get higher prices)
	const premiumCities = ["Manhattan", "Beverly Hills", "Chelsea", "Dubai Marina", "Palm Jumeirah", "Central", "Le Marais"]
	const isPremium = premiumCities.includes(location.city)

	let basePrice
	if (type === "Terreno") {
		basePrice = randomInt(100000, 800000)
	} else if (type === "Penthouse" || type === "Villa") {
		basePrice = randomInt(500000, 5000000)
	} else if (type === "Loft") {
		basePrice = randomInt(200000, 800000)
	} else {
		basePrice = randomInt(150000, 1500000)
	}

	// Premium locations get 2-3x price multiplier
	const price = Math.round((basePrice * (isPremium ? randomBetween(2, 3) : 1)) / 10000) * 10000

	// Add slight randomness to coordinates (within ~1km)
	const latOffset = randomBetween(-0.01, 0.01)
	const lonOffset = randomBetween(-0.01, 0.01)

	return {
		id: index + 200, // Start from 200 to avoid conflicts
		title: `${type} en ${location.city}, ${location.country}`,
		description: randomItem(descriptions),
		price,
		rooms,
		m2,
		localization: {
			lat: location.lat + latOffset,
			lon: location.lon + lonOffset,
		},
		// Each property gets 3-6 random images
		imageUrls: shuffleArray(propertyImages).slice(0, randomInt(3, 6)),
	}
}

async function uploadImageAsAsset(environment, imageUrl, title) {
	console.log(`  Uploading image: ${title}`)

	try {
		const asset = await environment.createAsset({
			fields: {
				title: { "en-US": title },
				file: {
					"en-US": {
						contentType: "image/jpeg",
						fileName: `${title.replace(/\s+/g, "-").toLowerCase()}.jpg`,
						upload: imageUrl,
					},
				},
			},
		})

		const processedAsset = await asset.processForAllLocales()
		const publishedAsset = await processedAsset.publish()

		return publishedAsset
	} catch (error) {
		console.error(`  Error uploading image: ${error.message}`)
		return null
	}
}

async function createProperty(environment, propertyData, existingAssets) {
	console.log(`Creating property: ${propertyData.title}`)

	// Upload images as assets (or reuse existing)
	const photoAssets = []
	for (let i = 0; i < propertyData.imageUrls.length; i++) {
		const imageUrl = propertyData.imageUrls[i]

		// Check if we already have this asset
		let asset = existingAssets.get(imageUrl)
		if (!asset) {
			asset = await uploadImageAsAsset(
				environment,
				imageUrl,
				`${propertyData.title} - Foto ${i + 1}`
			)
			if (asset) {
				existingAssets.set(imageUrl, asset)
			}
		}

		if (asset) {
			photoAssets.push({
				sys: {
					type: "Link",
					linkType: "Asset",
					id: asset.sys.id,
				},
			})
		}
	}

	// Create the property entry (matching your actual Contentful schema)
	const entry = await environment.createEntry("property", {
		fields: {
			id: { "en-US": propertyData.id },
			title: { "en-US": propertyData.title },
			description: { "en-US": propertyData.description },
			price: { "en-US": propertyData.price },
			rooms: { "en-US": propertyData.rooms },
			m2: { "en-US": propertyData.m2 },
			localization: { "en-US": propertyData.localization },
			photos: { "en-US": photoAssets },
		},
	})

	// Publish the entry
	await entry.publish()
	console.log(`  Published: ${propertyData.title}`)

	return entry
}

async function main() {
	if (!SPACE_ID || !MANAGEMENT_TOKEN) {
		console.error(`
Error: Missing environment variables

Please set:
  - CONTENTFUL_SPACE_ID (from your .env file)
  - CONTENTFUL_MANAGEMENT_TOKEN (from https://app.contentful.com/account/profile/cma_tokens)

Run with:
  CONTENTFUL_SPACE_ID=xxx CONTENTFUL_MANAGEMENT_TOKEN=xxx node scripts/seed-contentful.mjs
`)
		process.exit(1)
	}

	console.log("Connecting to Contentful...")

	const client = contentfulManagement.createClient({
		accessToken: MANAGEMENT_TOKEN,
	})

	const space = await client.getSpace(SPACE_ID)
	const environment = await space.getEnvironment(ENVIRONMENT)

	console.log(`Connected to space: ${space.name}`)
	console.log(`Generating ${NUM_PROPERTIES} properties...\n`)

	// Generate all property data
	const properties = Array.from({ length: NUM_PROPERTIES }, (_, i) => generateProperty(i))

	// Cache for uploaded assets (to avoid duplicates)
	const existingAssets = new Map()

	// Create properties one by one (to avoid rate limits)
	for (const property of properties) {
		try {
			await createProperty(environment, property, existingAssets)
			// Small delay to avoid rate limiting
			await new Promise(resolve => setTimeout(resolve, 500))
		} catch (error) {
			console.error(`Error creating property ${property.title}:`, error.message)
		}
	}

	console.log(`\nDone! Created ${NUM_PROPERTIES} properties.`)
}

main().catch(console.error)
