

import { Injectable } from '@angular/core';


import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  private baseUrl: string = 'http://localhost:8080/registros';

  constructor(private http: HttpClient) { }

  // Metodo para listgar Objetos
  getRegistroIngreso(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/listar`)
  }

  // Método para eliminar un objeto por su ID
  eliminarRegistroIngreso(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/eliminar/${id}`);
  }

  // Método para crear un nuevo objeto
  crearRegistroIngreso(registro: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/crear`, registro);
  }


  actualizarRegistroIngreso(id: number, registro: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/editar/${id}`, registro);
  }

}
