
const { Router } = require('express');
const { usuariosGet, 
  usuariosPost, 
  usuariosDelete, 
  usuariosPut, 
  usuariosPatch } = require('../controllers/usuarios');
  const { check } = require('express-validator');

const router = Router();

router.get('/', usuariosGet)    

router.post('/', [
 check('correo', 'El correo ne es válido').isEmail()
], usuariosPost)

router.put('/:id1/:id2', usuariosPut)

router.delete('/', usuariosDelete)

router.patch('/', usuariosPatch)


module.exports = router;