//server start
require('dotenv').config()
const app = require("./src/app.js")
const connectDB = require("./src/db/db.js")

connectDB()
app.listen(process.env.PORT,(req,res)=>{
   console.log(`SERVER IS RUNNING AT PORT: ${process.env.PORT}`)
})
