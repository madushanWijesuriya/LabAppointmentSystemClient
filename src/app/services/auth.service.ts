import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://localhost:7228/api';
  private http = inject(HttpClient);
  private localStorageService = inject(LocalStorageService);

  private getHeaders(): HttpHeaders {
    const token = this.localStorageService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isTokenExpired(): Observable<boolean> {
    const headers = this.getHeaders();

    return this.http.get<boolean>(`${this.apiUrl}/Auth/CheckToken`, {
      headers,
    });
  }

  clearToken(): void {
    localStorage.removeItem('token');
  }

  login(data: any): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/Auth/Login`, data);
  }

  register(data: any): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/Auth/Register`, data);
  }
}
