import { check } from 'express-validator'
import { Router } from 'express';

import { login } from '../controllers/auth.controller.js';
import { validarCampos } from '../middlewares/validar-campos.js';

export const routerAuth = Router();


routerAuth.post('/login',[
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password','La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login );


export {

    Router
}