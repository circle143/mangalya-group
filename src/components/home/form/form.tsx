import React, { useState } from "react";
import styles from "./form.module.scss";
import Loader from "../../Loader/Loader";

const Form = () => {
	const [error, setError] = useState<string | null>(null);
	const [submitting, setSubmitting] = useState<boolean>(false);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (submitting) return;
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
					/>

					<input
						disabled={submitting}
						type="tel"
						placeholder="Ph. No."
					/>

					<input
						disabled={submitting}
						type="email"
						placeholder="Email ID"
					/>

					<input
						disabled={submitting}
						type="text"
						placeholder="What do you have in mind?"
						className={styles.more}
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
			</div>
		</div>
	);
};

export default Form;
