const empleados = [
    {
        id: 1,
        nombre: 'Cristian'
    },
    {
        id: 2,
        nombre: 'Janet'
    },
    {
        id: 3,
        nombre: 'Carolina'
    },
];

const salarios = [
    {
        id: 1,
        salario: 1500000
    },
    {
        id: 2,
        salario: 1500000
    },
    {
        id: 3,
        // salario: 1500000
    },
];

const getEmpleado = (id) => {
    const empleado = empleados.find(e => e.id === id)?.nombre

    return new Promise((resolve, reject) => {

        (empleado)
            ? resolve(empleado)
            : reject(`No existe empleado con id ${id}`);
    });
}

const getSalario = (id) => {
    const salario = salarios.find(s => s.id === id)?.salario

    return new Promise((resolve, reject) => {
        (salario)
            ? resolve(salario)
            : reject(`No existe salario para el id ${id}`);
    });

}

const id = 2;
const getInfoUsuario = async (id) => {
    try {
        const empleado = await getEmpleado(id);
        const salario = await getSalario(id);

        return `El salario del empleado: ${empleado} es de: ${salario}`;

    } catch (error) { 
        throw  error;
    }

}

getInfoUsuario(id)
    .then(msg => console.log( msg ))
    .catch(err => console.log ( err ));