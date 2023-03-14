import { response } from 'express';

const buscar = async ( req, res = response) =>{

    res.json ({
        msg: 'Buscar.......'
    })


}

export {  buscar }