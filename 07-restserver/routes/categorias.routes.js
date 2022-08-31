import { check } from "express-validator";
import { Router } from "express";

import { validarCampos } from "../middlewares/validar-campos.js";
import { router } from "./usuario.routes.js";
export const routerCategoria = Router();


// Obtener todas las categorias - público
routerCategoria.get('/', (req, res) => {
    res.json('get');
})

//Obtener una categoria por id - público
router.get('/:id', (req, res) =>{
    res.json('get');
})

// Crear categoria - privado -cualquier persona con un token válido
router.get('/:id', (req, res) =>{
    res.json('get');
})


export{ Router }