export const validatePassword = (password) => {
    const lengthRegex = /^.{8,}$/;
    const lowerCaseRegex = /[a-z]/;
    const upperCaseRegex = /[A-Z]/;
    const numberRegex = /[0-9]/;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

    const isValidLength = lengthRegex.test(password);
    const hasLowerCase = lowerCaseRegex.test(password);
    const hasUpperCase = upperCaseRegex.test(password);
    const hasNumber = numberRegex.test(password);
    const hasSpecialChar = specialCharRegex.test(password);

    return isValidLength && hasLowerCase && hasUpperCase && hasNumber && hasSpecialChar;
};

