const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(express.static('public')); // Para servir archivos estáticos como HTML, CSS y JS

let participantes = [];
let asignaciones = {};

app.post('/agregar', (req, res) => {
    const { nombre } = req.body;
    if (!participantes.includes(nombre)) {
        participantes.push(nombre);
        res.json({ mensaje: 'Participante agregado' });
    } else {
        res.status(400).json({ mensaje: 'El participante ya está en la lista' });
    }
});

app.post('/asignar', (req, res) => {
    if (participantes.length < 2) {
        return res.status(400).json({ mensaje: 'Se necesitan al menos 2 participantes' });
    }

    let mezclados = [...participantes].sort(() => Math.random() - 0.5);
    
    for (let i = 0; i < mezclados.length; i++) {
        let amigoSecreto = mezclados[(i + 1) % mezclados.length];
        asignaciones[mezclados[i]] = amigoSecreto;
    }

    res.json({ mensaje: 'Asignaciones realizadas' });
});

app.get('/resultado/:nombre', (req, res) => {
    const nombre = req.params.nombre;
    if (asignaciones[nombre]) {
        res.json({ amigoSecreto: asignaciones[nombre] });
    } else {
        res.status(404).json({ mensaje: 'Nombre no encontrado o asignaciones no realizadas' });
    }
});

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
