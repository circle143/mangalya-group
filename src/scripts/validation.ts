import * as yup from "yup";

export const formSchema = yup.object({
	name: yup.string().min(3).required(),
	email: yup.string().email().required(),
	phone: yup
		.string()
		.matches(/^(?:\+91[\s-]?|91[\s-]?)?[6-9]\d{9}$/)
		.required(),
});
