'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = Schema({
  title: String,
  description: String,
  author: {type: Schema.ObjectId, ref:"user"},
  createAt: {type: Date, default: Date.now()},
  comments:[{ type: Schema.ObjectId, ref:"Comment" }]  
})

module.exports = mongoose.model('Post', PostSchema)