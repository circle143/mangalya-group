import * as yup from "yup";
import { parsePhoneNumberWithError } from "libphonenumber-js";

export const url = "https://api-wo48.onrender.com/mangalya/form-submit";

export const formSchema = yup.object({
	name: yup.string().min(3).required(),
	email: yup.string().email().required(),
	phone: yup
		.string()
		.matches(/^(?:\+91[\s-]?|91[\s-]?)?[6-9]\d{9}$/)
		.required(),
});

export function toE164(phone: string) {
	try {
		const phoneNumber = parsePhoneNumberWithError(phone, "IN");
		if (!phoneNumber.isValid()) {
			throw new Error("Invalid phone number");
		}
		return phoneNumber.number; // Returns in E.164 format
	} catch (err) {
		console.error("Error:", err);
		return null;
	}
}
