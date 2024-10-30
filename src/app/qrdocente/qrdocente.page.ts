import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-qrdocente',
  templateUrl: './qrdocente.page.html',
  styleUrls: ['./qrdocente.page.scss'],
})
export class QrdocentePage implements OnInit {

  nombre: string = '';
  codigo: string = '';
  seccion: string = '';

  constructor(private router: Router) { }

  ngOnInit() {



    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.nombre = navigation.extras.state['nombre'];
      this.codigo = navigation.extras.state['codigo'];
      this.seccion = navigation.extras.state['seccion'];
    }
  }

  salirAplicacion() {
    this.router.navigate(['/login']);
  }

  Volver() {
    this.router.navigate(['/docente']);
  }
}