import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  // URL base de la API
  private baseUrl: string = 'http://localhost:8080/user';

  constructor(private http: HttpClient) { }



  // Método para obtener la listar Usuarios

  getUsuarios(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/listar`)
  }

   // Método para eliminar un usuario por su ID
   eliminarUsuarios(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/eliminar/${id}`);
  }

   // Método para crear un nuevo estudiante
   crearUsuarios(usuario: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/crear`, usuario);
  }

  actualizarUsuarios(id: number, usuario: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/editar/${id}`, usuario);
  }
}
