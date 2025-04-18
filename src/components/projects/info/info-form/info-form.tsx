import React, { useRef, useState } from "react";
import styles from "./info-form.module.scss";
import Loader from "../../../Loader/Loader";
import { formSchema } from "../../../../scripts/validation";

export enum Title {
	enquire = "Enquire Now",
	download = "Download",
	contact = "Contact Us",
}

export enum Project {
	mangalya = "mangalya-group", // for nav form
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
	const [error, setError] = useState<string | null>(null);
	const [message, setMessage] = useState<string | null>(null);
	const [submitting, setSubmitting] = useState<boolean>(false);

	const [formInput, setFormInput] = useState({
		name: "",
		phone: "",
		email: "",
	});

	const validate = () => {
		try {
			formSchema.validateSync(formInput, {
				abortEarly: false,
			});
			return true;
		} catch (err) {
			return false;
		}
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (submitting) return;

		if (!validate()) {
			// invalid form fields
			setError("Invalid form details");
			return;
		}

		setSubmitting(true);
		setError(null);
		setMessage(null);
		const location = getTitle();
		const reqBody = {
			location,
			...formInput,
		};

		// send req to backend
		fetch("url", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(reqBody),
		})
			.then((res) => res.json())
			.then((res) => {
				// if success
				handleDownload();
				closeModalIfOpen();
				setMessage("Successfully submitted your details.");
				setFormInput({
					name: "",
					phone: "",
					email: "",
				});
			})
			.catch((err) => {
				// show toast
				setError("Error submitting form details");
			})
			.finally(() => setSubmitting(false));
	};

	const getTitle = () => {
		if (title == Title.contact) {
			return "Footer Contact Us";
		}

		if (title == Title.download) {
			switch (project) {
				case Project.novena:
					return "Mangalya Novena Greens Download Brochure";
				case Project.anant:
					return "Mangalya Anant Download Brochure";
				case Project.ophira:
					return "Mangalya Ophira Download Brochure";
				default:
					return "Download Brochure";
			}
		}

		switch (project) {
			case Project.novena:
				return "Enquire Now Mangalya Novena";
			case Project.anant:
				return "Enquire Now Mangalya Anant";
			case Project.ophira:
				return "Enquire Now Mangalya Ophira";
			default:
				return "Enquire Now Nav Bar";
		}
	};

	const handleDownload = () => {
		if (title != Title.download) return;
		const novena = {
			name: "Novena-Greens-Brochure.pdf",
			link: "/brochure/novena_brochure.pdf",
		};

		const anant = {
			name: "Anant-Horizon-Brochure.pdf",
			link: "/brochure/anant_brochure.pdf",
		};

		const ophira = {
			name: "Ophira-Brochure.pdf",
			link: "/brochure/ophira_brochure.pdf",
		};

		let name;
		let link;

		switch (project) {
			case Project.novena:
				name = novena.name;
				link = novena.link;
				break;
			case Project.anant:
				name = anant.name;
				link = anant.link;
				break;
			case Project.ophira:
				name = ophira.name;
				link = ophira.link;
				break;
			default:
				return;
		}

		console.log("downloading");
		const el = document.createElement("a");
		el.href = link;
		el.download = name;
		document.body.appendChild(el);
		el.click();
		document.body.removeChild(el);
	};

	const closeModalIfOpen = () => {
		buttonRef.current?.click();
	};

	const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const key = e.target.name;
		const value = e.target.value;

		setFormInput((prev) => {
			return { ...prev, [key]: value };
		});
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
							disabled={submitting}
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
					<input
						disabled={submitting}
						type="text"
						placeholder="Name"
						name="name"
						value={formInput.name}
						onChange={onInputChange}
					/>

					<input
						disabled={submitting}
						type="tel"
						placeholder="Ph. No."
						name="phone"
						value={formInput.phone}
						onChange={onInputChange}
					/>

					<input
						disabled={submitting}
						type="email"
						placeholder="Email ID"
						name="email"
						value={formInput.email}
						onChange={onInputChange}
					/>

					{error && <p className="error">{error}</p>}
					{message && <p className="success">{message}</p>}

					<div>
						<button
							disabled={submitting}
							data-type="button"
							data-variant="primary"
							type="submit"
							data-submitting={submitting}
						>
							{submitting ? (
								<Loader variant="small" />
							) : title === Title.download ? (
								"Download"
							) : (
								"Submit"
							)}
						</button>
					</div>
				</form>
			</div>
		</>
	);
};

export default InfoForm;
