import colors from 'colors';
import { confirmar, inquirerMenu, mostrarListadoCheckList, leerInput, listadoTareasBorrar, pausa } from './helpers/inquirer.js';
import { guardarDB, leerDb } from './helpers/guardarArchivo.js';
import { Tarea } from './models/tarea.js';
import { Tareas } from './models/tareas.js';


const main = async () => {

    let opt = '';
    const tareas = new Tareas();
    const tareasDb = leerDb();

    if (tareasDb) { // cargar tareas
        tareas.cargarTareasFromArray(tareasDb)
    }

    do {
        // IMPRIMIR MENÚ
        opt = await inquirerMenu();

        switch (opt) {
            case '1':  // CREAR TAREA 
                const desc = await leerInput('Descripción:');
                tareas.crearTarea(desc);
                break;

            case '2': // LISTAR TODO 
                tareas.listadoCompleto();
                break;

            case '3': // LISTAR COMPLETADOS
                tareas.listarPendientesCompletadas(true);
                break;

            case '4': // LISTAR PENDIENTE
                tareas.listarPendientesCompletadas(false);
                break;

            case '5': // COMPLETADO O PENDIENTE
                const ids = await mostrarListadoCheckList(tareas.listadoArr);
                tareas.toogleCompletadas(ids);
                break;

            case '6': //  BORRAR
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if (id !== '0') {
                    const ok = confirmar('¿Está seguro?');

                    if (ok) {
                        tareas.borrarTarea(id);
                        console.log('Tarea Borrada');
                    }
                }


                break;
        }
        guardarDB(tareas.listadoArr);
        await pausa();

    } while (opt !== '0');
};

main();