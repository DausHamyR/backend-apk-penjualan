const productRouter = require("express").Router()
const productController = require("../controllers/product.controller")

productRouter.get("/", productController.getAllProduct)

module.exports = productRouter
