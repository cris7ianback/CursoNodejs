import { response } from "express";
import Categoria from "../models/index.js";


//ActualizarCategoria
const actualizarCategoria = async (req, res = response) => {
    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id

    const categoria = await Categoria.Categoria.findByIdAndUpdate(id, data, { new: true });

    res.json(categoria);

}

//BorrarCategoria - estado:false
const borrarCagetoria = async (req, res = response) => {

    const { id } = req.params;
    const categoria = await Categoria.Categoria.findByIdAndUpdate(id, { estado: false }, { new: true });
    res.json(categoria)

}

//Crear categorias
const crearCategoria = async (req, res = response) => {

    const nombre = req.body.nombre.toUpperCase();
    const categoriaDB = await Categoria.Categoria.findOne({ nombre });
    console.log(categoriaDB)


    if (categoriaDB) {
        return res.status(400).json({
            msg: `La categoria ${categoriaDB.nombre}, ya existe`
        });

    }
    //Generar data a Guardar
    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = new Categoria(data);

    // Guardar DB
    await categoria.save();

    res.status(201).json(categoria);


}

//ObtenerCategoria - populate {}
const obtenerCategoriaID = async (req, res = response) => {
    const { id } = req.params;
    const categoria = await Categoria.Categoria.findById(id)
        .populate('usuario', 'nombre');

    res.json(categoria);
}

// ObtenerCategorias - paginado - total -populate
const obtenerCategoria = async (req, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true }

    const [total, categorias] = await Promise.all([
        Categoria.Categoria.countDocuments(query),
        Categoria.Categoria.find(query)
            .populate('usuario', 'nombre')
            .skip(Number(desde))
            .limit(Number(limite))

    ]);

    res.json({
        total,
        categorias
    })

}



export {
    borrarCagetoria,
    actualizarCategoria,
    crearCategoria,
    obtenerCategoria,
    obtenerCategoriaID
}