// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.
export const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;