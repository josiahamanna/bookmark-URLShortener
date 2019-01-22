const express = require('express')
const router = express.Router()
const { URL } = require('../models/url')

router.get('/', (req,res)=>{
    URL.find()
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
    const url = new URL(body)
    url.save()
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

router.get('/:id', (req, res)=>{
    const id = req.params.id
    URL.findById(id)
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
    URL.findByIdAndUpdate(id, {...body}, {new: true})
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
    URL.findByIdAndRemove(id)
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