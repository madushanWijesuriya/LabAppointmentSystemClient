import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { ODataParams } from '../models/ODataParams';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService extends BaseService {
  create(data: any): Observable<any> {
    return this.http.post<string>(`${this.apiUrl}/Appointments`, data, {
      headers: this.requestHeaders(),
    });
  }

  getAll(role = 'Admin', oDataParams?: ODataParams): Observable<any> {
    return this.http.get<string>(`${this.apiUrl}/Appointments/${role}`, {
      headers: this.requestHeaders(),
      params: this.getParams(oDataParams),
    });
  }

  update(id: string, data: any): Observable<any> {
    return this.http.put<string>(`${this.apiUrl}/Appointments/${id}`, data, {
      headers: this.requestHeaders(),
    });
  }

  assignTest(data: any): Observable<any> {
    return this.http.post<string>(`${this.apiUrl}/Appointments/Tests`, data, {
      headers: this.requestHeaders(),
    });
  }
}
