const fs = require('fs');
const colors = require('colors')



const crearArchivoTabla = async (base = 5, listar = false, hasta = 10) => {
    try {

        let salida = '';
        let consola = '';

        for (let i = 1; i <= hasta; i++) {

            salida  += `${ base } x ${ i } = ${base * i}\n`;
            consola += `${base} ${'x'.red} ${i} ${'='.green} ${base * i}\n`;
        }

        if (listar) {
            console.log('========================'.green);
            console.log('tabla del: '.green, colors.blue(base));
            console.log('========================'.green);

            console.log(salida);
        }

        fs.writeFileSync(`salida/tabla-${base}.txt`, salida);

        return (`tabla-${base}.txt`);


    } catch (err) {
        throw err

    }
}

module.exports = {
    crearArchivoTabla,

}