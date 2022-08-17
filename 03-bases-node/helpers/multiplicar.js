const fs = require('fs');

const crearArchivoTabla = async (base = 5) => {

    try {


        console.log('========================');
        console.log('tabla del: ', base);
        console.log('========================');

        let salida = '';

        for (let i = 1; i <= 10; i++) {

            salida += `${base} x ${i} = ${base * i}\n`;
        }

        console.log(salida);

        fs.writeFileSync(`tabla-${base}.txt`, salida);

        return (`tabla-${base}.txt`);

    } catch (err) {
        throw err

    }

}

module.exports = {
    crearArchivoTabla
}