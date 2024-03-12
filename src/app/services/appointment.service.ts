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

  getAll(oDataParams?: ODataParams): Observable<any> {
    return this.http.get<string>(`${this.apiUrl}/Appointments`, {
      headers: this.requestHeaders(),
      params: this.getParams(oDataParams),
    });
  }
}
