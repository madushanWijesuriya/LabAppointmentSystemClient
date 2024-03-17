import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { ODataParams } from '../models/ODataParams';

@Injectable({
  providedIn: 'root',
})
export class AppointmentTestService extends BaseService {
  getAll(id: any, oDataParams?: ODataParams): Observable<any> {
    return this.http.get<string>(`${this.apiUrl}/AppointmentTests/${id}`, {
      headers: this.requestHeaders(),
      params: this.getParams(oDataParams),
    });
  }

  update(id: string, data: any): Observable<any> {
    return this.http.put<string>(
      `${this.apiUrl}/AppointmentTests/${id}`,
      data,
      {
        headers: this.requestHeaders(),
      }
    );
  }
}
