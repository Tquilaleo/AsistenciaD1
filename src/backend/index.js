const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path =require('path');
const jwt = require('jsonwebtoken');


const app = express();
const PORT = 3000; // Cambia el puerto si es necesario

const secretKey = 'una_secret_key'; 
app.use(cors());
app.use(express.json());



//generar token
function generateToken(user) {
  const payload = {
    id_profesor: user.id,
    nombre: user.nombre,
    role: user.role,
    
  };
  return jwt.sign(payload, secretKey, { expiresIn: '1h' });
}

// Ruta para manejar el login
app.post('/login', (req, res) => {
  const { correo, password } = req.body; 

  // Leer el archivo JSON
  const filePath = path.join(__dirname, 'data', 'asistenciaDuoc.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error leyendo el archivo JSON' });
    }

    // Parsear los datos del archivo JSON --> convierte de json a un objeto de javaScript
    const usuarios = JSON.parse(data).usuarios;

    // Buscar el usuario que coincida con el correo y la contraseña
    const user = usuarios.find(u => u.correo === correo && u.password === password);

    if (user) {
      const token = generateToken(user);//se genera un token y devuelve el rol y el nombre del usuario.
      res.json({ token, role: user.role, nombre: user.nombre, id_profesor: user.id  }); 
    } else {
      res.status(401).json({ message: 'Credenciales inválidas' });
    }
  });
});



// Obtener cursos de un profesor
app.get('/profesores/:profesorId/cursos', (req, res) => {

  const filePath = path.join(__dirname, 'data', 'asistenciaDuoc.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error leyendo el archivo JSON' });
    }

    const profesores = JSON.parse(data).profesores; 
    const profesorId = parseInt(req.params.profesorId);
    
    const profesor = profesores.find(p => p.id === profesorId);

    if (!profesor) {
      return res.status(404).json({ message: 'Profesor no encontrado' });
    }
    return res.json(profesor.cursos);
  });
});


//Obtener alumnos de un curso
app.get('/profesores/:profesorId/cursos/:cursoId/alumnos', (req, res) => {
  const filePath = path.join(__dirname, 'data', 'asistenciaDuoc.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error leyendo el archivo JSON' });
    }

    const profesores = JSON.parse(data).profesores; 
    const profesorId = parseInt(req.params.profesorId);
    const cursoId = parseInt(req.params.cursoId);

    const profesor = profesores.find(p => p.id === profesorId);
    if (!profesor) {
      return res.status(404).json({ message: 'Profesor no encontrado' });
    }
    const curso = profesor.cursos.find(c => c.id === cursoId);
    if (!curso) {
      return res.status(404).json({ message: 'Curso no encontrado' });
    }

    return res.json(curso.alumnos);

  });
});




// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});


app.get('/status', (req, res) => {
  res.json({ status: "Running" });
});

//obtener profesores
app.get('/profesores', (req, res) => {
  const filePath = path.join(__dirname, 'data', 'asistenciaDuoc.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
     if (err) {
        return res.status(500).json({ error: 'Error leyendo el archivo JSON' });
     }
     const users = JSON.parse(data).profesores;
     res.json(users);
  });
});






















/*
// Registrar asistencia
app.post('/registrar_asistencia', (req, res) => {
  const { alumno_id, codigo, seccion } = req.body;

  for (let profesor of profesores) {
    for (let curso of profesor.cursos) {
      if (curso.codigo === codigo && curso.seccion === seccion) {
        const alumno = curso.alumnos.find(a => a.id === alumno_id);
        if (alumno) {
          alumno.status = 1; // 1 es para presente
          return res.json({ message: 'Asistencia registrada' });
        }
      }
    }
  }

  return res.status(400).json({ message: 'No se pudo registrar la asistencia' });
});
*/
