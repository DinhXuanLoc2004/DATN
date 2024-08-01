export function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export function validatePassword(password: string): boolean {
    const minLength = /.{8,}/;
    const hasNumber = /[0-9]/;
    const hasUpperCase = /[A-Z]/;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

    return minLength.test(password) &&
        hasNumber.test(password) &&
        hasUpperCase.test(password) &&
        hasSpecialChar.test(password);
}

export function validatePhoneNumber(phoneNumber: string): boolean {
    const phoneRegex = /^(03|08|09|07|05)\d{8}$/;
    return phoneRegex.test(phoneNumber);
}

export const Success = 'Success'

export const handleTextInput = (key: 'email' | 'password' | 'phone', value: string): string => {
    let messageError
    if (!value) {
        messageError = `Please enter ${key} information!`
        return messageError
    }
    if (key === 'email') {
        if (validateEmail(value)) {
            return Success
        } else {
            messageError = `Invalid ${key}!`
            return messageError
        }
    }
    if (key === 'password') {
        if (validatePassword(value)) {
            return Success
        } else {
            messageError = `Password must have at least 8 characters, at least 1 number, 1 uppercase letter and 1 special character`
            return messageError
        }
    }
    if (key === 'phone') {
        if (validatePhoneNumber(value)) {
            return Success
        }else {
            messageError = `Invalid ${key}`
            return messageError
        }
    }

    return '';
}