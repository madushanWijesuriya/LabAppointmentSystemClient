import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { NotificationService } from '../../../../../services/notification.service';
import { AppointmentService } from '../../../../../services/appointment.service';
import { Userservice } from '../../../../../services/user.service';
@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.scss',
})
export class UserCreateComponent implements OnInit {
  inputForm!: FormGroup;
  userRoles = ['Patient', 'Technicians', 'Receptions']; // Define role values separately
  selectedRole!: string; // Variable to hold the selected role

  constructor(
    public dialogRef: MatDialogRef<UserCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: Userservice,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private notificationService: NotificationService
  ) {
    this.inputForm = this.fb.group({
      userName: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      phoneNumber: [null, Validators.required],
      nic: [null, Validators.required],
      name: [null, Validators.required],
      address: [null, Validators.required],
      gender: ['Male', Validators.required],
      password: [
        null,
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
          ),
        ],
      ],
      role: [null, Validators.required],
    });
  }
  ngOnInit(): void {}
  onSubmit() {
    if (this.inputForm.valid) {
      const formData = this.inputForm.value;

      const sub =
        formData.role === 'Technicians'
          ? this.userService.create(formData, formData.role)
          : this.userService.create(formData, formData.role);

      sub.subscribe((resonse) => {
        this.notificationService.showSuccess('User created');
        this.dialogRef.close(true);
      });
    }
  }
}
