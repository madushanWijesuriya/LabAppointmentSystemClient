import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AppointmentTestService } from '../../../../services/appointment-test.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Editor, Validators } from 'ngx-editor';
import { NotificationService } from '../../../../services/notification.service';

@Component({
  selector: 'app-update-appointment-test',
  templateUrl: './update-appointment-test.component.html',
  styleUrl: './update-appointment-test.component.scss',
})
export class UpdateAppointmentTestComponent {
  appointmentTestForm!: FormGroup;
  editor!: Editor;
  private notificationService = inject(NotificationService);

  constructor(
    public dialogRef: MatDialogRef<UpdateAppointmentTestComponent>,
    private service: AppointmentTestService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.editor = new Editor();
    this.appointmentTestForm = this.fb.group({
      appointmentId: [data.appointmentId],
      testId: [data.testId],
      result: new FormControl(JSON.parse(data.result), [Validators.required()]),
    });
  }

  onSubmit(): void {
    if (this.appointmentTestForm.valid) {
      var payload = {
        ...this.appointmentTestForm.value,
        result: JSON.stringify(this.appointmentTestForm.get('result')?.value),
      };

      this.service
        .update(this.appointmentTestForm.get('appointmentId')?.value, payload)
        .subscribe((response) => {
          this.notificationService.showSuccess('Appointment test updated');
          this.dialogRef.close(true);
        });
    }
  }
}
