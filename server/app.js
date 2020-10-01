// require('dotenv').config()
const express =  require("express")
const cors = require("cors")
const route = require("./routes/index")
const app = express()
const port = 3000
 

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))  
app.use(route) 

app.listen(port,()=>{
    console.log("listening on port", port)
})