import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7228/api';
  private http = inject(HttpClient);
  private localStorageService = inject(LocalStorageService);

  private getHeaders(): HttpHeaders {
    const token = this.localStorageService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  login(data: any): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/Auth/Login`, data)
  }
}
