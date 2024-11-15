
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { UsuarioService } from '../../../serviceUsuario/usuario.service';
@Component({
  selector: 'app-mostrar-usuarios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mostrar-usuarios.component.html',
  styleUrl: './mostrar-usuarios.component.scss'
})
export class MostrarUsuariosComponent implements OnInit {


  usuarios: any[] = [];
  usuarioForm: FormGroup;


  constructor(
    private usuariosService: UsuarioService,
    private fb: FormBuilder
  ) {
    this.usuarioForm = this.fb.group({
      documento: ['', Validators.required],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      genero: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    this.obtenerUsuarios()
  }

  obtenerUsuarios() {

    this.usuariosService.getUsuarios().subscribe(
      
      (data) => {
        console.log('Datos recibidos:', data); // Verifica la estructura completa
        if (data && Array.isArray(data.usuarios)) {
          this.usuarios = data.usuarios;
          Swal.fire({
            title: 'Usuarios cargados',
            text: 'La lista de usuarios se ha cargado correctamente.',
            icon: 'success',
            confirmButtonText: 'OK'
          });
        } else {
          console.error('La respuesta no contiene un array de usuarios:', data);
          this.usuarios = [];
          Swal.fire({
            title: 'Advertencia',
            text: 'La respuesta no contiene datos válidos.',
            icon: 'warning',
            confirmButtonText: 'Entendido'
          });
        }
      },
      (error) => {
        console.error('Error al obtener los usuarios', error);
        Swal.fire({
          title: 'Error',
          text: 'Ocurrió un error al obtener la lista de usuarios.',
          icon: 'error',
          confirmButtonText: 'Intentar nuevamente'
        });
      }
    );
  }


  // Función para abrir el modal de creación de estudiantes
  abrirModalCrearUsuarios() {
    this.usuarioForm.reset();
    Swal.fire({
      title: 'Crear Usuario',
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
            <input type="text" id="username" class="swal2-input" placeholder="Nombre de Usuario" required>
           <input type="text" id="password" class="swal2-input" placeholder="Contraseña" required>
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
        const username = (document.getElementById('username') as HTMLInputElement).value;
        const password = (document.getElementById('password') as HTMLInputElement).value;



        if (!documento || !nombres || !apellidos || !email || !telefono || !genero || !username || !password) {
          Swal.showValidationMessage(`Por favor completa todos los campos`);
          return;
        }

        return { documento, nombres, apellidos, email, telefono, genero, username, password };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.crearUsuarios(result.value);
      }
    });
  }


  // Función para crear un estudiante
  crearUsuarios(usuarioData: any) {
    this.usuariosService.crearUsuarios(usuarioData).subscribe({
      next: (response) => {
        this.obtenerUsuarios();
        Swal.fire('Creado', 'El  usuario ha sido creado exitosamente.', 'success');
      },
      error: (error) => {
        console.error('Error al crear el usuario', error);
        Swal.fire('Error', 'No se pudo crear el usuario.', 'error');
      }
    });
  }

  // Función para confirmar y eliminar un estudiante
  confirmDelete(usuarioId: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el usuario de forma permanente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuariosService.eliminarUsuarios(usuarioId).subscribe(
          () => {
            this.usuarios= this.usuarios.filter(est => est.id !== usuarioId);
            Swal.fire('Eliminado', 'El usuario ha sido eliminado.', 'success');
          },
          (error) => {
            console.error('Error al eliminar el usuario', error);
            Swal.fire('Error', 'No se pudo eliminar el usuario.', 'error');
          }
        );
      }
    });
  }

  abrirModalActualizarUsuario(usuario: any) {
    // Aquí configuras el formulario o modal de actualización con los datos del estudiante seleccionado

    Swal.fire({
      title: 'Actualizar Usuario',
      html: `
        <form id="estudianteForm" class="form-group">
          <input type="text" id="documento" class="swal2-input" placeholder="Documento" value="${usuario.usuario?.documento}" required>
          <input type="text" id="nombres" class="swal2-input" placeholder="Nombres" value="${usuario.usuario?.nombres}" required>
          <input type="text" id="apellidos" class="swal2-input" placeholder="Apellidos" value="${usuario.usuario?.apellidos}" required>
          <input type="email" id="email" class="swal2-input" placeholder="Correo Electrónico" value="${usuario.usuario?.email}" required>
          <input type="text" id="telefono" class="swal2-input" placeholder="Teléfono" value="${usuario.usuario?.telefono}" required>
          <select id="genero" class="swal2-input">
            <option value="Masculino" ${usuario.usuario.genero === 'Masculino' ? 'selected' : ''}>Masculino</option>
            <option value="Femenino" ${usuario.usuario.genero === 'Femenino' ? 'selected' : ''}>Femenino</option>
          </select>
          <input type="text" id="username" class="swal2-input" placeholder="Usuario" value="${usuario.username}" required>
          <input type="text" id="password" class="swal2-input" placeholder="Contraseña" value="${usuario.username}" required>
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
        const username = (document.getElementById('username') as HTMLInputElement).value;
        const password = (document.getElementById('password') as HTMLInputElement).value;
        return { id: usuario.id, documento, nombres, apellidos, email, telefono, genero, username, password};
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.actualizarUsuario(result.value);
      }
    });
  }




  // Función para actualizar el estudiante
  actualizarUsuario(usuarioData: any) {
    this.usuariosService.actualizarUsuarios(usuarioData.id, usuarioData).subscribe({
      next: (response) => {
        this.obtenerUsuarios();
        Swal.fire('Actualizado', 'El usuario ha sido actualizado exitosamente.', 'success');
      },
      error: (error) => {
        console.error('Error al actualizar el usuario', error);
        Swal.fire('Error', 'No se pudo actualizar el usuario.', 'error');
      }
    });
  }

}
