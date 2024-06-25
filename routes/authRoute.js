const router = require('express').Router()
const { userRegister, loginUser } = require('../controllers/authController')

router.post('/login', loginUser)

router.post('/register', userRegister)

module.exports = router