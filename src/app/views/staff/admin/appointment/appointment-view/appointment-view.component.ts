import { Component, Inject, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppointmentService } from '../../../../../services/appointment.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { NotificationService } from '../../../../../services/notification.service';
import { AuthService } from '../../../../../services/auth.service';

export enum AppointmentStatus {
  Created,
  Verified,
  Paid,
  CheckIn,
  TestAssigned,
  TestCompleted,
  ResultOut,
  Completed,
  Cancel,
}

export enum Status {
  Inactive,
  Active,
  Remove,
}
@Component({
  selector: 'app-appointment-view',
  templateUrl: './appointment-view.component.html',
  styleUrl: './appointment-view.component.scss',
})
export class AppointmentViewComponent implements OnInit {
  appointmentForm!: FormGroup;
  timeSlots = signal<string[]>([]);
  // minDate: string;
  role: string;

  private service = inject(AppointmentService);
  private fb = inject(FormBuilder);
  private datePipe = inject(DatePipe);
  private notificationService = inject(NotificationService);

  statuses = Object.values(Status).filter((value) => typeof value === 'string');
  appointmentStatuses = Object.values(AppointmentStatus)
    .filter((value) => typeof value === 'string')
    .map((x) => ({ value: x, isDisabled: false }));

  constructor(
    private auth: AuthService,
    public dialogRef: MatDialogRef<AppointmentViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.role = auth.getRolesFromToken();
    // this.minDate = this.calculateMinDate();
    this.setupTimeSlots();

    this.appointmentForm = this.fb.group({
      date: ['', Validators.required],
      time: ['', Validators.required],
      workFlow: [0, Validators.required],
      status: [0, Validators.required],
    });

    if (this.role === 'Reception' && this.data?.appointment?.workFlow !== 0) {
      // this.appointmentForm.get('time')?.disable();
      this.appointmentForm.get('date')?.disable();
    } else if (this.role === 'Technician') {
      // this.appointmentForm.get('time')?.disable();
      this.appointmentForm.get('date')?.disable();
      this.appointmentStatuses = this.appointmentStatuses.map((x) => {
        return {
          ...x,
          isDisabled: x.value !== 'TestCompleted' && x.value !== 'TestAssigned',
        };
      });
    }
  }

  ngOnInit(): void {
    const appointment = this.data.appointment;

    const formattedTime = this.convertTimeFormat(appointment.formatedTime);

    this.appointmentForm.patchValue({
      date: appointment.date,
      time: formattedTime,
      workFlow: appointment.workFlow,
      status: appointment.status,
    });
  }

  private calculateMinDate(): string {
    const today = new Date();
    today.setDate(today.getDate() + 3); // Add 3 days
    return this.datePipe.transform(today, 'yyyy-MM-dd')!;
  }

  private setupTimeSlots(): void {
    const startTime = 8;
    const endTime = 18;
    const slots = [];
    for (let i = startTime; i <= endTime; i++) {
      const formattedTime = this.formatTime(i, 0);
      slots.push(formattedTime);
    }

    this.timeSlots.set(slots);
  }

  private formatTime(hour: number, minute: number): string {
    return `${hour.toString().padStart(2, '0')}:${minute
      .toString()
      .padStart(2, '0')}`;
  }

  private timeStringToDouble(timeString: string): number {
    console.log(timeString);

    const [hours, minutes] = timeString.split(':').map(Number);
    return hours + minutes / 60;
  }

  private convertTimeFormat(timeString: string): string {
    const [hours, minutes] = timeString.split('.').map(Number);
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}`;
  }

  onSubmit() {
    if (this.appointmentForm.valid) {
      const formData = this.appointmentForm.value;
      const selectedTime = this.timeStringToDouble(formData.time);
      formData.time = selectedTime;
      const date = new Date(this.appointmentForm.get('date')?.value);

      formData.time = selectedTime;
      let localDate = new Date(
        date?.getTime() - date?.getTimezoneOffset() * 60000
      );
      formData.date = localDate;
      this.service
        .update(this.data.appointment.id, formData)
        .subscribe((response) => {
          this.notificationService.showSuccess('Appointment updated');
          this.dialogRef.close(true);
        });
    }
  }
}
