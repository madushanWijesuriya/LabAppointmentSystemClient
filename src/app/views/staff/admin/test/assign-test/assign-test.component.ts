import { Component, Inject, OnInit, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TestService } from '../../../../../services/test.service';
import { AppointmentService } from '../../../../../services/appointment.service';
import { NotificationService } from '../../../../../services/notification.service';
import { AuthService } from '../../../../../services/auth.service';

@Component({
  selector: 'app-assign-test',
  templateUrl: './assign-test.component.html',
  styleUrls: ['./assign-test.component.scss'],
})
export class AssignTestComponent {
  appointmentForm!: FormGroup;
  tests = signal([] as any);
  testIds: number[] = [1, 2, 3];
  private notificationService = inject(NotificationService);
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AssignTestComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private testService: TestService,
    private appointmentService: AppointmentService
  ) {

    testService.getAll().subscribe((res: any) => {
      this.tests.set(res);
    });
    const testIds = data.appointmentTests.map((test: any) => test.testId);


    this.appointmentForm = this.fb.group({
      testIds: [testIds, Validators.required],
      appointmentId: [data.id, Validators.required],
    });
  }

  onSubmit(): void {
    if (this.appointmentForm.valid) {
      const formData = this.appointmentForm.value;
      this.appointmentService.assignTest(formData).subscribe((data) => {
        this.notificationService.showSuccess('Tests Assigned Successfully');
        this.dialogRef.close(true);
      });
    }
  }
}
