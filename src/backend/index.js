const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = 3000; // Cambia el puerto si es necesario

app.use(cors());
app.use(express.json());

// Cargar datos desde el archivo JSON
let data = fs.readFileSync('./data/asistenciaDuoc.json');
let { profesores, usuarios } = JSON.parse(data);

// Ruta de login
app.post('/login', (req, res) => {

  console.log("Datos recibidos:", req.body);

  const { user, password } = req.body;
  const usuario = usuarios.find(u => 
    u.nombre.toLowerCase().trim() === user.toLowerCase().trim() &&
    u.password === password);

  console.log("Usuario encontrado:", usuario); 
  
  if (usuario) {
    return res.json({
      id: usuario.id,
      nombre: usuario.nombre,
      user: usuario.user,
      correo: usuario.correo,
      tipoPerfil: usuario.perfil
    });
  } else {
    return res.status(401).json({ message: 'Credenciales incorrectas' });
  }
});

// Obtener profesores
app.get('/profesores', (req, res) => {
  return res.json(profesores);
});

// Obtener cursos de un profesor
app.get('/profesores/:profesorId/cursos', (req, res) => {
  const profesorId = parseInt(req.params.profesorId);
  const profesor = profesores.find(p => p.id === profesorId);

  if (!profesor) {
    return res.status(404).json({ message: 'Profesor no encontrado' });
  }
  return res.json(profesor.cursos);
});

// Obtener alumnos de un curso
app.get('/profesores/:profesorId/cursos/:cursoId/alumnos', (req, res) => {
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

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
