import { inquirerMenu, leerInput, pausa } from "./helpers/inquirer.js";


const main = async () => {

    let opt;

    do {
        opt = await inquirerMenu();
        console.log({ opt });

        if (opt !== 0) await pausa();

    } while (opt !== 0) await pausa();



}



main();