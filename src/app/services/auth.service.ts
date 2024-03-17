import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TOKEN_KEY } from '../constants/global-constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService {
  constructor(private jwtHelper: JwtHelperService) {
    super();
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  isTokenExpired(): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/Auth/CheckToken`, {
      headers: this.requestHeaders(),
    });
  }

  getRolesFromToken(): string {
    const token = this.getToken();

    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);

      return (
        decodedToken[
          'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
        ] || ''
      );
    }

    return '';
  }

  hasRole(role: string[]): boolean {
    const userRoles = this.getRolesFromToken();
    return role.includes(userRoles);
  }

  login(data: any): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/Auth/Login`, data);
  }

  register(data: any): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/Auth/Register`, data);
  }
}
