import React from "react";
import styles from "./form.module.scss";

const Form = () => {
	return (
		<div className={styles.form}>
			<div className={`container ${styles.container}`}>
				<h3>Got some specific idea? We'd love to bring it to life</h3>

				<form>
					<input type="text" placeholder="Name" />

					<input type="tel" placeholder="Ph. No." />

					<input type="email" placeholder="Email ID" />

					<input
						type="text"
						placeholder="What do you have in mind?"
						className={styles.more}
					/>

					<button
						data-type="button"
						data-variant="primary"
						type="submit"
					>
						Submit
					</button>
				</form>
			</div>
		</div>
	);
};

export default Form;
