import { response, request } from 'express';
import bcryptjs from 'bcryptjs';
import Usuario from "../models/usuario.js";


const usuarioDelete = async (req, res = response) => {

    const { id } = req.params;
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });
    
    res.json(usuario);
}

const usuarioGet = async (req = request, res = response) => {


    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };
    

    const [total, usuarios] = await Promise.all([       
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number( desde ))
            .limit(Number( limite ))
    ]);

    res.json({
        total,
        usuarios
    });
}


const usuarioPatch = (req, res = response) => {
    res.json({
        msg: 'Patch API - controlador'
    })
};


const usuarioPost = async(req, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });


    //Encryptar Contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt )

    //Guardar en BD
    await usuario.save();

    res.json({
        usuario
    })
};

const usuarioPut = async (req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    //TODO validar contra BD
    if ( password ) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto );

    res.json( usuario );
};






export {
    usuarioDelete,
    usuarioGet,
    usuarioPatch,
    usuarioPost,
    usuarioPut,
}