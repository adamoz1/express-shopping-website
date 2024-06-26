const Products = require('../models/productModel')
const asyncHandler = require('express-async-handler')

getProducts = asyncHandler(async (req, res) => {
    let products = await Products.find()
    res.status(200).json(products)
})

getProduct = asyncHandler(async (req, res) => {
    const productAvailable = await Products.findById(req.params.id)
    if (!productAvailable) {
        res.status(400)
        throw new Error('No Product Available')
    }
    res.status(200).json(productAvailable)
})

module.exports = { getProducts, getProduct }