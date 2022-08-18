import colors from 'colors';
import {
    leerInput,
    inquirerMenu,
    pausa
} from './helpers/inquirer.js';
import { Tarea } from './models/tarea.js';
import { Tareas } from './models/tareas.js';


const main = async () => {

    let opt = '';
    const tareas = new Tareas();

    do {
        // IMPRIMIR MENÚ
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                const desc = await leerInput('Descripción:');
                tareas.crearTarea(desc);
                break;

            case '2':
                console.log(tareas.listadoArr);
                break;
        }
        await pausa();

    } while (opt !== '0');
};

main();