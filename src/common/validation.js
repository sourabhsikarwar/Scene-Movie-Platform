const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$%#^&*])(?=.*[0-9]).{8,}$/;
const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/;
const phoneRegex = /^\d{7,13}$/;


const validate = {
    displayName: (value) => {
    return  (value.trim().length<6)? { displayName: true, displayNameError: "Full Name should be 6 characters long" }
           : { displayName: false, displayNameError: false}
  },
  email: (value) => {
    if(!value.trim()) return {email: true, emailError: "Email is required"}
    return emailRegex.test(value)
      ? { email: false, emailError: false }
      : { email: true, emailError: "Invalid email address" }

  },

  phoneNumber: (value)=>{
    if(!value.trim()) return {phoneNumber: true, phoneNumberError: "Contact No. is required"}
    return phoneRegex.test(value)
      ? { phoneNumber: false, phoneNumberError: false }
      : { phoneNumber: true, phoneNumberError: "Invalid phone number" }

  },

  dateOfBirth: (value)=>{
    return (!value.trim())? {dateOfBirth: true, dateOfBirthError: "Date of Birth is required"} : {dateOfBirth: false, dateOfBirthError: false}
  },

  password: (value) => {
    if(!value.trim()) return {password: true, passwordError: "Password is required"}
   return passwordRegex.test(value)
      ? { password: false, passwordError: false }
      : {
          password: true,
          passwordError:
            "Minimum 6 characters, 1 uppercase, 1 lowercase, 1 symbol (@$%#^&*), 1 number (0-9).",
        };
  },

  confirmPassword: (value, password)=>{
    return (value !== password)? 
            {confirmPassword: true, confirmPasswordError: "Passwords do not match"}:
            {confirmPassword: false, confirmPasswordError: false}
  },

  initialVal : {
    displayName: true,
    email: true,
    phoneNumber: true,
    dateOfBirth: true,
    password: true,
    confirmPassword: true,
  }
};

export default validate;
