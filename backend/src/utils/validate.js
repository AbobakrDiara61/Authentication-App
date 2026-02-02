import validator from 'validator'

const validate = (user) => {
    const { name, email, password } = user;
    if(!name || !email || !password) 
        throw new Error("All fields are required");

    if(!validator.isEmail(email)) 
        throw new Error("Invalid email address");

    if(!validator.isStrongPassword(password))
        throw new Error("Password is not strong enough");
}

export default validate;
