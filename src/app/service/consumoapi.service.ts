import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
  
}) 
export class ConsumoApiService {

  private apiUrl = 'https://72sks2c2-5000.brs.devtunnels.ms';

  constructor(private http: HttpClient) {}

  public login(correo: string, password: string): Observable<{ token: string, role: string, nombre: string, id_profesor: number }> { 
    const body = { correo, password };
    return this.http.post<{ token: string, role: string, nombre: string, id_profesor: number }>(`${this.apiUrl}/login`, body)
      .pipe(
        map(response => {
          
          return {
            token: response.token,
            role: response.role ,
            nombre: response.nombre,
            id_profesor: response.id_profesor
          };
          
        })
      );
  }

  public Obtenercurso(profesorId: number): Observable<any>{
    return this.http.get(`${this.apiUrl}/profesores/${profesorId}/cursos`);
  }

  public ObtenerAlumnos(profesorId:number, cursoId: number): Observable<any>{
    return this.http.get(`${this.apiUrl}/profesores/${profesorId}/cursos/${cursoId}/alumnos`);
  }
}