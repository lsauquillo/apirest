const { response } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');

const usuariosGet = async (req, res = response)=>{
  // const { id, nombre, edad, pagina="1" } = req.query;
  const { limite=5, desde=0} = req.query;
  const query = {estado: true};

  // const usuarios = await Usuario.find(query)
    // .skip( Number(desde) )
    // .limit( Number(limite) )
// 
  // const total = await Usuario.countDocuments(query);

  // mas rápido con 
  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query)
     .skip( Number(desde) )
     .limit( Number(limite) )
  ])

  res.json({       
    // msg: "API-GET con controller usuariosGet",
    total,
    usuarios
    
  })
}

const usuariosPost =  async (req, res = response)=>{

  const { nombre, correo, password, rol} = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol} );//el param. es un obj!
  
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

const usuariosPut = async (req = request, res = response)=>{
  const {id} = req.params;
  const { _id, password, google, correo, ...resto} = req.body;

  // validar contra base de datos
  if(password){
    // encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync( password, salt);
  }

  // actualiza el usuario
  const usuario = await Usuario.findByIdAndUpdate(id, resto)
  res.json({       
    msg: "API-PUT con controller usuariosPut",   
    usuario
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