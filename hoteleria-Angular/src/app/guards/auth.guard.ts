import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
         if(!this.authService.isLogged()){
            this.authService.logout();
            return false;
        }
        const expectRoles = route.data['roles'];
        if(expectRoles && !this.authService.hasAnyRole(expectRoles)){
            Swal.fire('Acceso denegado',
                `Hola ${this.authService.getUsername()} no tienes acceso a este recurso`,
                'warning');
                return false;
        }
        return true;
    }
}