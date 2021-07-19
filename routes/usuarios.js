
const { Router } = require('express');
const { usuariosGet, 
  usuariosPost, 
  usuariosDelete, 
  usuariosPut, 
  usuariosPatch } = require('../controllers/usuarios');
  const { check } = require('express-validator');
  const {validarCampos} = require('../middlewares/validar-campos')

const router = Router();

router.get('/', usuariosGet)    

router.post('/', [
 check('correo', 'El correo ne es válido').isEmail(),
 check('nombre', 'El nombre es obligatorio').not().isEmpty(),
 check('password', 'La contraseña debe tener minimo 5 caracteres').isLength({min: 5}),
 check('rol', 'El rol no es válido').isIn(['ADMIN_ROLE', 'USER_ROLE'])
],
validarCampos,  
usuariosPost)

router.put('/:id1/:id2', usuariosPut)

router.delete('/', usuariosDelete)

router.patch('/', usuariosPatch)


module.exports = router;