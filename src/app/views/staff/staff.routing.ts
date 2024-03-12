import { Routes } from '@angular/router';
import { AdminListComponent } from './admin/appointment/list/list.component';
import { AuthGuard } from '../../guards/auth.guard';
import { RoleGuard } from '../../guards/role.guard';

export const staffRoutes: Routes = [
  {
    path: 'appointments',
    component: AdminListComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRole: 'Admin' },
  },
];
