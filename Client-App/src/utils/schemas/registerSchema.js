import * as yup from "yup";
import { passwordRules } from "../passwordRegex";

const registerSchema = yup.object().shape({
    email: yup
        .string()
        .email("Please enter a valid email")
        .required("Required"),
    username: yup
        .string()
        .min(3, "Username must be at least 3 characters long")
        .required("Required"),
    password: yup
        .string()
        .min(5)
        .matches(passwordRules, { message: "Please create a stronger password" })
        .required("Required"),
    rePass: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match")
        .required("Required"),
});

export default registerSchema;