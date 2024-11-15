import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private apiUrl = 'http://localhost:8080/auth/login';
  private http = inject(HttpClient);

  login(username: string, password: string): Observable<any> {
    return this.http.post(this.apiUrl, { username, password });
  }

  // Guardar token y datos del usuario en localStorage
  saveUserData(token: string, user: { name: string, role: string }): void {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  // Recuperar datos del usuario
  getUserData(): any {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  // Borrar datos del usuario al cerrar sesión
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}
