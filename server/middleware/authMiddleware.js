const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }
    try {
        const token = req.headers.authorization.split(" ")[1]
        if (!token) {
            res.status(401).json({message: "не авторизован"})
        }
        const decodeToken = jwt.verify(token, process.env.SECKRET_KEY)
        req.user = decodeToken
        next()
    } catch (e) {
        res.status(401).json({message: "не авторизован"})
    }
}