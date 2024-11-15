import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstudianteService } from '../../../services/estudiante.service';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mostrar-estudiantes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mostrar-estudiantes.component.html',
  styleUrls: ['./mostrar-estudiantes.component.scss']
})
export class MostrarEstudiantesComponent implements OnInit {
  estudiantes: any[] = [];
  estudianteForm: FormGroup;
 
  constructor(
    private estudiantesService: EstudianteService,
    private fb: FormBuilder,
   
  ) {
    this.estudianteForm = this.fb.group({
      documento: ['', Validators.required],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      genero: ['', Validators.required],
      carrera: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.obtenerEstudiantes();

  }

  obtenerEstudiantes() {
    this.estudiantesService.getEstudiantes().subscribe(
      (data) => {
        if (data && Array.isArray(data.estudiante)) {
          this.estudiantes = data.estudiante;
          Swal.fire({
            title: 'Estudiantes cargados',
            text: 'La lista de estudiantes se ha cargado correctamente.',
            icon: 'success',
            confirmButtonText: 'OK'
          });
        } else {
          console.error('La respuesta no contiene un array de estudiantes:', data);
          this.estudiantes = [];
          Swal.fire({
            title: 'Advertencia',
            text: 'La respuesta no contiene datos válidos.',
            icon: 'warning',
            confirmButtonText: 'Entendido'
          });
        }
      },
      (error) => {
        console.error('Error al obtener los estudiantes', error);
        Swal.fire({
          title: 'Error',
          text: 'Ocurrió un error al obtener la lista de estudiantes.',
          icon: 'error',
          confirmButtonText: 'Intentar nuevamente'
        });
      }
    );
  }

  abrirModalCrearEstudiante() {
    this.estudianteForm.reset();
    Swal.fire({
      title: 'Crear Estudiante',
      html: `<form id="estudianteForm" class="form-group">
              <input type="text" id="documento" class="swal2-input" placeholder="Documento" required>
              <input type="text" id="nombres" class="swal2-input" placeholder="Nombres" required>
              <input type="text" id="apellidos" class="swal2-input" placeholder="Apellidos" required>
              <input type="email" id="email" class="swal2-input" placeholder="Correo Electrónico" required>
              <input type="text" id="telefono" class="swal2-input" placeholder="Teléfono" required>
              <select id="genero" class="swal2-input">
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
              </select>
              <input type="text" id="carrera" class="swal2-input" placeholder="Carrera" required>
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
        const carrera = (document.getElementById('carrera') as HTMLInputElement).value;

        if (!documento || !nombres || !apellidos || !email || !telefono || !genero || !carrera) {
          Swal.showValidationMessage('Por favor completa todos los campos');
          return;
        }
        return { documento, nombres, apellidos, email, telefono, genero, carrera };
      }
    }).then((resultado) => {
      if (resultado.isConfirmed) {
        this.crearEstudiante(resultado.value);
      }
    });
  }

  crearEstudiante(estudianteData: any) {
    this.estudiantesService.crearEstudiante(estudianteData).subscribe({
      next: (response) => {
        this.obtenerEstudiantes();
        Swal.fire('Creado', 'El estudiante ha sido creado exitosamente.', 'success');
      },
      error: (error) => {
        console.error('Error al crear estudiante', error);
        Swal.fire('Error', 'No se pudo crear el estudiante.', 'error');
      }
    });
  }

  confirmDelete(estudianteId: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el estudiante de forma permanente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.estudiantesService.eliminarEstudiante(estudianteId).subscribe(
          () => {
            this.estudiantes = this.estudiantes.filter(est => est.id !== estudianteId);
            Swal.fire('Eliminado', 'El estudiante ha sido eliminado.', 'success');
          },
          (error) => {
            console.error('Error al eliminar el estudiante', error);
            Swal.fire('Error', 'No se pudo eliminar el estudiante.', 'error');
          }
        );
      }
    });
  }

  abrirModalActualizarEstudiante(estudiante: any) {
    Swal.fire({
      title: 'Actualizar Estudiante',
      html: `<form id="estudianteForm" class="form-group">
              <input type="text" id="documento" class="swal2-input" placeholder="Documento" value="${estudiante.persona?.documento}" required>
              <input type="text" id="nombres" class="swal2-input" placeholder="Nombres" value="${estudiante.persona?.nombres}" required>
              <input type="text" id="apellidos" class="swal2-input" placeholder="Apellidos" value="${estudiante.persona?.apellidos}" required>
              <input type="email" id="email" class="swal2-input" placeholder="Correo Electrónico" value="${estudiante.persona?.email}" required>
              <input type="text" id="telefono" class="swal2-input" placeholder="Teléfono" value="${estudiante.persona?.telefono}" required>
              <select id="genero" class="swal2-input">
                <option value="Masculino" ${estudiante.genero === 'Masculino' ? 'selected' : ''}>Masculino</option>
                <option value="Femenino" ${estudiante.genero === 'Femenino' ? 'selected' : ''}>Femenino</option>
              </select>
              <input type="text" id="carrera" class="swal2-input" placeholder="Carrera" value="${estudiante.carrera}" required>
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
        const carrera = (document.getElementById('carrera') as HTMLInputElement).value;

        return { id: estudiante.id, documento, nombres, apellidos, email, telefono, genero, carrera };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.actualizarEstudiante(result.value);
      }
    });
  }

  actualizarEstudiante(estudianteData: any) {
    this.estudiantesService.actualizarEstudiante(estudianteData.id, estudianteData).subscribe({
      next: (respuesta) => {
        this.obtenerEstudiantes();
        Swal.fire('Actualizado', 'El estudiante ha sido actualizado exitosamente.', 'success');
      },
      error: (error) => {
        console.error('Error al actualizar el estudiante', error);
        Swal.fire('Error', 'No se pudo actualizar el estudiante.', 'error');
      }
    });
  }
}
