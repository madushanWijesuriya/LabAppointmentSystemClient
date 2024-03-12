import { Component, inject, signal } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'lab-appointment-client';
  role = signal('');
  private authService = inject(AuthService);
  constructor() {
    this.role.set(this.authService.getRolesFromToken());
  }
}
