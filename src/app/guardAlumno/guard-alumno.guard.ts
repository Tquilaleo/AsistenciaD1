import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core'; 
import { Router } from '@angular/router';
import { ServiceguardService } from '../service/serviceguard.service';

export const guardAlumnoGuard: CanActivateFn = (route, state) => {
  const Serviceguard= inject(ServiceguardService);
  const router = inject(Router);

  if (Serviceguard.isLoggedIn()) {
    return true; 
  } else {
    return router.createUrlTree(['/login']); 
  }
};
