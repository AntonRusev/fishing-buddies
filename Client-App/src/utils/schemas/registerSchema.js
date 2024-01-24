import * as yup from "yup";
import { passwordRules, emailRules } from "../regex";

const registerSchema = yup.object().shape({
    email: yup
        .string()
        .matches(emailRules, { message: "Please enter a valid email" })
        // .email("Please enter a valid email")
        .required("Required"),
    username: yup
        .string()
        .min(3, "Username must be at least 3 characters long")
        .required("Required"),
    password: yup
        .string()
        .min(5)
        .matches(passwordRules, { message: "Password must contain a lower case letter, a upper case letter, a numeric character and a special character" })
        .required("Required"),
    rePass: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match")
        .required("Required"),
});

export default registerSchema;