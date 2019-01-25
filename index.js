const express = require('express')
const app = express()
const port = 3000
const { urlRouter } = require('./app/controllers/url-controller')
require('./config/database')
const { Bookmark } = require('./app/models/url')

app.use(express.json())

app.get('/', (req, res)=>{
    res.send('wellcome to url shortner')
})


app.use('/bookmarks', urlRouter)

app.get('/:hash', (req, res)=>{
    const hash = req.params.hash
    Bookmark.find({hashedUrl:hash})
        .then((url)=>{
            if(url){
                res.send(url)
            } else {
                res.send('hash not matched')
            }
        })
        .catch(err=>res.send(err))
})

app.listen(port, ()=>console.log('listening on port', port))
