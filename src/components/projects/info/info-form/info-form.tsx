import React, { useRef } from "react";
import styles from "./info-form.module.scss";
import { Icon } from "astro-icon/components";

export enum Title {
	enquire = "Enquire Now",
	download = "Download",
	contact = "Contact Us",
}

export enum Project {
	mangalya = "mangalya-group",
	novena = "novena-greens",
	anant = "anant-horizon",
	ophira = "ophira",
}

interface InfoFormProps {
	project: Project;
	title: Title;
	modal?: boolean;
}

const InfoForm = ({ project, title, modal = false }: InfoFormProps) => {
	const buttonRef = useRef<HTMLButtonElement | null>(null);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		// on success
		closeModalIfOpen();
	};

	const closeModalIfOpen = () => {
		buttonRef.current?.click();
	};

	return (
		<>
			<button
				style={{ display: "none" }}
				ref={buttonRef}
				className="modal-close-trigger"
			></button>

			<div className={styles.form}>
				<div className={styles.header}>
					<h3>{title}</h3>

					{modal && (
						<button
							className="modal-close-trigger"
							data-type="link"
							data-variant="normal"
							title="Close"
						>
							<img
								width={24}
								height={24}
								src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzODQgNTEyIj48IS0tIUZvbnQgQXdlc29tZSBGcmVlIDYuNy4yIGJ5IEBmb250YXdlc29tZSAtIGh0dHBzOi8vZm9udGF3ZXNvbWUuY29tIExpY2Vuc2UgLSBodHRwczovL2ZvbnRhd2Vzb21lLmNvbS9saWNlbnNlL2ZyZWUgQ29weXJpZ2h0IDIwMjUgRm9udGljb25zLCBJbmMuLS0+PHBhdGggZD0iTTM0Mi42IDE1MC42YzEyLjUtMTIuNSAxMi41LTMyLjggMC00NS4zcy0zMi44LTEyLjUtNDUuMyAwTDE5MiAyMTAuNyA4Ni42IDEwNS40Yy0xMi41LTEyLjUtMzIuOC0xMi41LTQ1LjMgMHMtMTIuNSAzMi44IDAgNDUuM0wxNDYuNyAyNTYgNDEuNCAzNjEuNGMtMTIuNSAxMi41LTEyLjUgMzIuOCAwIDQ1LjNzMzIuOCAxMi41IDQ1LjMgMEwxOTIgMzAxLjMgMjk3LjQgNDA2LjZjMTIuNSAxMi41IDMyLjggMTIuNSA0NS4zIDBzMTIuNS0zMi44IDAtNDUuM0wyMzcuMyAyNTYgMzQyLjYgMTUwLjZ6Ii8+PC9zdmc+"
							/>
						</button>
					)}
				</div>

				<form onSubmit={handleSubmit}>
					<input type="text" placeholder="Name" />

					<input type="tel" placeholder="Ph. No." />

					<input type="email" placeholder="Email ID" />

					<div>
						<button
							data-type="button"
							data-variant="primary"
							type="submit"
						>
							{title === Title.download ? "Download" : "Submit"}
						</button>
					</div>
				</form>
			</div>
		</>
	);
};

export default InfoForm;
