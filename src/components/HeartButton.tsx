import { useState } from "react"

interface HeartButtonProps {
	className?: string
	propertyId?: string
}

export default function HeartButton({ className = "", propertyId }: HeartButtonProps) {
	const [isFavorite, setIsFavorite] = useState(false)
	const [isAnimating, setIsAnimating] = useState(false)

	const handleClick = (e: React.MouseEvent) => {
		e.preventDefault()
		e.stopPropagation()

		setIsFavorite(!isFavorite)
		setIsAnimating(true)

		setTimeout(() => setIsAnimating(false), 300)
	}

	return (
		<button
			type="button"
			onClick={handleClick}
			className={`group/heart rounded-full p-2 transition-transform hover:scale-110 active:scale-95 ${className}`}
			aria-label={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
			data-property-id={propertyId}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 32 32"
				className={`size-6 transition-all duration-200 ${isAnimating ? "animate-heart-pop" : ""}`}
				aria-hidden="true"
			>
				<path
					d="M16 28c7-4.73 14-10 14-17a6.98 6.98 0 0 0-7-7c-1.8 0-3.58.68-4.95 2.05L16 8.1l-2.05-2.05a6.98 6.98 0 0 0-9.9 0A6.98 6.98 0 0 0 2 11c0 7 7 12.27 14 17z"
					className={`transition-all duration-200 ${
						isFavorite
							? "fill-coral stroke-coral"
							: "fill-black/50 stroke-white stroke-2 group-hover/heart:fill-black/30"
					}`}
				/>
			</svg>
		</button>
	)
}
