const { getProducts, getProduct} = require('../controllers/productController')
const router = require('express').Router()

router.get('/', getProducts)

router.get('/:id', getProduct)

module.exports = router