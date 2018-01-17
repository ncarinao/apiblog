'use strict'

const Post = require('../models/post')
const services = require('../services')
const User = require('../models/user')
const Comment = require('../models/comment')


function getPost(req,res){
  let postId = req.params.postId
  Post.findById(postId,(err,post)=>{
    if (err) return res.status(500).send({message:`Error al realizar la peticion: ${err}`})
    if (!post) return res.status(404).send({message:`Post no existe: ${err}`})

    res.status(200).send({post})
  })
}

function getPosts(req,res){
  Post.find({},(err,posts)=>{
    User.populate(posts,{path: 'author'},(err,posts)=>{
      Comment.populate(posts,{path: 'comments'},(err,posts)=>{
        if (err) return res.status(500).send({message:`Error al realizar la peticion: ${err}`})
        if (!posts) return res.status(404).send({message:`Post no existe: ${err}`})
        res.status(200).send({posts})
      })
    })
  })
}

function savePost(req,res){
  let post = new Post()
  post.title = req.body.title
  post.description = req.body.description
  post.author = req.user
  post.save((err,postStored)=>{
    if(err) res.status(500).send({message:`Error al guardar el post: ${err}`})
    res.status(200).send({post: postStored})
  })

}

function updatePost(req,res){
  let postId = req.params.postId
  let update = req.body
  Post.findByIdAndUpdate(postId,update,(err, postUpdated)=>{
    if(err) res.status(500).send({message:`Error al actualizar el post: ${err}`})
    res.send({'status':200,post : postUpdated })
    
  })
}

function deletePost(req,res){
  let postId = req.params.postId
  Post.findById(postId,(err,post)=>{
    if(err) res.send({'status':500,message:`Error al borrar el post: ${err}`})
    post.remove(err=>{
      if (err) res.status(500).send({message:`Error al borrar el post: ${err}`})
      res.send({'status':200,message:`El post ha sido eliminado`})
    })
  })
}


module.exports = {
  deletePost,
  updatePost,
  getPost,
  getPosts,
  savePost
}
