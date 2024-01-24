// Minimum 6 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit, one special character.
export const passwordRules = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

// For instance: test@gmail.com
export const emailRules = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;