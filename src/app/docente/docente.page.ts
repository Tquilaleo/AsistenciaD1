import { Component, OnInit } from '@angular/core'; 
import { Router } from '@angular/router';


@Component({
  selector: 'app-docente',
  templateUrl: './docente.page.html',
  styleUrls: ['./docente.page.scss'],
})
export class DocentePage implements OnInit {

  now: Date = new Date();
  nombre: string = '';
  idProfesor: string='';
  fecha: String = this.now.toLocaleString();
  
  cursos: any[] = [];

  constructor(private router: Router) {}



  // Método ngOnInit para obtener datos del estado de navegación
  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.nombre = navigation.extras.state['nombre'];     
    }
  }

  // Función para navegar al detalle de un curso
  verDetalle(curso: any) { 
    this.router.navigate(['/qrdocente'], {
      state: {
        nombre: curso.nombre_curso,
        codigo: curso.codigo,
        seccion: curso.seccion
      }
    });
  }



  // Función para salir de la aplicación y volver al login
  salirAplicacion() {
    this.router.navigate(['/login']);
  }
}
