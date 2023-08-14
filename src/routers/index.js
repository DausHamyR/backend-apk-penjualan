const router = require("express").Router()

router.get("/", (request, response) => {
    return response.json({
        success: true,
        message: "Backend is running well"
    })
})

router.use("/penjualan", require("./penjualan.router"))
router.use("/product", require("./product.router"))

router.use("*", (request, response) => {
  return response.status(404).json({
      success: false,
      message: "Resource not found"
  })
})

module.exports = router
