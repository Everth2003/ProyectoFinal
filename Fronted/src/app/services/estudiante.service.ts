import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Estudiante } from '../models/Estudiante';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {

  // URL base de la API
  private baseUrl: string = 'http://localhost:8080/estudiantes';

  constructor(private http: HttpClient) {}

  // Método para obtener la lista de estudiantes
  getEstudiantes(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/listar`);
  }

  // Método para eliminar un estudiante por su ID
  eliminarEstudiante(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/eliminar/${id}`);
  }

    // Método para crear un nuevo estudiante
    crearEstudiante(estudiante: any): Observable<any> {
      return this.http.post<any>(`${this.baseUrl}/crear`, estudiante);
    }

    actualizarEstudiante(id: number, estudiante: any): Observable<any> {
      return this.http.put<any>(`${this.baseUrl}/editar/${id}`, estudiante);
    }
  
}
