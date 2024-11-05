import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConsumoApiService {

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  login(correo: string, password: string): Observable<{ token: string, role: string, nombre: string }> { // Cambiamos el tipo de retorno
    const body = { correo, password };
    return this.http.post<{ token: string, role: string, nombre: string }>(`${this.apiUrl}/login`, body)
      .pipe(
        map(response => {
          
          return {
            token: response.token,
            role: response.role ,
            nombre: response.nombre 
          };
        })
      );
  }
}