const express = require('express')
const app = express()
const port = 3000
const { urlRouter } = require('./app/controllers/url-controller')
require('./config/database')
const { Bookmark } = require('./app/models/url')
const useragent = require('useragent')
const morgan = require('morgan')
const fs = require('fs')

const logStream = fs.createWriteStream('./logs/access.log', {flags: 'a'})

console.log(morgan.tiny)

app.use(morgan(morgan.tiny, {stream: logStream}))

app.use(express.json())
// app.use(useragent.express())

function getUserInfo(req) {
    const source = req.headers['user-agent']
    ua = useragent.parse(source)
    const userInfo = {}
    userInfo.ipAddress = req.connection.remoteAddress
    userInfo.browserName = ua.toAgent()
    userInfo.operatingSystem = ua.os.toString()
    userInfo.device = ua.device.toString()
    return userInfo
}

app.get('/', (req, res)=>{
    res.send('wellcome to url shortner')
})


app.use('/bookmarks', urlRouter)

app.get('/hash/:hash', (req, res)=>{
    const hash = req.params.hash
    Bookmark.find({hashedUrl:hash})
        .then((url)=>{
            if(url){
                res.redirect(url[0].originalUrl)
                Bookmark.findByIdAndUpdate(url[0]._id, { $push: {clicks: getUserInfo(req)}}, {new: true})
                    .then(()=>console.log('hey'))
                    .catch((err)=>console.log('error updating click array', err))
            } else {
                res.send('hash not matched')
            }
        })
        .catch(err=>res.send(err))
})

app.use(function (req, res) {
    // console.error(err.stack)
    res.status(404).send({notice: 'Something broke!'})
  })

app.listen(port, ()=>console.log('listening on port', port))
