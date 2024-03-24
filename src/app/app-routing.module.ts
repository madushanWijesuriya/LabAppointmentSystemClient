import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { HomeComponent } from './views/patient/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { staffRoutes } from './views/staff/staff.routing';
import { LayoutComponent } from './views/staff/layout/layout.component';
import { PatientLayoutComponent } from './views/patient/patient-layout/patient-layout.component';
import { AppComponent } from './app.component';
import { LandingComponent } from './views/landing/landing.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'patient',
    component: PatientLayoutComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRole: 'Patient' },
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
    ],
  },

  {
    path: 'staff',
    component: LayoutComponent,
    children: [...staffRoutes],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
