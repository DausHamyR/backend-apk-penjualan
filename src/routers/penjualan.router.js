const penjualanRouter = require("express").Router()
const penjualanController = require("../controllers/penjualan.controller")

penjualanRouter.get("/", penjualanController.getAllPenjualan)
penjualanRouter.get("/:id", penjualanController.getDetailPenjualan)
penjualanRouter.post("/", penjualanController.createPenjualan)
penjualanRouter.patch("/:id", penjualanController.updateStokProduct)
penjualanRouter.delete("/:id", penjualanController.deletePenjualan)

module.exports = penjualanRouter
