import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { CommonModule } from '@angular/common';
import { AdminService } from '../../../serviceAdmin/admin.service';
@Component({
  selector: 'app-mostrar-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mostrar-admin.component.html',
  styleUrl: './mostrar-admin.component.scss'
})
export class MostrarAdminComponent implements OnInit {

  admins: any[] = [];
  adminForm: FormGroup;


  constructor(
    private admisService: AdminService,
    private fb: FormBuilder
  ) {
    this.adminForm = this.fb.group({
      documento: ['', Validators.required],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      genero: ['', Validators.required],
      nombreAutorizacion: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.obtenerAdmin();
  }


  obtenerAdmin() {

    this.admisService.getAdmin().subscribe(
      (data) => {

        if (data && Array.isArray(data.admin)) {
          this.admins = data.admin;
          Swal.fire({
            title: 'Administradores cargados',
            text: 'La lista de admin se ha cargado correctamente.',
            icon: 'success',
            confirmButtonText: 'OK'
          });
        } else {
          console.error('La respuesta no contiene un array de admin:', data);
          this.admins = [];
          Swal.fire({
            title: 'Advertencia',
            text: 'La respuesta no contiene datos válidos.',
            icon: 'warning',
            confirmButtonText: 'Entendido'
          });
        }
      },
      (error) => {
        console.error('Error al obtener los Administradores, error');
        Swal.fire({
          title: 'Error',
          text: 'Ocurrió un error al obtener la lista de admin.',
          icon: 'error',
          confirmButtonText: 'Intentar nuevamente'
        });
      }
    );
  }


  
  // Función para abrir el modal de creación de estudiantes
  abrirModalCrearAdmin() {

   
    this.adminForm.reset();
    Swal.fire({
      title: 'Crear Admin',
      html: `
        <form id="estudianteForm" class="form-group">
          <input type="text" id="documento" class="swal2-input" placeholder="Documento" required>
          <input type="text" id="nombres" class="swal2-input" placeholder="Nombres" required>
          <input type="text" id="apellidos" class="swal2-input" placeholder="Apellidos" required>
          <input type="email" id="email" class="swal2-input" placeholder="Correo Electrónico" required>
          <input type="text" id="telefono" class="swal2-input" placeholder="Teléfono" required>
          <select id="genero" class="swal2-input">
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
          </select>
          <input type="text" id="nombreAutorizacion" class="swal2-input" placeholder="Nombre Autorizacion" required>
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
        const nombreAutorizacion = (document.getElementById('nombreAutorizacion') as HTMLInputElement).value;

        if (!documento || !nombres || !apellidos || !email || !telefono || !genero || !nombreAutorizacion) {
          Swal.showValidationMessage(`Por favor completa todos los campos`);
          return;
        }

        return { documento, nombres, apellidos, email, telefono, genero, nombreAutorizacion };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.crearAdmin(result.value);
      }
    });
  }


   // Función para crear un estudiante
   crearAdmin(adminData: any) {
    this.admisService.crearAdmin(adminData).subscribe({
      next: (response) => {
        this.obtenerAdmin();
        Swal.fire('Creado', 'El admin ha sido creado exitosamente.', 'success');
      },
      error: (error) => {
        console.error('Error al crear el admin', error);
        Swal.fire('Error', 'No se pudo crear el admin.', 'error');
      }
    });
  }


   // Función para confirmar y eliminar un estudiante
   confirmDelete(adminId: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el estudiante de forma permanente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.admisService.eliminarAdmin(adminId).subscribe(
          () => {
            this.admins = this.admins.filter(est => est.id !== adminId);
            Swal.fire('Eliminado', 'El admin ha sido eliminado.', 'success');
          },
          (error) => {
            console.error('Error al eliminar el admin', error);
            Swal.fire('Error', 'No se pudo eliminar el admin.', 'error');
          }
        );
      }
    });
  }

  
  abrirModalActualizarAdmin(admin: any) {
    // Aquí configuras el formulario o modal de actualización con los datos del estudiante seleccionado

    Swal.fire({
      title: 'Actualizar Estudiante',
      html: `
        <form id="estudianteForm" class="form-group">
          <input type="text" id="documento" class="swal2-input" placeholder="Documento" value="${admin.persona?.documento}" required>
          <input type="text" id="nombres" class="swal2-input" placeholder="Nombres" value="${admin.persona?.nombres }" required>
          <input type="text" id="apellidos" class="swal2-input" placeholder="Apellidos" value="${admin.persona?.apellidos }" required>
          <input type="email" id="email" class="swal2-input" placeholder="Correo Electrónico" value="${admin.persona?.email }" required>
          <input type="text" id="telefono" class="swal2-input" placeholder="Teléfono" value="${admin.persona?.telefono }" required>
          <select id="genero" class="swal2-input">
            <option value="Masculino" ${admin.persona?.genero === 'Masculino' ? 'selected' : ''}>Masculino</option>
            <option value="Femenino" ${admin.persona?.genero === 'Femenino' ? 'selected' : ''}>Femenino</option>
          </select>
          <input type="text" id="nombreAutorizacion" class="swal2-input" placeholder="Carrera" value="${admin.nombreAutorizacion}" required>
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
        const nombreAutorizacion = (document.getElementById('nombreAutorizacion') as HTMLInputElement).value;
  
        return { id: admin.id, documento, nombres, apellidos, email, telefono, genero, nombreAutorizacion };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.actualizarAdmin(result.value);
      }
    });
  }
  
    
  // Función para actualizar el estudiante
  actualizarAdmin(adminData: any) {
    this.admisService.actualizarAdmin(adminData.id, adminData).subscribe({
      next: (response) => {
        this.obtenerAdmin();
        Swal.fire('Actualizado', 'El admin ha sido actualizado exitosamente.', 'success');
      },
      error: (error) => {
        console.error('Error al actualizar el admin', error);
        Swal.fire('Error', 'No se pudo actualizar el admin.', 'error');
      }
    });
  }



}