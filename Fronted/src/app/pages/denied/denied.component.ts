import { Component, inject } from '@angular/core';
import { RouteConfigLoadEnd, Router } from '@angular/router';

@Component({
  selector: 'app-denied',
  standalone: true,
  imports: [],
  templateUrl: './denied.component.html',
  styleUrl: './denied.component.scss'
})
export class DeniedComponent {

  private router = inject(Router); 

  goToHome() {
    this.router.navigate(['/home']); // Redirige al home o a cualquier otra ruta que desees
  }

}
