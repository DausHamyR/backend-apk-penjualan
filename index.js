require("dotenv").config({
  path: ".env"
})
const express = require("express")
const cors = require("cors")

const app = express()
app.use(express.urlencoded({extended: false}))
app.use(cors({
  origin: "*",
  optionsSuccessStatus: 200
}))

app.use("/", require("./src/routers/index"))

const {PORT} = process.env
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`)
})
