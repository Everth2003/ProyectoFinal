import { Component, inject} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule],
  //providers:[AuthService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  private authService = inject(AuthService);
  private router = inject(Router);
  
  login(): void {
    if(this.username !== '' && this.password !==''){
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        if (response.success) {
           // Guardar el token y los datos del usuario
            this.authService.saveUserData(response.token, response.user);
           //redirigimos al componente home 
            this.router.navigate(['/home/inicio']);
        } 
      },
      error: (error) => {
          // Este bloque se ejecuta si la respuesta tiene un código 4xx o 5xx
          // Verificamos si el backend envió un mensaje de error
          if (error.error && error.error.message) {
            this.errorMessage = error.error.message; // Mostramos el mensaje del backend
          } else {
            this.errorMessage = 'Error de autenticación'; // Mensaje por defecto si no hay uno específico
          }
      }
    });
    }
    else{ this.errorMessage = 'Ingrese Usuario y Password';}

  }

}
