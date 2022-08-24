import { response } from 'express';
import bcryptjs from 'bcryptjs';
import Usuario from "../models/usuario.js";


const usuarioGet = (req = request, res = response) => {

    const query = req.params;

    res.json({
        msg: 'get API - Controlador',
        query
    })
};

const usuarioPost = async (req, res = response) => {
    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    //Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo: correo });
    if(!existeEmail){
        return res.status(400).json({
            msg: ' El Correo ya está registrado'
        })
    }
    //Encryptar Contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt)

    //Guardar en BD
    await usuario.save()

    res.json({
        msg: 'post API - Controlador',
        usuario
    })
};

const usuarioPut = (req, res = response) => {

    const id = req.params.id;

    res.json({
        msg: 'Put API - controlador',
        id
    })
};

const usuarioPatch = (req, res = response) => {
    res.json({
        msg: 'Patch API - controlador'
    })
};

const usuarioDelete = (req, res = response) => {
    res.json({
        msg: 'Delete API - Controlador'
    })
}



export {
    usuarioDelete,
    usuarioGet,
    usuarioPatch,
    usuarioPost,
    usuarioPut,
}