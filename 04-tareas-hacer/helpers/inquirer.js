import inquirer from 'inquirer';

import colors from 'colors';

const menuOpts = [
    {
        type: 'list',
        name: 'opcion',
        message: 'Seleccione una opción',
        choices: [

            {
                value: '1',
                name: `${'1.-'.bgGreen} Crear tarea'`
            },
            {
                value: '2',
                name: `${'2.-'.bgGreen} Listar tareas'`
            },
            {
                value: '3',
                name: `${'3.-'.bgGreen} Listar tareas completadas`
            },
            {
                value: '4',
                name: `${'4.-'.bgGreen}'Listar tareas pendientes'`
            },
            {
                value: '5',
                name: `${'5.-'.bgGreen}'Completar tarea(s)`
            },
            {
                value: '6',
                name: `${'6.-'.bgGreen}'Eliminar tarea(s)`
            },
            {
                value: '0',
                name: `${'0.-'.bgGreen}' Salir'`
            }
        ],
    },
];

const inquirerMenu = async () => {
    // console.clear();
    console.log('==========================='.green);
    console.log('   Seleccione una opción'.white);
    console.log('===========================\n'.green);

    const { opcion } = await inquirer.prompt(menuOpts);

    return opcion;
}

const pausa = async () => {

    const question = [{
        type: 'input',
        name: ' enter',
        message: `Presione ${'enter'.green} para continuar`
    }]
    console.log('\n');
    await inquirer.prompt(question);

}

const leerInput = async (message) => {

    const question = [{
        type: 'input',
        name: 'desc',
        message,
        validate(value) {
            if (value.length === 0) {
                return 'Por favor ingrese un valor';
            }
            return true;
        }
    }
    ];
    const { desc } = await inquirer.prompt(question);
    return desc;


}

export {
    leerInput,
    inquirerMenu,
    pausa
};
