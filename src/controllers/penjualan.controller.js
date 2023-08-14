const moment = require("moment/moment")
const penjualanModel = require("../models/penjualan.model")
const productModel = require("../models/product.model")

exports.getAllPenjualan = async (request, response) => {
    try {
        let getAllPenjualan = await penjualanModel.findAll(request.query)
        return response.json({
            success: true,
            message: "Get All Penjualan",
            results: getAllPenjualan
        })
    }catch(err) {
        // return errorHandler(response, err)
        console.log(err)
    }
}

exports.getDetailPenjualan = async (request, response) => {
  try {
    const idPenjualan = request.params.id
    const getDataPenjualan = await penjualanModel.findOne(idPenjualan)
    const getDataProduct = await productModel.findOne(getDataPenjualan.idProduct)
    const results = {
      resultPenjualan: getDataPenjualan,
      resultProduct: getDataProduct
    }
    return response.json({
        success: true,
        message: "Get Detail Penjualan",
        results
    })
  }catch(err) {
      // return errorHandler(response, err)
      console.log(err)
  }
}

exports.createPenjualan = async (request, response) => {
  try {
    let data = {
      ...request.body
    }
    const getStokProduct = await productModel.findOne(data.idProduct)
    const createDataPenjualan = await penjualanModel.insert(data, getStokProduct.stok)
    const stokAkhir = getStokProduct.stok - data.terjual
    const updateStokProduct = await productModel.update(data.idProduct, stokAkhir)
    return response.json({
        success: true,
        message: "Create Penjualan successfully",
        results: createDataPenjualan
    })
  }catch(err) {
      // return errorHandler(response, err)
      console.log(err)
  }
}

exports.updateStokProduct = async (request, response) => {
  try {
      const idPenjualan = request.params.id
      let data = {
          ...request.body
      }
      const getStokProduct = await productModel.findOne(idPenjualan)
      const stokAkhir = getStokProduct.stok + parseInt(data.stok)
      const updateStokProduct = await productModel.update(idPenjualan, stokAkhir)
      return response.json({
          success: true,
          message: "Stok Product Updated",
          results: updateStokProduct
      })
  }catch(err) {
      // return errorHandler(response, err)
      console.log(err)
  }
}

exports.deletePenjualan = async (request, response) => {
  try {
      const idPenjualan = request.params.id
      const data = await penjualanModel.destroy(idPenjualan)
      return response.json({
          success: true,
          message: "Delete Penjualan successfully",
          results: data
      })
  }catch(err) {
      // errorHandler(response, err)
      console.log(err)
  }
}
