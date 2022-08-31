import { json, response } from 'express';
import bcryptjs from 'bcryptjs'

import { generarJWT } from '../helpers/generarJWT.js';
import { googleVerify } from '../helpers/google-verify.js';
import Usuario from "../models/usuario.js"

const login = async (req, res = response) => {

    const { correo, password } = req.body;

    try {

        // Verificar si el email existe
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario / Password Incorrecto - email - correo'
            });
        }

        // Si el usuario está activo en BD
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado: false'
            });
        }

        //Verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            });
        }

        // Generar el JWT
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

const googleSignIn = async (req, res = response) => {

    const { id_token } = req.body;
    console.log(id_token);

    try {
        const { correo, nombre, img } = await googleVerify(id_token);
        console.log(correo, nombre, img);

        let usuario = await Usuario.findOne({ correo });
        console.log(usuario)
        if (!usuario) {
            //tengo que crear Usuario

            const data = {
                nombre,
                correo,
                rol: "USER_ROLE",
                password: ':P',
                img,
                google: true
            };

            usuario = new Usuario(data);
            await usuario.save();
        }

        // Si el usuario en DB
        if (!usuario.estado) {
            return res.status(401).json({
                msg: ' Hable con el administrador, usuario bloqueado'
            });
        }

        // Generar el JWT
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        });

    } catch (error) {
        res.status(400).json({
            msg: 'Token de Google no es válido',
            // error
        })

    }
}

export {
    login,
    googleSignIn
}