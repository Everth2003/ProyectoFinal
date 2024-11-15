import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(AuthService); // Inyectar AuthService
  const router = inject(Router);           // Inyectar Router

  // Obtener el token del localStorage
  const token = localStorage.getItem('token');
  if (!token) {
    // Si no hay token, redirigir al login
    router.navigate(['/login']);
    return false;
  }

  // Obtener los datos del usuario
  const user = authService.getUserData();

  // Obtener los roles permitidos desde la configuración de la ruta
  const expectedRoles = route.data['roles'] as Array<string>;

  if (!user) {
    // Si no hay datos de usuario, redirigir al login
    router.navigate(['/login']);
    return false;
  }
  // Verificar si el rol del usuario coincide con alguno de los roles permitidos
  if (expectedRoles && !expectedRoles.includes(user.rol)) {
    // Si el rol no está permitido, redirigir a una página de acceso denegado
    router.navigate(['home/access-denied']);
    return false;
  }

  // Si el usuario está autenticado y tiene el rol adecuado, permitir el acceso
  return true;
};
