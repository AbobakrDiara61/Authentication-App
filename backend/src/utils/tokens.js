import jwt from 'jsonwebtoken'

const createToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '10s' });
}

const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '3d' });
}

const setCookie = (res, cookieValue, fieldName, maxAge = 3 * 24 * 60 * 60 * 1000) => {
    res.cookie(fieldName, cookieValue, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        maxAge
    })
}

const tokenUtils = {
    createToken,
    createRefreshToken,
    setCookie
}

export default tokenUtils