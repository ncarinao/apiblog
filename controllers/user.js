'use strict'

const User = require('../models/user')
const service = require('../services')
const Post = require('../models/post')

function signUp (req, res) {
  console.log(req.body)
  const user = new User({
    email: req.body.email,
    userName: req.body.userName,
    password: req.body.password    
  })

  user.save((err) => {
    if (err) return res.status(500).send({ message: `Error al crear el usuario: ${err}` })

    return res.status(201).send({ token: service.createToken(user) })
  })
}

function signIn (req, res) {
  User.find({ email: req.body.email }, (err, user) => {
    if (err) return res.status(500).send({ message: err })
    if (!user) return res.status(404).send({ message: 'No existe el usuario' })

    req.user = user
    res.status(200).send({
      message: 'Te has logueado correctamente',
      token: service.createToken(user)
    })
  })
}

function getUsers(req,res){
  User.find({},(err,users)=>{
    if (err) return res.status(500).send({message:`Error al realizar la peticion: ${err}`})
    if (!users) return res.status(404).send({message:`Post no existe: ${err}`})
    res.status(200).send({users})
    
  })
}

module.exports = {
  signUp,
  signIn,
  getUsers
}