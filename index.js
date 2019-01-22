const express = require('express')
const app = express()
const port = 3000
const { urlRouter } = require('./app/controllers/url-controller')
require('./config/database')

app.use(express.json())

app.get('/', (req, res)=>{
    res.send('wellcome to url shortner')
})

app.use('/bookmarks', urlRouter)

app.listen(port, ()=>console.log('listening on port', port))
