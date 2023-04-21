const express = require('express')
const app= express()
const route= require('./route/route')

app.use(express.json())

app.use('/',route)

let PORT = 3000

app.listen(PORT,()=>{
    console.log(`Connected on PORT ${PORT}`)
})