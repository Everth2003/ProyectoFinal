
import { Injectable } from '@angular/core';


import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ObjetoService {

  private baseUrl: string = 'http://localhost:8080/objeto';

  constructor(private http: HttpClient) { }

  // Metodo para listgar Objetos
  getObjeto(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/listar`)
  }

  // Método para eliminar un objeto por su ID
  eliminarObjeto(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/eliminar/${id}`);
  }

  // Método para crear un nuevo objeto
  crearObjeto(objeto: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/crear`, objeto);
  }


  actualizarObjeto(id: number, objeto: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/editar/${id}`, objeto);
  }

}
