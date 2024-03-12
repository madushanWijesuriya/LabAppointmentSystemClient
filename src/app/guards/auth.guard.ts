import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    let isExpired = false;
    this.authService.isTokenExpired().subscribe(
      (token) => {
        isExpired = token;
      },
      (err) => {
        this.authService.clearToken();
        this.router.navigate(['/login']);
      }
    );

    if (!isExpired) {
      return true;
    }

    this.authService.clearToken();
    this.router.navigate(['/login']);
    return false;
  }
}
