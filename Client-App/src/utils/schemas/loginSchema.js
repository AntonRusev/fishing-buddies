import * as yup from "yup";
import { passwordRules } from "../passwordRegex";

const loginSchema = yup.object().shape({
    email: yup
        .string()
        .email("Please enter a valid email")
        .required("Required"),
    password: yup
        .string()
        .min(5)
        .matches(passwordRules, { message: "Please create a stronger password" })
        .required("Required")
});

export default loginSchema;