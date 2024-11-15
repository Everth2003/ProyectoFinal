
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { PuntocontrolService } from '../../../servicePuntoControl/puntocontrol.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-mostrar-puntocontrol',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mostrar-puntocontrol.component.html',
  styleUrl: './mostrar-puntocontrol.component.scss'
})
export class MostrarPuntocontrolComponent implements OnInit {


  puntos: any[] = [];
  puntosForm: FormGroup;



  constructor(
    private puntosService: PuntocontrolService,
    private fb: FormBuilder
  ) {
    this.puntosForm = this.fb.group({

      nombre: ['', Validators.required],

    });
  }
  ngOnInit(): void {
    this.obtenerPuntoControl();
  }

  obtenerPuntoControl() {

    this.puntosService.getPuntoControl().subscribe(
      (data) => {

        if (data && Array.isArray(data.punto)) {
          this.puntos = data.punto;
          Swal.fire({
            title: 'Punto de control cargados',
            text: 'La lista de punto de control se ha cargado correctamente.',
            icon: 'success',
            confirmButtonText: 'OK'
          });
        } else {
          console.error('La respuesta no contiene un array de objetos:', data);
          this.puntos = [];
          Swal.fire({
            title: 'Advertencia',
            text: 'La respuesta no contiene datos válidos.',
            icon: 'warning',
            confirmButtonText: 'Entendido'
          });
        }
      },
      (error) => {
        console.error('Error al obtener los punto de control', error);
        Swal.fire({
          title: 'Error',
          text: 'Ocurrió un error al obtener la lista de punto de control.',
          icon: 'error',
          confirmButtonText: 'Intentar nuevamente'
        });
      }
    );
  }



  // Función para abrir el modal de creación de estudiantes
  abrirModalCrearObjeto() {


    this.puntosForm.reset();
    Swal.fire({
      title: 'Crear Punto de Control',
      html: `
        <form id="puntoForm" class="form-group">
          <input type="text" id="nombre" class="swal2-input" placeholder="Nombre" required>

        </form>`,
      showCancelButton: true,
      confirmButtonText: 'Crear',
      focusConfirm: false,
      preConfirm: () => {

        const nombre = (document.getElementById('nombre') as HTMLInputElement).value;


        if (!nombre) {
          Swal.showValidationMessage(`Por favor completa todos los campos`);
          return;
        }

        return { nombre };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.crearPuntoControl(result.value);
      }
    });

  }


  // Función para crear un estudiante
  crearPuntoControl(puntoData: any) {
    this.puntosService.crearPuntoControl(puntoData).subscribe({
      next: (response) => {
        this.obtenerPuntoControl();
        Swal.fire('Creado', 'El punto de control ha sido creado exitosamente.', 'success');
      },
      error: (error) => {
        console.error('Error al crear el punto de control', error);
        Swal.fire('Error', 'No se pudo crear el punto de control', 'error');
      }
    });
  }




  // Función para confirmar y eliminar un estudiante
  confirmDelete(puntoID: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el punto de control de forma permanente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.puntosService.eliminarPuntoControl(puntoID).subscribe(
          () => {
            this.puntos = this.puntos.filter(est => est.id !== puntoID);
            Swal.fire('Eliminado', 'El punto de control ha sido eliminado.', 'success');
          },
          (error) => {
            console.error('Error al eliminar el punto de control', error);
            Swal.fire('Error', 'No se pudo eliminar el objeto.', 'error');
          }
        );
      }
    });
  }






  abrirModalActualizarObjeto(punto: any) {
    // Aquí configuras el formulario o modal de actualización con los datos del estudiante seleccionado

    Swal.fire({
      title: 'Actualizar Punto de Control',
      html: `
        <form id="objetoForm" class="form-group">
          <input type="text" id="nombre" class="swal2-input" placeholder="Nombre" value="${punto.nombre}"  required>
        </form>`,

      showCancelButton: true,
      confirmButtonText: 'Actualizar',
      preConfirm: () => {
        const nombre = (document.getElementById('nombre') as HTMLInputElement).value;


        return { id: punto.id, nombre};
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.actualizarPuntoControl(result.value);
      }
    });
  }


  
  
    // Función para actualizar el estudiante
    actualizarPuntoControl(puntoData: any) {
      this.puntosService.actualizarPuntoControl(puntoData.id, puntoData).subscribe({
        next: (response) => {
          this.obtenerPuntoControl();
          Swal.fire('Actualizado', 'El punto de control ha sido actualizado exitosamente.', 'success');
        },
        error: (error) => {
          console.error('Error al actualizar el punto de control', error);
          Swal.fire('Error', 'No se pudo actualizar el punto de control.', 'error');
        }
      });
    }

}
