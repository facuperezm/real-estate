import animations from "@midudev/tailwind-animations"

/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: "1.5rem",
			screens: {
				"2xl": "1760px",
			},
		},
		extend: {
			colors: {
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
				coral: {
					DEFAULT: "#FF385C",
					hover: "#E31C5F",
					light: "#FF5A5F",
				},
				airbnb: {
					gray: {
						50: "#F7F7F7",
						100: "#EBEBEB",
						200: "#DDDDDD",
						300: "#B0B0B0",
						400: "#717171",
						500: "#222222",
					},
				},
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			boxShadow: {
				"airbnb": "0 6px 16px rgba(0, 0, 0, 0.12)",
				"airbnb-hover": "0 6px 20px rgba(0, 0, 0, 0.2)",
				"airbnb-card": "0 1px 2px rgba(0, 0, 0, 0.08), 0 4px 12px rgba(0, 0, 0, 0.05)",
				"airbnb-header": "0 1px 0 rgba(0, 0, 0, 0.08)",
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
				"heart-pop": {
					"0%": { transform: "scale(1)" },
					"50%": { transform: "scale(1.3)" },
					"100%": { transform: "scale(1)" },
				},
				"skeleton-pulse": {
					"0%, 100%": { opacity: "1" },
					"50%": { opacity: "0.5" },
				},
				"fade-in": {
					from: { opacity: "0", transform: "translateY(10px)" },
					to: { opacity: "1", transform: "translateY(0)" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"heart-pop": "heart-pop 0.3s ease-in-out",
				"skeleton": "skeleton-pulse 2s ease-in-out infinite",
				"fade-in": "fade-in 0.3s ease-out forwards",
			},
		},
	},
	plugins: [animations],
}
