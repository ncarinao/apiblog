'use strict'

const express = require('express')
const api = express.Router()
const PostCtrl = require('../controllers/post')
const UserCtrl = require('../controllers/user')
const CommentCtrl = require('../controllers/comment')
const auth = require('../middlewares/auth')

api.get('/posts',PostCtrl.getPosts)
api.get('/post/:postId',PostCtrl.getPost)
api.post('/post',auth,PostCtrl.savePost)
api.put('/post/:postId',PostCtrl.updatePost)
api.delete('/post/:postId',PostCtrl.deletePost)
api.get('/signin',UserCtrl.signIn)
api.post('/signup',UserCtrl.signUp)
api.get('/users',UserCtrl.getUsers)
api.post('/comment',auth,CommentCtrl.saveComment)
api.get('/comments',CommentCtrl.getComments)
module.exports = api