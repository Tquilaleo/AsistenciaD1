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

  login(user: string, password: string): Observable<any> {
    const body = { user, password };
    return this.http.post(`${this.apiUrl}/login`, body);
  }
}