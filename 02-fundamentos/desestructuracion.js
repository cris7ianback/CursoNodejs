const cristian = {
    nombre: 'Cristian',
    apellido: 'Virago',
    poder: 'Fruta demoniaca de Fuego',
    getNombre() {
        return `${this.nombre} ${this.apellido} ${this.poder}`
    }
}

// const nombre = cristian.nombre;
// const apellido = cristian.apellido;
// const poder =  cristian.poder;

function imprimeHeroe({ nombre, apellido, poder, edad = 0 }) {

    nombre = 'Cristiano'
    console.log(nombre, apellido, poder, edad);
}

// imprimeHeroe(cristian);

const heroes = ['Zoro','Luffy', 'Franky']

// const h1 = heroes[0];
// const h2 = heroes[1];
// const h3 = heroes[2];

const [, , h3] = heroes;

console.log(h3)


