const { response } = require('express');

const usuariosGet =  (req, res = response)=>{
  const { id, saludo, pagina="1" } = req.query;
  res.json({       
    msg: "API-GET con controller usuariosGet",
    saludo,
    id,
    pagina
  })
}

const usuariosPost =  (req, res = response)=>{
  const { nombre, edad} = req.body;
  res.json({       
    msg: "API-POST con controller usuariosPost",
    nombre,
    edad
  })
}

const usuariosPut =  (req, res = response)=>{
  const id = req.params.id
  res.json({       
    msg: "API-PUT con controller usuariosPut",
    id
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