import * as yup from "yup";
import { passwordRules, emailRules } from "../regex";

const loginSchema = yup.object().shape({
    email: yup
        .string()
        .matches(emailRules, { message: "Please enter a valid email" })
        // .email("Please enter a valid email")
        .required("Required"),
    password: yup
        .string()
        .min(5)
        .matches(passwordRules, { message: "Password must contain a lower case letter, a upper case letter, a numeric character and a special character" })
        .required("Required")
});

export default loginSchema;