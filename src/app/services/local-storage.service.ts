import { Injectable } from '@angular/core';
import { TOKEN_KEY } from '../constants/global-constants';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  setToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  }

  removeToken(): void {
    localStorage.removeItem(TOKEN_KEY);
  }
}
