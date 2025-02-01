import React from "react";
import styles from "./info.module.scss";

interface InfoFormProps {
	project: string;
}

const InfoForm = ({ project }: InfoFormProps) => {
	return (
		<div className={styles.form}>
			<h3>Enquire Now</h3>

			<form>
				<input type="text" placeholder="Name" />

				<input type="tel" placeholder="Ph. No." />

				<input type="email" placeholder="Email ID" />

				<div>
					<button
						data-type="button"
						data-variant="primary"
						type="submit"
					>
						Submit
					</button>
				</div>
			</form>
		</div>
	);
};

export default InfoForm;
