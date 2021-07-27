
const { Router } = require('express');
const { usuariosGet, 
  usuariosPost, 
  usuariosDelete, 
  usuariosPut, 
  usuariosPatch } = require('../controllers/usuarios');
  const { check } = require('express-validator');
  const {validarCampos} = require('../middlewares/validar-campos');
  const Role = require('../models/role');
  const {esRoleValido, emailExiste, usuarioIdExiste} = require('../helpers/db-validators')
  const Usuario = require('../models/usuario');
const router = Router();

router.get('/', usuariosGet)    

router.post('/', [
 check('nombre', 'El nombre es obligatorio').not().isEmpty(),
 check('password', 'La contraseña debe tener minimo 5 caracteres').isLength({min: 5}),
 check('correo', 'El correo ne es válido').isEmail(),
 check('correo').custom(emailExiste), 
//  check('rol', 'El rol no es válido').isIn(['ADMIN_ROLE', 'USER_ROLE'])
check('rol').custom(esRoleValido), 
validarCampos, 
], 
usuariosPost)

router.put('/:id', [
  check('id', 'No es un id válido').isMongoId(),
  check('id').custom( usuarioIdExiste),
  check('rol').custom(esRoleValido),
  validarCampos,
], usuariosPut)

router.delete('/', usuariosDelete)

router.patch('/', usuariosPatch)


module.exports = router;