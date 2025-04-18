import React, { useState } from "react";
import styles from "./form.module.scss";
import Loader from "../../Loader/Loader";
import { formSchema } from "../../../scripts/validation";

const Form = () => {
	const [error, setError] = useState<string | null>(null);
	const [submitting, setSubmitting] = useState<boolean>(false);
	const [message, setMessage] = useState<string | null>(null);

	const [formInput, setFormInput] = useState({
		name: "",
		phone: "",
		email: "",
		more: "",
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
		const location = "Home Page form";
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
				setMessage("Successfully submitted your details.");
				setFormInput({
					name: "",
					phone: "",
					email: "",
					more: "",
				});
			})
			.catch((err) => {
				// show toast
				setError("Error submitting form details");
			})
			.finally(() => setSubmitting(false));
	};

	const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const key = e.target.name;
		const value = e.target.value;

		setFormInput((prev) => {
			return { ...prev, [key]: value };
		});
	};

	return (
		<div className={styles.form}>
			<div className={`container ${styles.container}`}>
				<h3>Got some specific idea? We'd love to bring it to life</h3>

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

					<input
						disabled={submitting}
						type="text"
						placeholder="What do you have in mind?"
						className={styles.more}
						name="more"
						value={formInput.more}
						onChange={onInputChange}
					/>

					<button
						disabled={submitting}
						data-type="button"
						data-variant="primary"
						type="submit"
					>
						{submitting ? <Loader variant="small" /> : "Submit"}
					</button>
				</form>

				{error && <p className="error">{error}</p>}
				{message && <p className="success">{message}</p>}
			</div>
		</div>
	);
};

export default Form;
