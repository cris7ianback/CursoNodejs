import pkg from 'mongoose';

const { Schema, model } = pkg 

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es Obligatorio']
    },
    correo: {
        type: String,
        required: [true, ' El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'El password es Obligatorio']
    },

    img: {
        type: String,
    },

    rol: {
        type: String,
        required: true,
        emun: [' ADMIN_ROLE', 'USER_ROLE']
    },

    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }

});

export default model('Usuario', UsuarioSchema);
