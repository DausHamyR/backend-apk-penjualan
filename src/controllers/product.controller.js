const penjualanModel = require("../models/penjualan.model")
const productModel = require("../models/product.model")

exports.getAllProduct = async (request, response) => {
  try {
      const getAllProduct = await productModel.findAll()
      return response.json({
          success: true,
          message: "Get All Product",
          results: getAllProduct
      })
  }catch(err) {
      // return errorHandler(response, err)
      console.log(err)
  }
}
