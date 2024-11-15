import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistroService } from '../../../serviceRegistro/registro.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-mostrar-registroingreso',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mostrar-registroingreso.component.html',
  styleUrl: './mostrar-registroingreso.component.scss'
})
export class MostrarRegistroingresoComponent implements OnInit {



  registros: any[] = []
  registroForm: FormGroup;

  constructor(
    private registroService: RegistroService,
    private fb: FormBuilder,

  ) 
  
  
  {
    this.registroForm = this.fb.group({
      fechaIngreso: ['', Validators.required],
      fechaSalida: ['', Validators.required],
      idEstudiante: ['', Validators.required],
      idVigilante: ['', Validators.required],
      idObjeto: ['', [Validators.required]],
      idPuntoControl: ['', Validators.required],

    });
  }

  ngOnInit(): void {
    this.obtenerResgistroIngreso();

  }



  obtenerResgistroIngreso() {
    this.registroService.getRegistroIngreso().subscribe(
      (data) => {
        if (data && Array.isArray(data.registros)) {
          this.registros = data.registros;
          Swal.fire({
            title: 'Registros cargados',
            text: 'La lista de registro se ha cargado correctamente.',
            icon: 'success',
            confirmButtonText: 'OK'
          });
        } else {
          console.error('La respuesta no contiene un array de estudiantes:', data);
          this.registros = [];
          Swal.fire({
            title: 'Advertencia',
            text: 'La respuesta no contiene datos válidos.',
            icon: 'warning',
            confirmButtonText: 'Entendido'
          });
        }
      },
      (error) => {
        console.error('Error al obtener los registros', error);
        Swal.fire({
          title: 'Error',
          text: 'Ocurrió un error al obtener la lista de registros.',
          icon: 'error',
          confirmButtonText: 'Intentar nuevamente'
        });
      }
    );
  }



  abrirModalCrearRegistro() {
    this.registroForm.reset();
    Swal.fire({
      title: 'Crear Registros',
      html: `<form id="estudianteForm" class="form-group">
              <input type="text" id="fechaIngreso" class="swal2-input" placeholder="Fecha Ingreso" required>
              <input type="text" id="fechaSalida" class="swal2-input" placeholder="Fecha Salida" required>
              <input type="text" id="idEstudiante" class="swal2-input" placeholder="Id Estudiante" required>
              <input type="text" id="idVigilante" class="swal2-input" placeholder="Id Vigilante" required>
              <input type="text" id="idObjeto" class="swal2-input" placeholder="Id Equipo" required>
             <input type="text" id="idPuntoControl" class="swal2-input" placeholder="Id Punto Control" required>
            </form>`,
      showCancelButton: true,
      confirmButtonText: 'Crear',
      focusConfirm: false,
      preConfirm: () => {
        const fechaIngreso = (document.getElementById('fechaIngreso') as HTMLInputElement).value;
        const fechaSalida = (document.getElementById('fechaSalida') as HTMLInputElement).value;
        const idEstudiante = (document.getElementById('idEstudiante') as HTMLInputElement).value;
        const idVigilante = (document.getElementById('idVigilante') as HTMLInputElement).value;
        const idObjeto = (document.getElementById('idObjeto') as HTMLInputElement).value;
        const idPuntoControl = (document.getElementById('idPuntoControl') as HTMLSelectElement).value;


        if (!fechaIngreso || !fechaSalida || !idEstudiante || !idVigilante || !idObjeto || !idPuntoControl) {
          Swal.showValidationMessage('Por favor completa todos los campos');
          return;
        }
        return { fechaIngreso, fechaSalida, idEstudiante, idVigilante, idObjeto, idPuntoControl };
      }
    }).then((resultado) => {
      if (resultado.isConfirmed) {
        this.crearRegistro(resultado.value);
      }
    });
  }


  crearRegistro(registroData: any) {
    this.registroService.crearRegistroIngreso(registroData).subscribe({
      next: (response) => {
        this.obtenerResgistroIngreso();
        Swal.fire('Creado', 'El registro ha sido creado exitosamente.', 'success');
      },
      error: (error) => {
        console.error('Error al crear el registro', error);
        Swal.fire('Error', 'No se pudo crear el registro.', 'error');
      }
    });
  }


  confirmDelete(registroId: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el registro de forma permanente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.registroService.eliminarRegistroIngreso(registroId).subscribe(
          () => {
            this.registros = this.registros.filter(est => est.id !== registroId);
            Swal.fire('Eliminado', 'El registro ha sido eliminado.', 'success');
          },
          (error) => {
            console.error('Error al eliminar el registro', error);
            Swal.fire('Error', 'No se pudo eliminar el registro.', 'error');
          }
        );
      }
    });
  }



  abrirModalActualizarRegistro(registro: any) {
    Swal.fire({
      title: 'Actualizar Registro',
      html: `
        <form id="registroForm" class="form-group">
          <input type="text" id="fechaIngreso" class="swal2-input" placeholder="Fecha Ingreso" value="${registro.fechaIngreso || ''}" required>
          <input type="text" id="fechaSalida" class="swal2-input" placeholder="Fecha Salida" value="${registro.fechaSalida || ''}" required>
          <input type="text" id="idEstudiante" class="swal2-input" placeholder="Id Estudiante" value="${registro.Estudiante.id || ''}" required>
          <input type="text" id="idVigilante" class="swal2-input" placeholder="Id Vigilante" value="${registro.Vigilante.id || ''}" required>
          <input type="text" id="idObjeto" class="swal2-input" placeholder="Id Equipo" value="${registro.Objeto.id || ''}" required>
          <input type="text" id="idPuntoControl" class="swal2-input" placeholder="Id Punto Control" value="${registro.puntoControl.id || ''}" required>
        </form>`,
      showCancelButton: true,
      confirmButtonText: 'Actualizar',
      preConfirm: () => {
        const fechaIngreso = (document.getElementById('fechaIngreso') as HTMLInputElement).value;
        const fechaSalida = (document.getElementById('fechaSalida') as HTMLInputElement).value;
        const idEstudiante = (document.getElementById('idEstudiante') as HTMLInputElement).value;
        const idVigilante = (document.getElementById('idVigilante') as HTMLInputElement).value;
        const idObjeto = (document.getElementById('idObjeto') as HTMLInputElement).value;
        const idPuntoControl = (document.getElementById('idPuntoControl') as HTMLInputElement).value;
  
        return { id: registro.id, fechaIngreso, fechaSalida, idEstudiante, idVigilante, idObjeto, idPuntoControl };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.actualizarRegistro(result.value);
      }
    });
  }
  

  actualizarRegistro(registroData: any) {
    this.registroService.actualizarRegistroIngreso(registroData.id, registroData).subscribe({
      next: (respuesta) => {
        this.obtenerResgistroIngreso();
        Swal.fire('Actualizado', 'El registro ha sido actualizado exitosamente.', 'success');
      },
      error: (error) => {
        console.error('Error al actualizar el registro', error);
        Swal.fire('Error', 'No se pudo actualizar el registro.', 'error');
      }
    });
  }
}
