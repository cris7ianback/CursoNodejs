import pkg from 'mongoose';

const { Schema, model } = pkg 


const RoleSchema = Schema({
    rol: {
        type: String,
        require: [true, 'El rol es obligatorio']
    }
});

export default model('Role', RoleSchema);