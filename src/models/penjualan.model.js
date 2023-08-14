const db = require("../helpers/db.helper")

exports.findAll = async function (params) {
  params.page = parseInt(params.page) || 1
  params.limit = parseInt(params.limit) || 5
  params.search = params.search || ""
  params.searchJenisBarang = params.searchJenisBarang || ""
  params.tanggalAwal = params.tanggalAwal || "2023-01-01"
  params.tanggalAkhir = params.tanggalAkhir || "2023-01-01"
  params.sort = params.sort || "tanggal"
  params.sortBy = params.sortBy || "DESC"
  params.and = params.and || "OR"

  const offset = (params.page - 1) * params.limit

  const query = `
  SELECT 
  "p"."id",
  "pd"."name",
  "p"."stokAkhir",
  "p"."terjual",
  "p"."createdAt" AS "tanggal",
  "pd"."jenisBarang" AS "jenisbarang"
FROM "penjualan" "p"
JOIN "product" "pd" ON "pd"."id" = "p"."idProduct"
WHERE 
  "pd"."name" ILIKE $3 ${params.and}
  "p"."createdAt" BETWEEN $4 AND $5::DATE + 1
ORDER BY ${params.sort} ${params.sortBy} 
LIMIT $1 OFFSET $2
`
  const values = [params.limit, offset, `%${params.search}%`, params.tanggalAwal, params.tanggalAkhir]
  const {rows} = await db.query(query, values)
  return rows
}

exports.findAllByDate = async function (params) {
  params.page = parseInt(params.page) || 1
  params.limit = parseInt(params.limit) || 5
  params.search = params.search || ""
  params.searchJenisBarang = params.searchJenisBarang || ""
  params.searchPenjualan = params.searchPenjualan || ""
  params.searchPenjualan2 = params.searchPenjualan2 || ""
  params.sort = params.sort || "id"
  params.sortBy = params.sortBy || "DESC"

  const offset = (params.page - 1) * params.limit

  const query = `
SELECT 
  "p"."id",
  "pd"."name",
  "p"."stokAkhir",
  "p"."terjual",
  "p"."createdAt",
  "pd"."jenisBarang"
FROM "penjualan" "p"
JOIN "product" "pd" ON "pd"."id" = "p"."idProduct"
WHERE 
  "pd"."name" ILIKE $3 AND
  "pd"."jenisBarang" ILIKE $4 OR
  "p"."createdAt" BETWEEN $5 AND $6
ORDER BY ${params.sort} ${params.sortBy} 
LIMIT $1 OFFSET $2
`
  const values = [params.limit, offset, `%${params.search}%`, `%${params.searchJenisBarang}%`, `%${params.searchPenjualan}%`, `%${params.searchPenjualan2}%`]
  const {rows} = await db.query(query, values)
  return rows
}

exports.findOne = async function (id) {
  const query = `
  SELECT * FROM "penjualan" WHERE id=$1
  `
  const values = [id]
  const {rows} = await db.query(query, values)
  return rows[0]
}

exports.insert = async function (data, stok) {
  const query = `
  INSERT INTO "penjualan" ("idProduct", "terjual", "stokAkhir")
  VALUES ($1, $2, $3) RETURNING *
  `
  const values = [data.idProduct, data.terjual, stok]
  const {rows} = await db.query(query, values)
  return rows[0]
}

exports.destroy = async function (id) {
  const query = `
  DELETE FROM "penjualan" WHERE "id"=$1 RETURNING *
`
  const values = [id]
  const {rows} = await db.query(query, values)
  return rows[0]
}
