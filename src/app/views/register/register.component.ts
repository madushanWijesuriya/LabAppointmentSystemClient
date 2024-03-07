import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  registrationForm!: FormGroup;
  private authService = inject(AuthService);
  private localStorageService = inject(LocalStorageService);

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
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
      dateOfBirth: [null, Validators.required],
    });
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      this.authService
        .register(this.registrationForm.value)
        .subscribe((response: any) => {
          this.localStorageService.setToken(response?.token);
        });
    }
  }
}
