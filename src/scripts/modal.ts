interface ModalMap {
	[key: string]: HTMLDialogElement;
}

const MODAL = "dialog";
const MODAL_OPEN_TRIGGER = "modal-open-trigger";
const MODAL_ID_ATTRIBUTE = "data-modal-id";
const MODAL_CLOSE_TRIGGER = "modal-close-trigger";
const disclaimer = "modal-disclaimer";

function closeModal(modals: HTMLCollectionOf<HTMLDialogElement>) {
	for (let i = 0; i < modals.length; i++) {
		const modal = modals[i];
		modal.close();
	}
}

document.addEventListener("astro:page-load", () => {
	// get all modals
	const modals = document.getElementsByTagName(MODAL);

	// create map to store id -> modal
	const modalMap: ModalMap = {};
	for (let i = 0; i < modals.length; i++) {
		const modal = modals[i];
		const modalId = modal.id;

		if (modalId && modalId.trim().length > 0) {
			modalMap[modalId] = modal;

			if (modalId === "modal-disclaimer") {
				// show only for this session once
				let val = sessionStorage.getItem(disclaimer);

				if (!val) {
					modal.showModal();
				}
			}
		}
	}

	// get all modal trigger
	const triggers = document.getElementsByClassName(MODAL_OPEN_TRIGGER);
	for (let i = 0; i < triggers.length; i++) {
		const trigger = triggers[i];
		const triggerFor = trigger.getAttribute(MODAL_ID_ATTRIBUTE);

		if (triggerFor && triggerFor.trim().length > 0) {
			// add listner for modal open
			trigger.addEventListener("click", () => {
				const modal = modalMap[triggerFor];
				modal.showModal();
			});
		}
	}

	// get all modal close trigger
	const closeTriggers = document.getElementsByClassName(MODAL_CLOSE_TRIGGER);
	for (let i = 0; i < closeTriggers.length; i++) {
		const trigger = closeTriggers[i];
		const triggerId = trigger.id;

		trigger.addEventListener("click", () => {
			closeModal(modals);

			if (triggerId === "modal-disclaimer-close") {
				sessionStorage.setItem(disclaimer, Date.now().toString());
			}
		});
	}
});
