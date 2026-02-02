import jwt from 'jsonwebtoken';

// verify or protectRoute or authentication middleware
const authentication = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if(!token) 
            return res.status(401).json({ message: "Unauthorized: No Token Provided" });
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error("Error In authentication middleware", error);
        return res.status(500).json({ message: error.message });
    }
}

export default authentication;