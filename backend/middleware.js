const { JWT_SECRET } = require("./config")
const jwt = require("jsonwebtoken")

// async function checkAuth(req, res, next) {
//     if (!req.headers.authorization) {
//         return res.status(401).json({
//             message: "You are not authorized"
//         })
//     }
//     const token = req.headers.authorization.split(" ")[1]
//     if (!token) {
//         return res.status(401).json({
//             message: "You are not authorized"
//         })
//     }
//     const decoded = jwt.verify(token, JWT_SECRET)
//     if (!decoded) {
//         return res.status(401).json({
//             message: "You are not authorized"
//         })
//     }
//     req.userId = decoded.userId
//     next()
// }

// module.exports = {
//     checkAuth
// }

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({message: "You are not authorized"})
    }

    const token = authHeader.split(' ')[1]

    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        req.userId = decoded.userId
        next()
    } catch (error) {
        return res.status(403).json({
            message: "You are not authorized"
        })
    }
}

module.exports = {
    authMiddleware
}