
import 'dotenv/config';
import { inquirerMenu, leerInput, listarLugares, pausa } from "./helpers/inquirer.js";
import { Busquedas } from './models/busquedas.js';


const main = async () => {
    const busquedas = new Busquedas();
    let opt;

    do {
        opt = await inquirerMenu();

        switch (opt) {
            case 1:
                //Mostrar mensaje
                const termino = await leerInput('Ciudad: ');

                //buscar el lugar 
                const lugares = await busquedas.ciudad(termino);

                //seleccionar el lugar
                const id = await listarLugares(lugares);
                if( id === '0') continue;

                const lugarSel = lugares.find(l => l.id === id);

                //guardar en DB
                busquedas.agregarHistorial(lugarSel.nombre);

                // Clima
                const clima = await busquedas.climaLugar(lugarSel.lat, lugarSel.lng)                

                //mostrar resultados
                console.clear();
                console.log('\nInformació de la ciudad \n'.green);
                console.log('Ciudad:', lugarSel.nombre.green);
                console.log('Lat:', lugarSel.lat);
                console.log('Lng:', lugarSel.lng);
                console.log('Temperatura:', clima.temp );
                console.log('Minima:'.blue, clima.min);
                console.log('Maxima:'.red,clima.max);
                console.log('Como está el clima:',clima.desc.green);
                break;

                case 2:
                    busquedas.historialCapitalizado.forEach( (lugar, i) =>{
                        const idx =`${i + 1}.`.green;
                        console.log( `${ idx } ${ lugar } `);
                    })
                    break;
        }

        if (opt !== 0) await pausa();

    } while (opt !== 0)

}



main();