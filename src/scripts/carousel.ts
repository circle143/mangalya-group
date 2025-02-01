import EmblaCarousel, { type EmblaOptionsType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";

document.addEventListener("astro:page-load", () => {
	const OPTIONS: EmblaOptionsType = { loop: true };

	const emblaNode = <HTMLElement>document.querySelector("#embla");
	const viewportNode = <HTMLElement>(
		emblaNode.querySelector("#embla__viewport")
	);

	EmblaCarousel(viewportNode, OPTIONS, [Autoplay()]);
});
