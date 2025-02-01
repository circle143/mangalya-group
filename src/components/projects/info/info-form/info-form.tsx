import React from "react";
import styles from "./info-form.module.scss";

interface InfoFormProps {
	project: string;
	download: boolean;
}

const InfoForm = ({ project, download }: InfoFormProps) => {
	return (
		<div className={styles.form}>
			<h3>{download ? "Download" : "Enquire Now"}</h3>

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
						{download ? "Download" : "Submit"}
					</button>
				</div>
			</form>
		</div>
	);
};

export default InfoForm;
