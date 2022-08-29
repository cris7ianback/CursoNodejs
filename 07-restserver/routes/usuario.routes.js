import { Router } from 'express';
import { check } from 'express-validator';
import { usuarioDelete, usuarioGet, usuarioPatch, usuarioPost, usuarioPut } from "../controllers/usuario.controller.js"



import { esEmailValido, esRoleValido, existeUsuarioPorId } from '../helpers/db-validators.js';
import { validarCampos } from "../middlewares/validar-campos.js"

export const router = Router();



router.delete('/:id',[
    check('id', 'No es un Id válido').isMongoId(),
    check('id').custom (existeUsuarioPorId),
    validarCampos
], usuarioDelete);
router.get('/', usuarioGet);
router.patch('/', usuarioPatch);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio y de 6 caracteres').isLength({ min: 6 }),
    check ('correo', 'El correo no es válido').isEmail(),
    check('correo', 'El correo no es válido').custom(esEmailValido),
    check('rol').custom(esRoleValido),
    validarCampos
], usuarioPost);

router.put('/:id', [
    check('id', 'no es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom (esRoleValido),
    validarCampos
], usuarioPut);

export {

    Router
}