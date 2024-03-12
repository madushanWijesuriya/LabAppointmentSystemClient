import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  protected apiUrl = 'https://localhost:7228/api';
  protected http = inject(HttpClient);
  private localStorageService = inject(LocalStorageService);

  protected requestHeaders = (): HttpHeaders => {
    const token = this.localStorageService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  };

  clearToken(): void {
    localStorage.removeItem('token');
  }

  protected getParams = (oDataParams: any) => {
    let params = new HttpParams();
    if (oDataParams) {
      for (const key in oDataParams) {
        if (oDataParams.hasOwnProperty(key)) {
          params = params.set(`$${key}`, oDataParams[key].toString());
        }
      }
    }
    return params;
  };
}
