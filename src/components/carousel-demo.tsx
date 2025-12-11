import { useState, useCallback, useEffect } from "react"
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
	type CarouselApi,
} from "@/components/ui/carousel"

interface CarouselDemoProps {
	photos: string[]
	showDots?: boolean
	aspectRatio?: "square" | "video"
}

export default function CarouselDemo({
	photos,
	showDots = true,
	aspectRatio = "square",
}: CarouselDemoProps) {
	const [api, setApi] = useState<CarouselApi>()
	const [current, setCurrent] = useState(0)

	useEffect(() => {
		if (!api) return

		setCurrent(api.selectedScrollSnap())
		api.on("select", () => {
			setCurrent(api.selectedScrollSnap())
		})
	}, [api])

	const scrollTo = useCallback(
		(index: number) => {
			api?.scrollTo(index)
		},
		[api]
	)

	const maxDots = 5
	const totalPhotos = photos.length

	const getDotIndices = () => {
		if (totalPhotos <= maxDots) {
			return photos.map((_, i) => i)
		}

		let start = Math.max(0, current - 2)
		const end = Math.min(totalPhotos, start + maxDots)

		if (end - start < maxDots) {
			start = Math.max(0, end - maxDots)
		}

		return Array.from({ length: end - start }, (_, i) => start + i)
	}

	const aspectClass = aspectRatio === "square" ? "aspect-square" : "aspect-video"

	return (
		<div className="group relative">
			<Carousel setApi={setApi} className="w-full">
				<CarouselContent>
					{photos.map((photo, idx) => (
						<CarouselItem key={photo}>
							<div className={`${aspectClass} overflow-hidden rounded-xl`}>
								<img
									src={photo}
									alt={`Foto ${idx + 1}`}
									className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
									loading={idx === 0 ? "eager" : "lazy"}
								/>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>

				{current > 0 && (
					<CarouselPrevious
						variant="secondary"
						className="absolute left-3 top-1/2 z-20 size-8 -translate-y-1/2 rounded-full border-0 bg-white/90 shadow-md hover:bg-white"
						size="icon"
					/>
				)}
				{current < totalPhotos - 1 && (
					<CarouselNext
						variant="secondary"
						className="absolute right-3 top-1/2 z-20 size-8 -translate-y-1/2 rounded-full border-0 bg-white/90 shadow-md hover:bg-white"
						size="icon"
					/>
				)}
			</Carousel>

			{showDots && totalPhotos > 1 && (
				<div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5">
					{getDotIndices().map((dotIndex) => (
						<button
							type="button"
							key={dotIndex}
							onClick={(e) => {
								e.preventDefault()
								e.stopPropagation()
								scrollTo(dotIndex)
							}}
							className={`rounded-full transition-all duration-200 ${
								dotIndex === current
									? "h-2 w-2 bg-white"
									: "h-1.5 w-1.5 bg-white/60 hover:bg-white/80"
							}`}
							aria-label={`Ir a foto ${dotIndex + 1}`}
						/>
					))}
				</div>
			)}
		</div>
	)
}
