import * as yup from "yup";

const eventSchema = yup.object().shape({
    title: yup
        .string()
        .required("The event title is required"),
    description: yup
        .string()
        .required("The event description is required"),
    category: yup
        .string()
        .oneOf(["flowing-freshwater", "calm-freshwater", "saltwater"], "Invalid Category Type")
        .required("The event category is required"),
    date: yup
        .string()
        .required('Date is required')
        .nullable(),
    region: yup
        .string()
        .required("The event region is required")
});

export default eventSchema;