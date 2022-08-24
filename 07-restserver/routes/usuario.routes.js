import { Router } from 'express';
import { usuarioDelete, usuarioGet, usuarioPatch, usuarioPost, usuarioPut } from "../controllers/usuario.controller.js"

export const router = Router();



router.delete('/', usuarioDelete);
router.get('/', usuarioGet);
router.patch('/', usuarioPatch);
router.post('/', usuarioPost);
router.put('/:id', usuarioPut);

export {

    Router
}