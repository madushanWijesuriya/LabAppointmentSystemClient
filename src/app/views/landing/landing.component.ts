import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
})
export class LandingComponent {
  title = 'lab-appointment-client';
  role = signal('');
  private authService = inject(AuthService);
  private router = inject(Router);
  constructor() {}

  ngOnInit() {
    this.role.set(this.authService.getRolesFromToken());

    if (this.role() === 'Patient') {
      this.router.navigate(['patient/home']);
    } else if (this.role()) {
      this.router.navigate(['staff/appointments']);
    }
  }
}
