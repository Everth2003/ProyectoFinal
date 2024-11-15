import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PuntocontrolService {

  
  // URL base de la API
  private baseUrl: string = 'http://localhost:8080/control';

  constructor(private http: HttpClient) {}

  // Método para obtener la lista de estudiantes
  getPuntoControl(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/listar`);
  }

  // Método para eliminar un estudiante por su ID
  eliminarPuntoControl(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/eliminar/${id}`);
  }

    // Método para crear un nuevo estudiante
    crearPuntoControl(estudiante: any): Observable<any> {
      return this.http.post<any>(`${this.baseUrl}/crear`, estudiante);
    }

    actualizarPuntoControl(id: number, estudiante: any): Observable<any> {
      return this.http.put<any>(`${this.baseUrl}/editar/${id}`, estudiante);
    }
}
