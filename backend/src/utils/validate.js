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

/**
 * Safely extract only required fields from request object
 * Prevents injection via unexpected fields
 * 
 * @param {Object} obj - Source object (req.body, req.query, etc.)
 * @param {string[]} allowedKeys - Whitelist of allowed field names
 * @returns {Object} New object with only allowed fields
 */

const pick = (obj, allowedKeys) => {
  if (!obj || typeof obj !== 'object') return {};
  
  return allowedKeys.reduce((acc, key) => {
    if (key in obj) {
      acc[key] = obj[key];
    }
    return acc;
  }, {});
};

const ensureStrings = (obj, stringFields) =>  {
  for (const field of stringFields) {
    if (field in obj) {
      const value = obj[field];
      if (typeof value !== 'string')
        throw new Error(`Invalid data type for field '${field}'. Expected a string.`);
      
      if (value.trim() === '')
        throw new Error(`Field '${field}' cannot be empty.`);
    }
  }
};

export {
    validate,
    pick,
    ensureStrings
};
