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
        nombre: 'Carolin'
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

const getEmpleado = (id, callback) => {
    const empleado = empleados.find(e => e.id === id)?.nombre

    if (empleado) {
        callback(null, empleado);
    } else {
        callback(`Empleado con id ${id} no existe`);
    }
}

const getSalario = (id, callback) => {
    const salario = salarios.find(s => s.id === id)?.salario;
    if (salario) {
        callback(null, salario);
    } else {
        callback(`No existe salario para el ${id}`);
    }
}

const id = 3;

getEmpleado(id, (err, empleado) => {
    if (err) {
        console.log('Error!');
        return console.log(err)
    }

    getSalario(id, (err, salario) => {
        if (err) {
            return console.log(err);
        }

        console.log('El Empleado:', empleado, 'tiene un salario de :', salario)
    })

});