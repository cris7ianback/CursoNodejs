import { response } from "express";
import Producto from "../models/index.js";


// const actualizarProducto = async( req, res = response ) => {

//     const { id } = req.params;
//     const { estado, usuario, ...data } = req.body;


//     if( data.nombre ) {
//         data.nombre  = data.nombre.toUpperCase();
//     }

//     data.usuario = req.usuario.id;

//     const producto = await Producto.Producto.findByIdAndUpdate(id, data, { new: true });

//     res.json( producto );

// }

const actualizarProducto = async (req, res = response) => {

    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;
    console.log(id)
    if (data.nombre) {
        data.nombre = data.nombre.toUpperCase();
    }

    data.usuario = req.usuario._id;

    const productos = await Producto.Producto.findByIdAndUpdate(id, data, { new: true });
    console.log(productos)
    res.json(productos);

}






const borrarProducto = async (req, res = response) => {

    const { id } = req.params;
    const productoBorrado = await Producto.Producto.findOneAndUpdate(id, { estado: false }, { new: true })

    res.json(productoBorrado);

}

// Crear Producto
const crearProducto = async (req, res = response) => {

    const { estado, usuario, ...body } = req.body;

    const productoDB = await Producto.Producto.findOne({ nombre: body.nombre });

    if (productoDB) {
        return res.status(400).json({
            msg: `El producto ${productoDB.nombre}, ya existe`
        });
    }

    // Generar data a Guardar ={
    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id
    }

    const producto = new Producto.Producto(data);

    // Guardar en DB
    await producto.save();

    res.status(201).json(producto)

}


const obtenerProductos = async (req, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [total, producto] = await Promise.all([
        Producto.Producto.countDocuments(query),
        Producto.Producto.find(query)
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre')
            .skip(Number(desde))
            .limit(Number(limite))
    ]);



    res.json({
        total,
        producto
    });
}

const obtenerProducto = async (req, res = response) => {
    const { id } = req.params;

    const producto = await Producto.Producto.findById(id)
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre');
    res.json(producto);

}


export {
    actualizarProducto,
    borrarProducto,
    crearProducto,
    obtenerProductos,
    obtenerProducto
}


