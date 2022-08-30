import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { validaRoles } from "../middlewares/validar-roles.js";



export default {
    ...validarCampos,
    ...validarJWT,
    ...validaRoles
}