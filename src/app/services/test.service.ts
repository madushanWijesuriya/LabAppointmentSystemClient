import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { ODataParams } from '../models/ODataParams';

@Injectable({
  providedIn: 'root',
})
export class TestService extends BaseService {
  create(data: any, path: string): Observable<any> {
    return this.http.post<string>(`${this.apiUrl}/${path}`, data, {
      headers: this.requestHeaders(),
    });
  }

  getAll(oDataParams?: ODataParams): Observable<any> {
    return this.http.get<string>(`${this.apiUrl}/Tests`, {
      headers: this.requestHeaders(),
      params: this.getParams(oDataParams),
    });
  }

  update(id: string, data: any): Observable<any> {
    return this.http.put<string>(`${this.apiUrl}/Users/${id}`, data, {
      headers: this.requestHeaders(),
    });
  }
}
