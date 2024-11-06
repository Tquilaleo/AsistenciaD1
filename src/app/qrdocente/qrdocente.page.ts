import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConsumoApiService } from '../service/consumoapi.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-qrdocente',
  templateUrl: './qrdocente.page.html',
  styleUrls: ['./qrdocente.page.scss'],
})
export class QrdocentePage implements OnInit {

  nombre: string = '';
  codigo: string = '';
  seccion: string = '';
  id_profesor: string = '';
  id_curso: string = '';

  alumnos: any[] = [];

  constructor(
    private router: Router,
    private consumoapi: ConsumoApiService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.nombre = navigation.extras.state['nombre'];
      this.codigo = navigation.extras.state['codigo'];
      this.seccion = navigation.extras.state['seccion'];
      this.id_profesor = String(navigation.extras.state['id_profesor']); 
      this.id_curso = String(navigation.extras.state['id_curso']);
      this.mostrarAlumno()
    }
  }

  public mostrarAlumno() {
    this.consumoapi.ObtenerAlumnos(parseInt(this.id_profesor), parseInt(this.id_curso)).subscribe((res: any) => {
      this.alumnos = res;
    }); 
  }

  salirAplicacion() {
    this.router.navigate(['/login']);
  }

  Volver() {
    this.router.navigate(['/docente']);
  }

}
