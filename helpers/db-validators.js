const Role = require('../models/role');
const Usuario = require('../models/usuario');


const esRoleValido = async  (rol='') =>  {
  const existeRol = await Role.findOne({rol : rol});
  if(!existeRol){
    throw new Error(`El rol ${rol} no esta registrado en la DB`)
  }  
}

const emailExiste = async (correo = '') =>{
  const existeEmail = await Usuario.findOne({ correo: correo});
  if(existeEmail){
    throw new Error(`El correo ${correo} ya esta registrado`)
}
}

const usuarioIdExiste = async (id) =>{
  const existeId = await Usuario.findById(id);
  if(!existeId){
    throw new Error(`El id ${id} no existe en la DB`)
}
}


module.exports = {esRoleValido, emailExiste, usuarioIdExiste}