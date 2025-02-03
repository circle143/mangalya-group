import EmblaCarousel, { type EmblaOptionsType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";

document.addEventListener("astro:page-load", () => {
	const OPTIONS: EmblaOptionsType = { loop: true };

	var emblaNodes = [].slice.call(document.querySelectorAll(".embla"));

	emblaNodes.map(function (emblaNode: HTMLElement) {
		let viewportNode = <HTMLElement>(
			emblaNode.querySelector(".embla-viewport")
		);

		if (viewportNode) {
			let api = EmblaCarousel(viewportNode, OPTIONS, [Autoplay()]);
			let left = emblaNode.querySelector(".left");
			let right = emblaNode.querySelector(".right");

			if (left) {
				left.addEventListener("click", () => {
					api.scrollPrev();
				});
			}

			if (right) {
				right.addEventListener("click", () => {
					api.scrollNext();
				});
			}
		}
	});
});
