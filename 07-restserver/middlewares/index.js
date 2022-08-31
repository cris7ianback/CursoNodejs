

import validaCampos from '../middlewares/validar-campos.js';
import validarJWT from '../middlewares/validar-jwt.js';
import validaRoles from '../middlewares/validar-roles.js';

export default {
    ...validaCampos,
    ...validarJWT,
    ...validaRoles,
}