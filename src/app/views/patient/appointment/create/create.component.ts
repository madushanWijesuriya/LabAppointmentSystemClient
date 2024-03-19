import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppointmentService } from '../../../../services/appointment.service';
import { NotificationService } from '../../../../services/notification.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
})
export class CreateComponent {
  appointmentForm: FormGroup;
  timeSlots: string[] = [];
  minDate: string;
  private service = inject(AppointmentService);
  private fb = inject(FormBuilder);
  private datePipe = inject(DatePipe);
  private notificationService = inject(NotificationService);

  constructor(public dialogRef: MatDialogRef<CreateComponent>) {
    this.minDate = this.calculateMinDate();
    this.setupTimeSlots();

    this.appointmentForm = this.fb.group({
      date: ['', Validators.required],
      time: ['', Validators.required],
      workFlow: [0, Validators.required],
      status: [0, Validators.required],
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.appointmentForm.valid) {
      const formData = this.appointmentForm.value;
      const selectedTime = this.timeStringToDouble(formData.time);
      const date = new Date(this.appointmentForm.get('date')?.value);
      formData.time = selectedTime;
      let localDate = new Date(
        date.getTime() - date.getTimezoneOffset() * 60000
      );
      formData.date = localDate;
      this.service.create(formData).subscribe((response) => {
        this.notificationService.showSuccess('Appointment created');
        this.dialogRef.close(true);
      });
    }
  }

  private calculateMinDate(): string {
    const today = new Date();
    today.setDate(today.getDate() + 3); // Add 3 days
    return this.datePipe.transform(today, 'yyyy-MM-dd')!;
  }

  private setupTimeSlots(): void {
    const startTime = 8;
    const endTime = 18;
    for (let i = startTime; i <= endTime; i++) {
      const formattedTime = this.formatTime(i, 0);
      this.timeSlots.push(formattedTime);
    }
  }

  private formatTime(hour: number, minute: number): string {
    return `${hour.toString().padStart(2, '0')}:${minute
      .toString()
      .padStart(2, '0')}`;
  }

  private timeStringToDouble(timeString: string): number {
    const [hours, minutes] = timeString.split(':').map(Number);
    return hours + minutes / 60;
  }
}
