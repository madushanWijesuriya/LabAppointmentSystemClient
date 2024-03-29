import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private localStorageService = inject(LocalStorageService);
  private notificationService = inject(NotificationService);
  @Output() loginSuccess: EventEmitter<void> = new EventEmitter<void>();

  ngOnInit(): void {
    this.initLoginForm();
  }

  navigateReg() {
    this.router.navigate(['/register']);
  }
  private initLoginForm(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  login(): void {
    if (this.form.valid) {
      const { username, password } = this.form.value;
      this.authService.login(this.form.value).subscribe(
        (response: any) => {
          this.localStorageService.setToken(response?.token);
          this.router.navigate(['/']);
        },
        (error) => {
          if (error.status === 401) {
            this.notificationService.showError('Invalid username or password');
          }
        }
      );
    }
  }
}
