const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const PORT = process.env.PORT || 3001;

// Configuración de la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'cafeData'
});

// Conectar a la base de datos
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database');
});

// Middleware
app.use(cors());
app.use(express.json());

// Ruta para verificar que el servidor está funcionando
app.get('/', (req, res) => {
    res.send({ status: 200, message: 'Server is running' });
});

// Ruta para insertar un nuevo producto
app.post('/producto', (req, res) => {
    const { nombre_producto, descripcion, precio, stock, id_categoria } = req.body;

    // Consulta SQL para insertar el nuevo producto
    const query = 'INSERT INTO producto (nombre_producto, descripcion, precio, stock, id_categoria) VALUES (?, ?, ?, ?, ?)';

    db.query(query, [nombre_producto, descripcion, precio, stock, id_categoria], (err, result) => {
        if (err) {
            console.error('Error al insertar el producto:', err);
            res.status(400).send({ status: 400, message: 'Error al insertar el producto' });
            return;
        }
        res.status(200).send({ status: 200, message: 'Producto insertado con éxito', id: result.insertId });
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
