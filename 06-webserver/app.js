import express from 'express'
const app = express();
const port = 8080;

import path from 'path';
const __dirname = path.resolve();

//Servir contenido estático
app.use(express.static('public'));

app.get('/generic', (req, res) => {
    res.sendFile(__dirname + '/public/generic.html');
});

app.get('/elements', (req, res) => {
    res.sendFile(__dirname + '/public/elements.html');
});

app.get('/hola-mundo', (req, res) => {
    res.send('Hola mundo en su respectiva ruta');
});

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/404.html');
});

app.listen(port, () => {
    console.log(`Aplicación corriendo en http://localhost:${port}`)
})
