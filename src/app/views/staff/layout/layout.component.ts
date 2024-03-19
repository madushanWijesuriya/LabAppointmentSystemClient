import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  role = signal('');
  private auth = inject(AuthService);
  private router = inject(Router);
  constructor() {
    this.role.set(this.auth.getRolesFromToken());
  }
  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
