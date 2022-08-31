import { check } from 'express-validator'
import { Router } from 'express';

import { googleSignIn, login } from '../controllers/auth.controller.js';
import { validarCampos } from '../middlewares/validar-campos.js';

export const routerAuth = Router();


routerAuth.post('/login',[
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password','La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login );

routerAuth.post('/google',[
    check('id_token', 'El id_Token de google es necesario').not().isEmpty(),    
    validarCampos
], googleSignIn );

export {

    Router
}