import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService extends BaseService {
  getByAppointmentId(appointmentId: any): Observable<any> {
    return this.http.get<string>(`${this.apiUrl}/Invoice/${appointmentId}`, {
      headers: this.requestHeaders(),
    });
  }

  update(invoice: any): Observable<any> {
    return this.http.put<string>(`${this.apiUrl}/Invoice`, invoice, {
      headers: this.requestHeaders(),
    });
  }
}
