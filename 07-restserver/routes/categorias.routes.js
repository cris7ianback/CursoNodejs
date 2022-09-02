import { check } from "express-validator";
import { Router } from "express";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import {
        actualizarCategoria,
        borrarCagetoria,
        crearCategoria,
        obtenerCategoria } from "../controllers/categorias.controller.js";
import { existeCategoriaId } from "../helpers/db-validators.js";
import { esAdminRole } from "../middlewares/validar-roles.js";
export const routerCategoria = Router();

// Obtener todas las categorias - público
routerCategoria.get("/", obtenerCategoria);

//Obtener una categoria por id - público
routerCategoria.get('/:id', [
    check('id', 'No es un id de mongo válido').isMongoId(),
    check('id').custom(existeCategoriaId),
    validarCampos,
], obtenerCategoria);

// Crear categoria - privado -cualquier persona con un token válido
routerCategoria.post('/',
    [
        check("nombre", "El nombre es Obligatorio").not().isEmpty(),
        validarCampos,
        validarJWT,
    ],
    crearCategoria
);

// Actualizar - privado - cualquiera con token válido
routerCategoria.put('/:id', [
    validarJWT,
    check ('nombre','El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeCategoriaId),
    validarCampos
], actualizarCategoria );

// Borrar una categoría - Admin
routerCategoria.delete('/:id', [
    validarJWT,
    esAdminRole,
    check("id", "No es un id válido").isMongoId(),
    check("id").custom(existeCategoriaId),
    validarCampos,
],
    borrarCagetoria
);

export { Router };
