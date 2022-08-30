import Role from "../models/role.js";
import Usuario from "../models/usuario.js";

const esRoleValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if ( !existeRol ) {
        throw new Error(`el rol ${rol} no está registrado en la BD`);
    }
}

const esEmailValido = async (correo = '') => {
    const existeEmail = await Usuario.findOne({ correo });
    if ( existeEmail ) {
        throw new Error(`El email: ${correo} ya se encuentra registrado en la BD`);
    }
}

const existeUsuarioPorId = async (id) => {
    //Verificar si el correo existe
    const existeUsuario = await Usuario.findById(id);
    if ( !existeUsuario ) {
        throw new Error(`El id no existe: ${id}`);
    }
}

export {
    esEmailValido,
    esRoleValido,
    existeUsuarioPorId
}