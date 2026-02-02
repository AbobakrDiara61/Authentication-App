import jwt from 'jsonwebtoken'

const createToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '10d' });
}

const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET);
}

const setCookie = (res, cookieValue, fieldName) => {
    res.cookie(fieldName, cookieValue, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 3 * 24 * 60 * 60 * 1000
    })
}

const tokenUtils = {
    createToken,
    createRefreshToken,
    setCookie
}

export default tokenUtils