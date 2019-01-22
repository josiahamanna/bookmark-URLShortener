const mongoose = require('mongoose')
const validator = require('validator')
const sh = require('shorthash')

const { Schema } = mongoose

const urlSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    originalUrl: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                return validator.isURL(value)
            },
            message: function(){
                return 'invalid URL'
            }
        }
    },
    tags: {
        type: [String],
        required: true
    },
    hashedlUrl: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

urlSchema.pre('save', function(next) {
    this.hashedlUrl = sh.unique(this.originalUrl)
    next()
})

const URL = mongoose.model('Url', urlSchema)

module.exports = {
    URL
}