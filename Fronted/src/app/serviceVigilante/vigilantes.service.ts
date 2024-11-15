import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VigilantesService {

  // URL base de la API
  private baseUrl: string = 'http://localhost:8080/vigilantes';

  constructor(private http: HttpClient) { }

  // Método para obtener la listar Vigilantes

  getVigilantes(): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/listar`)
  }

   // Método para eliminar un vigilante por su ID
   eliminarVigilantes(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/eliminar/${id}`);
  }

   // Método para crear un nuevo estudiante
   crearVigilantes(vigilante: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/crear`, vigilante);
  }

  
  actualizarVigilantes(id: number, vigilante: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/editar/${id}`, vigilante);
  }
}
