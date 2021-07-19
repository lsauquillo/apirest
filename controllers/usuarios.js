const { response } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');

const usuariosGet =  (req, res = response)=>{
  const { id, nombre, edad, pagina="1" } = req.query;
  res.json({       
    msg: "API-GET con controller usuariosGet",
    nombre,
    id,
    edad,
    pagina
  })
}

const usuariosPost =  async (req, res = response)=>{

  const { nombre, correo, password, rol} = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol} );//el param. es un obj!
  
  // ver si el correo ya existe
  const existeEmail = await Usuario.findOne({ correo: correo});
  if(existeEmail){
    return res.status(400).json({
      msg: 'Ese correo ya esta registrado'
    })
  }
  

  // encriptar contraseña
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync( password, salt);


  // guardar en la base de datos
  await usuario.save();
  
  res.json({       
    msg: "API-POST con controller usuariosPost",
    usuario
  })
}

const usuariosPut =  (req, res = response)=>{
  const {id1, id2} = req.params
  res.json({       
    msg: "API-PUT con controller usuariosPut",
    id1,
    id2
  })
}

const usuariosDelete =  (req, res = response)=>{
  res.json({       
    msg: "API-DELETE con controller usuariosDelete"
  })
}

const usuariosPatch =  (req, res = response)=>{
  res.json({       
    msg: "API-PATCH con controller usuariosPatch"
  })
}



module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
  usuariosPatch
}