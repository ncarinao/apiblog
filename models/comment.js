'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema = Schema({
  text: String,
  author: {type: Schema.ObjectId, ref:"user"},
  createAt: {type: Date, default: Date.now()},
  post: { type: Schema.ObjectId, ref:"Post", childPath:"comments" }  
})

module.exports = mongoose.model('Comment', CommentSchema)