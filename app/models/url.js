const mongoose = require('mongoose')
const validator = require('validator')
const sh = require('shorthash')

const { Schema } = mongoose

const bookmarkSchema = new Schema({
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
    hashedUrl: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

bookmarkSchema.pre('save', function(next) {
    this.hashedUrl = sh.unique(this.originalUrl)
    next()
})

const Bookmark = mongoose.model('Bookmark', bookmarkSchema)

module.exports = {
    Bookmark
}