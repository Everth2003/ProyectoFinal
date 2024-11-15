import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { VigilantesService } from '../../../serviceVigilante/vigilantes.service';

import { AuthService } from '../../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mostrar-vigilantes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mostrar-vigilantes.component.html',
  styleUrl: './mostrar-vigilantes.component.scss'
})
export class MostrarVigilantesComponent {


  vigilantes: any[] = [];
  vigilanteForm: FormGroup;
  userRole: string = '';
  constructor(
    private vigilanteService: VigilantesService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.vigilanteForm = this.fb.group({
      documento: ['', Validators.required],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      genero: ['', Validators.required],
      fechaTurno: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.obtenerVigilantes();

  }
  // Función para obtener el rol del usuario desde el servicio de autenticación


  obtenerVigilantes() {

    this.vigilanteService.getVigilantes().subscribe(
      (data) => {

        if (data && Array.isArray(data.vigilante)) {
          this.vigilantes = data.vigilante;
          Swal.fire({
            title: 'Vigilantes cargados',
            text: 'La lista de vigilantes se ha cargado correctamente.',
            icon: 'success',
            confirmButtonText: 'OK'
          });
        } else {
          console.error('La respuesta no contiene un array de vigilantes:', data);
          this.vigilantes = [];
          Swal.fire({
            title: 'Advertencia',
            text: 'La respuesta no contiene datos válidos.',
            icon: 'warning',
            confirmButtonText: 'Entendido'
          });
        }
      },
      (error) => {
        console.error('Error al obtener los vigilantes', error);
        Swal.fire({
          title: 'Error',
          text: 'Ocurrió un error al obtener la lista de estudiantes.',
          icon: 'error',
          confirmButtonText: 'Intentar nuevamente'
        });
      }
    );
  }


  // Función para abrir el modal de creación de estudiantes
  abrirModalCrearVigilante() {

    this.vigilanteForm.reset();
    Swal.fire({
      title: 'Crear Vigilante',
      html: `
        <form id="vigilanteForm" class="form-group">
          <input type="text" id="documento" class="swal2-input" placeholder="Documento" required>
          <input type="text" id="nombres" class="swal2-input" placeholder="Nombres" required>
          <input type="text" id="apellidos" class="swal2-input" placeholder="Apellidos" required>
          <input type="email" id="email" class="swal2-input" placeholder="Correo Electrónico" required>
          <input type="text" id="telefono" class="swal2-input" placeholder="Teléfono" required>
          <select id="genero" class="swal2-input">
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
          </select>
          <input type="text" id="fechaTurno" class="swal2-input" placeholder="Fecha Turno" required>
        </form>`,
      showCancelButton: true,
      confirmButtonText: 'Crear',
      focusConfirm: false,
      preConfirm: () => {
        const documento = (document.getElementById('documento') as HTMLInputElement).value;
        const nombres = (document.getElementById('nombres') as HTMLInputElement).value;
        const apellidos = (document.getElementById('apellidos') as HTMLInputElement).value;
        const email = (document.getElementById('email') as HTMLInputElement).value;
        const telefono = (document.getElementById('telefono') as HTMLInputElement).value;
        const genero = (document.getElementById('genero') as HTMLSelectElement).value;
        const fechaTurno = (document.getElementById('fechaTurno') as HTMLInputElement).value;

        if (!documento || !nombres || !apellidos || !email || !telefono || !genero || !fechaTurno) {
          Swal.showValidationMessage(`Por favor completa todos los campos`);
          return;
        }

        return { documento, nombres, apellidos, email, telefono, genero, fechaTurno };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.crearVigilantes(result.value);
      }
    });
  }


  // Función para crear un estudiante
  crearVigilantes(vigilanteData: any) {
    this.vigilanteService.crearVigilantes(vigilanteData).subscribe({
      next: (response) => {
        this.obtenerVigilantes();
        Swal.fire('Creado', 'El vigilante ha sido creado exitosamente.', 'success');
      },
      error: (error) => {
        console.error('Error al crear vigilante', error);
        Swal.fire('Error', 'No se pudo crear el vigilante.', 'error');
      }
    });
  }

  // Función para confirmar y eliminar un estudiante
  confirmDelete(vigilanteId: number): void {

    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el estudiante de forma permanente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.vigilanteService.eliminarVigilantes(vigilanteId).subscribe(
          () => {
            this.vigilantes = this.vigilantes.filter(est => est.id !== vigilanteId);
            Swal.fire('Eliminado', 'El vigilante ha sido eliminado.', 'success');
          },
          (error) => {
            console.error('Error al eliminar el vigilante', error);
            Swal.fire('Error', 'No se pudo eliminar el vigilante.', 'error');
          }
        );
      }
    });
  }


  abrirModalActualizarVigilante(vigilante: any) {

    Swal.fire({
      title: 'Actualizar Vigilante',
      html: `
        <form id="estudianteForm" class="form-group">
          <input type="text" id="documento" class="swal2-input" placeholder="Documento" value="${vigilante.persona?.documento}" required>
          <input type="text" id="nombres" class="swal2-input" placeholder="Nombres" value="${vigilante.persona?.nombres}" required>
          <input type="text" id="apellidos" class="swal2-input" placeholder="Apellidos" value="${vigilante.persona?.apellidos}" required>
          <input type="email" id="email" class="swal2-input" placeholder="Correo Electrónico" value="${vigilante.persona?.email}" required>
          <input type="text" id="telefono" class="swal2-input" placeholder="Teléfono" value="${vigilante.persona?.telefono}" required>
          <select id="genero" class="swal2-input">
            <option value="Masculino" ${vigilante.persona?.genero === 'Masculino' ? 'selected' : ''}>Masculino</option>
            <option value="Femenino" ${vigilante.persona?.genero === 'Femenino' ? 'selected' : ''}>Femenino</option>
          </select>
          <input type="text" id="fechaTurno" class="swal2-input" placeholder="fechaTurno" value="${vigilante.fechaTurno}" required>
        </form>`,


      showCancelButton: true,
      confirmButtonText: 'Actualizar',
      preConfirm: () => {
        const documento = (document.getElementById('documento') as HTMLInputElement).value;
        const nombres = (document.getElementById('nombres') as HTMLInputElement).value;
        const apellidos = (document.getElementById('apellidos') as HTMLInputElement).value;
        const email = (document.getElementById('email') as HTMLInputElement).value;
        const telefono = (document.getElementById('telefono') as HTMLInputElement).value;
        const genero = (document.getElementById('genero') as HTMLSelectElement).value;
        const fechaTurno = (document.getElementById('fechaTurno') as HTMLInputElement).value;

        return { id: vigilante.id, documento, nombres, apellidos, email, telefono, genero, fechaTurno };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.actualizarVigilante(result.value);
      }
    });
  }


  // Función para actualizar el estudiante
  actualizarVigilante(vigilanteData: any) {
    this.vigilanteService.actualizarVigilantes(vigilanteData.id, vigilanteData).subscribe({
      next: (response) => {
        this.obtenerVigilantes();
        Swal.fire('Actualizado', 'El vigilante ha sido actualizado exitosamente.', 'success');
      },
      error: (error) => {
        console.error('Error al actualizar el vigilante', error);
        Swal.fire('Error', 'No se pudo actualizar el vigilante.', 'error');
      }
    });
  }

}
