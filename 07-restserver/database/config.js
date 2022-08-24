import mongoose from "mongoose";

const dbConnection = async () => {

    try {
        await mongoose.connect(process.env.MONGODB_ATLAS);

        console.log('Conexión exitosa a BD')

    } catch (error) {
        console.log(error)
        throw new Error('Error al iniciar BD')

    }

}


export {
    dbConnection
}