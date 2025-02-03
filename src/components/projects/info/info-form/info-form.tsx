import React from "react";
import styles from "./info-form.module.scss";

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
}

const InfoForm = ({ project, title }: InfoFormProps) => {
	return (
		<div className={styles.form}>
			<h3>{title}</h3>

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
						{title === Title.download ? "Download" : "Submit"}
					</button>
				</div>
			</form>
		</div>
	);
};

export default InfoForm;
