import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ObjetoService } from '../../../serviceObjeto/objeto.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-mostrar-objeto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mostrar-objeto.component.html',
  styleUrl: './mostrar-objeto.component.scss'
})
export class MostrarObjetoComponent implements OnInit {


  objetos: any[] = [];
  objetoForm: FormGroup;

  constructor(
    private objetosService: ObjetoService,
    private fb: FormBuilder
  ) {
    this.objetoForm = this.fb.group({

      nombre: ['', Validators.required],
      marca: ['', Validators.required],
      serial: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    this.obtenerObjeto();
  }

  obtenerObjeto() {

    this.objetosService.getObjeto().subscribe(
      (data) => {

        if (data && Array.isArray(data.objetos)) {
          this.objetos = data.objetos;
          Swal.fire({
            title: 'Equipos cargados',
            text: 'La lista de equipos se ha cargado correctamente.',
            icon: 'success',
            confirmButtonText: 'OK'
          });
        } else {
          console.error('La respuesta no contiene un array de objetos:', data);
          this.objetos = [];
          Swal.fire({
            title: 'Advertencia',
            text: 'La respuesta no contiene datos válidos.',
            icon: 'warning',
            confirmButtonText: 'Entendido'
          });
        }
      },
      (error) => {
        console.error('Error al obtener los equipos', error);
        Swal.fire({
          title: 'Error',
          text: 'Ocurrió un error al obtener la lista de objetos.',
          icon: 'error',
          confirmButtonText: 'Intentar nuevamente'
        });
      }
    );
  }


  // Función para abrir el modal de creación de estudiantes
  abrirModalCrearObjeto() {


    this.objetoForm.reset();
    Swal.fire({
      title: 'Crear Equipo',
      html: `
        <form id="objetoForm" class="form-group">
          <input type="text" id="nombre" class="swal2-input" placeholder="Nombre" required>
          <input type="text" id="marca" class="swal2-input" placeholder="Marca" required>
          <input type="text" id="serial" class="swal2-input" placeholder="Serial" required>
        </form>`,
      showCancelButton: true,
      confirmButtonText: 'Crear',
      focusConfirm: false,
      preConfirm: () => {

        const nombre = (document.getElementById('nombre') as HTMLInputElement).value;
        const marca = (document.getElementById('marca') as HTMLInputElement).value;
        const serial = (document.getElementById('serial') as HTMLInputElement).value;

        if (!nombre || !marca || !serial) {
          Swal.showValidationMessage(`Por favor completa todos los campos`);
          return;
        }

        return { nombre, marca, serial };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.crearObjeto(result.value);
      }
    });
  }




  // Función para crear un estudiante
  crearObjeto(objetoData: any) {
    this.objetosService.crearObjeto(objetoData).subscribe({
      next: (response) => {
        this.obtenerObjeto();
        Swal.fire('Creado', 'El equipo ha sido creado exitosamente.', 'success');
      },
      error: (error) => {
        console.error('Error al crear objeto', error);
        Swal.fire('Error', 'No se pudo crear el objeto', 'error');
      }
    });
  }




  // Función para confirmar y eliminar un estudiante
  confirmDelete(objetoID: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el objeto de forma permanente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.objetosService.eliminarObjeto(objetoID).subscribe(
          () => {
            this.objetos = this.objetos.filter(est => est.id !== objetoID);
            Swal.fire('Eliminado', 'El objeto ha sido eliminado.', 'success');
          },
          (error) => {
            console.error('Error al eliminar el objeto', error);
            Swal.fire('Error', 'No se pudo eliminar el objeto.', 'error');
          }
        );
      }
    });
  }





  abrirModalActualizarObjeto(objeto: any) {
    // Aquí configuras el formulario o modal de actualización con los datos del estudiante seleccionado

    Swal.fire({
      title: 'Actualizar Objeto',
      html: `
        <form id="objetoForm" class="form-group">
          <input type="text" id="nombre" class="swal2-input" placeholder="Nombre" value="${objeto?.nombre}"  required>
          <input type="text" id="marca" class="swal2-input" placeholder="Marca" value="${objeto?.marca}"  required>
          <input type="text" id="serial" class="swal2-input" placeholder="Serial" value="${objeto?.serial}"  required>
        </form>`,


      showCancelButton: true,
      confirmButtonText: 'Actualizar',
      preConfirm: () => {
        const nombre = (document.getElementById('nombre') as HTMLInputElement).value;
        const marca = (document.getElementById('marca') as HTMLInputElement).value;
        const serial = (document.getElementById('serial') as HTMLInputElement).value;

        return { id: objeto.id, nombre,marca, serial};
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.actualizarObjeto(result.value);
      }
    });
  }


  
    // Función para actualizar el estudiante
    actualizarObjeto(objetoData: any) {
      this.objetosService.actualizarObjeto(objetoData.id, objetoData).subscribe({
        next: (response) => {
          this.obtenerObjeto();
          Swal.fire('Actualizado', 'El equipo ha sido actualizado exitosamente.', 'success');
        },
        error: (error) => {
          console.error('Error al actualizar el objeto', error);
          Swal.fire('Error', 'No se pudo actualizar el objeto.', 'error');
        }
      });
    }


}

