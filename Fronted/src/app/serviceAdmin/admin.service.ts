import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AdminService {


  private baseUrl: string = 'http://localhost:8080/admin';
  constructor(private http: HttpClient) { }

  // Método para obtener la listar Admin

  getAdmin(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/listar`)
  }

   // Método para eliminar un admin por su ID
   eliminarAdmin(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/eliminar/${id}`);
  }


   // Método para crear un nuevo Admin
   crearAdmin(admin: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/crear`, admin);
  }

  
  actualizarAdmin(id: number, admin: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/editar/${id}`, admin);
  }

}
