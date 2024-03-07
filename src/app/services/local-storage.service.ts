import { Injectable } from '@angular/core';
const tokenKey = 'labAppointmentToken';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  getToken(): string | null {
    return localStorage.getItem(tokenKey);
  }

  setToken(token: string): void {
    localStorage.setItem(tokenKey, token);
  }

  removeToken(): void {
    localStorage.removeItem(tokenKey);
  }
}
