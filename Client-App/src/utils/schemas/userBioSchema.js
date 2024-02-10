import * as yup from "yup";

const userBioSchema = yup.object().shape({
    bio: yup
        .string()
        .required("Required. Bio must be between 2 and 100 characters.")
        .min(2)
        .max(100)
});

export default userBioSchema;