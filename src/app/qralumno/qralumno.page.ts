import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-qralumno',
  templateUrl: './qralumno.page.html',
  styleUrls: ['./qralumno.page.scss'],
})
export class QralumnoPage implements OnInit {

  constructor(private router : Router) { }

  salirAplicacion(){

    this.router.navigate(['/login'])
  }

  Volver(){
    this.router.navigate(['/alumno'])
  }

  ngOnInit() {
  }

}
