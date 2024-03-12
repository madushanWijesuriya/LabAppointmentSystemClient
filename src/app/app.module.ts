import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './MatModule';
import { RegisterComponent } from './views/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './views/patient/home/home.component';
import { DashboardComponent } from './views/patient/dashboard/dashboard.component';
import { CreateComponent } from './views/patient/appointment/create/create.component';
import { ListComponent } from './views/patient/appointment/list/list.component';
import { DetailsComponent } from './views/patient/appointment/details/details.component';
import { DatePipe } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { EditComponent } from './views/staff/admin/appointment/edit/edit.component';
import { JwtModule } from '@auth0/angular-jwt';
import { AdminListComponent } from './views/staff/admin/appointment/list/list.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    CreateComponent,
    ListComponent,
    DetailsComponent,
    EditComponent,
    AdminListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatTableModule,
    MatIconModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['*'],
      },
    }),
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}

export function tokenGetter() {
  return localStorage.getItem('token');
}
