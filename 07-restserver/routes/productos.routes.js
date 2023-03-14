import { check } from "express-validator";
import { Router } from "express";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import {
    actualizarProducto,
    borrarProducto,
    crearProducto,
    obtenerProducto,
    obtenerProductos
} from "../controllers/productos.controller.js";
import { existeCategoriaId, existeProductoPorId } from "../helpers/db-validators.js";
import { esAdminRole } from "../middlewares/validar-roles.js";
export const routerProductos = Router();

// Obtener producto por id
// routerProductos.put('/:id',[
//     validarJWT,
//     // check('categoria','No es un id de Mongo').isMongoId(),
//     // check('id').custom( existeProductoPorId ),
//     validarCampos
// ], actualizarProducto );


routerProductos.put('/:id',[
    validarJWT,
    check('categoria','No es un id de Mongo').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
], actualizarProducto );



//Obtener todas las categorias - publico
routerProductos.get('/', obtenerProductos);

// Obtener una categoria por id - publico
routerProductos.get('/:id', [
    check('id', 'No es un id de Mongo válido').isMongoId(),
    // check('id').custom(existeProductoPorId.existeProductoPorId),
    validarCampos
], obtenerProducto );

console.log(obtenerProducto)


//crear Producto - privado - cualquier persona con un token válido
routerProductos.post('/',
    [
        validarJWT,
        check('nombre', 'el nombre es Obligatorio').not().isEmpty(),
        check('categoria', 'No es un id de Mongo').isMongoId(),
        check('categoria').custom(existeCategoriaId),
        validarCampos,
    ], crearProducto);


routerProductos.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', ' No es un id de Mongo válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], borrarProducto)


export { Router };

