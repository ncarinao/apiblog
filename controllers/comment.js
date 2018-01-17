'use strict'

const Comment = require('../models/comment')
const Post = require('../models/post')
const services = require('../services')
const User = require('../models/user')

function saveComment(req,res){
  var comment = new Comment()
  var postId = req.body.comments
  comment.text = req.body.text
  comment.post = req.body.comments
  comment.author = req.user
  // comment.save((err,commentStored)=>{
  //   if(err) res.status(500).send({message:`Error al guardar el comentario: ${err}`})
  //   res.status(200).send({comment: commentStored})
  // })
  comment.save((err,commentStored)=>{
    if(err) res.status(500).send({message:`Error al guardar el Comentario ${err}`}) 
    Post.findById(postId, function(err, post) {
      if (err) return res.send(err);
      post.comments.push(comment);
      post.save(function(err) {
        if (err) return res.send(err);
      });
    });
    res.status(200).send({message:`Los campos se guardaron correctamente ${comment}`})
  })
}

function getComments(req,res){
  Comment.find({},(err,comments)=>{
    User.populate(comments,{path: 'author'},(err,comments)=>{
      if (err) return res.status(500).send({message:`Error al realizar la peticion: ${err}`})
      if (!comments) return res.status(404).send({message:`Comentarios no existe: ${err}`})
      res.status(200).send({comments})

    })
  })
}




module.exports = {
  saveComment,
  getComments
}
