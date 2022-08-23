import express from 'express'
import hbs from 'hbs';
import path from 'path';

import * as dotenv from 'dotenv';
dotenv.config();

const app = express();
const __dirname = path.resolve();
const port = process.env.PORT;

//Handlebar
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');


//Servir contenido estático
app.use(express.static('public'));

// app.get('/', (req, res) => {
//     res.render('home', {
//         nombre: 'Cristian Virago',
//         titulo: 'Curso de Node'
//     });
// });

// app.get('/generic', (req, res) => {
//     res.render('generic', {
//         nombre: 'Cristian Virago',
//         titulo: 'Curso de Node'
//     });
// });

// app.get('/elements', (req, res) => {
//     res.render('elements', {
//         nombre: 'Cristian Virago',
//         titulo: 'Curso de Node'
//     });
// });

app.get('*', (req, res) => {
    res.sendFile( __dirname + '/public/index.html')
});


app.listen(port, () => {
    console.log(`Aplicación corriendo en http://localhost:${port}`)
})
