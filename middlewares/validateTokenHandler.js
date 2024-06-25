const jwt = require('jsonwebtoken')

const validateToken = (req, res, next) => {
    const authHeader = req.headers.Authorization || req.headers.authorization
    if (authHeader && authHeader.startsWith('Bearer')) {
        const token = authHeader.split(' ')[1]
        jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
            if (err) {
                res.status(401).json('Token is not Valid')
            }
            if (!err) {
                req.user = decoded
                next()
            }
        })
    }
    else {
        return res.status(401).json('You are not authenticated')
    }
}

const validateTokenAndAuth = (req, res, next) => {
    validateToken(req, res, () => {
        if (req.user._id == req.params.id || req.user.isAdmin) {
            next()
        } else {
            res.status(400).json('You do not have the permission')
        }
    })
}

module.exports = { validateToken, validateTokenAndAuth }