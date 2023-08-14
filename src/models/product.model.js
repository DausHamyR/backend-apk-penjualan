const db = require("../helpers/db.helper")

// exports.findAll = async function (params) {
//   params.page = parseInt(params.page) || 1
//   params.limit = parseInt(params.limit) || 5
//   params.search = params.search || ""
//   params.sort = params.sort || "id"
//   params.sortBy = params.sortBy || "ASC"

//   const offset = (params.page - 1) * params.limit

//   const query = `
// SELECT * FROM "penjualan" 
// WHERE 
//   "pd"."name" ILIKE $3 AND
//   "pd"."name" ILIKE $3 AND
// LIKE $3 
// ORDER BY ${params.sort} ${params.sortBy} 
// LIMIT $1 OFFSET $2
// `
//   const values = [params.limit, offset, `%${params.search}%`]
//   const {rows} = await db.query(query, values)
//   return rows
// }

exports.findAll = async function () {
  const query = `
  SELECT * FROM "product" ORDER BY "id" ASC
  `
  const {rows} = await db.query(query)
  return rows
}

exports.findOne = async function (id) {
  const query = `
  SELECT * FROM "product" WHERE id=$1
  `
  const values = [id]
  const {rows} = await db.query(query, values)
  return rows[0]
}

exports.update = async function (id, data) {
  const query = `
  UPDATE "product"
  SET "stok"=$2
  WHERE "id"=$1
  RETURNING *
`
  const values = [id, data]
  const {rows} = await db.query(query, values)
  return rows[0]
}
