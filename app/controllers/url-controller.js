const express = require('express')
const router = express.Router()
const { Bookmark } = require('../models/url')

router.get('/', (req,res)=>{
    Bookmark.find()
        .then((urls)=>{
            res.send(urls)
        })
        .catch((err)=>{
            res.send(err)
        })
})

router.post('/', (req, res) => {
    const body = req.body
    console.log(body)
    const bookmark = new Bookmark(body)
    bookmark.save()
        .then((url)=>{
            if(url) {
                res.send(url)
                
            } else {
                res.send(url)
                console.log(url)
            }
        })
        .catch(err=>res.send(err))
})

router.get('/tags', (req, res) => {
    const names = req.query.names
    Bookmark.find({tags:{'$in': names.split(',')}})
        .then(url=>{
            if(url.length>0)
                res.send(url)
            else
                res.send('no match found')
        })
        .catch(err=>res.send(err))
})

router.get('/tags/:name', (req, res)=>{
    const name = req.params.name
    Bookmark.find({tags:name})
        .then((url)=>{
            if(url.length>0){
                res.send(url)
            } else {
                res.send('no match found')
            }
        })
        .catch(err=>res.send(err))
})

router.get('/:id', (req, res)=>{
    const id = req.params.id
    Bookmark.findById(id)
        .then((url)=>{
            if(url) {
                res.send(url)
            } else {
                res.send({})
            }          
        })
        .catch((err)=>{
            res.send(err)
        })
})

router.put('/:id', (req, res)=>{
    const id = req.params.id
    const body = req.body
    Bookmark.findByIdAndUpdate(id, {...body}, {new: true})
        .then((url)=>{
            if(url) {
                res.send(url)
            } else {
                res.send({})
            }
        })
        .catch((err)=>{
            res.send(err)
        })
})

router.delete('/:id', (req, res)=>{
    const id = req.params.id
    Bookmark.findByIdAndRemove(id)
        .then((url)=>{
            if(url) {
                res.send(url)
            } else {
                res.send({})
            }
        })
        .catch((err)=>{
            res.send(err)
        })
})



module.exports = {
    urlRouter: router
}