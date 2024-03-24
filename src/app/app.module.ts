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
import { JwtModule } from '@auth0/angular-jwt';
import { AdminListComponent } from './views/staff/admin/appointment/list/list.component';
import { AppointmentViewComponent } from './views/staff/admin/appointment/appointment-view/appointment-view.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { UserListComponent } from './views/staff/admin/user/user-list/user-list.component';
import { UserCreateComponent } from './views/staff/admin/user/user-create/user-create.component';
import { UserViewComponent } from './views/staff/admin/user/user-view/user-view.component';
import { AssignTestComponent } from './views/staff/admin/test/assign-test/assign-test.component';
import { NgxStripeModule } from 'ngx-stripe';
import { PaymentFormComponent } from './components/payment-form/payment-form.component';
import { ViewAppointmentTestComponent } from './views/staff/technician/view-appointment-test/view-appointment-test.component';
import { UpdateAppointmentTestComponent } from './views/staff/technician/update-appointment-test/update-appointment-test.component';
import { CKEditorModule } from 'ckeditor4-angular';
import { NgxEditorModule } from 'ngx-editor';
import { LayoutComponent } from './views/staff/layout/layout.component';
import { PatientLayoutComponent } from './views/patient/patient-layout/patient-layout.component';
import { LandingComponent } from './views/landing/landing.component';
export const environment = {
  production: false,
  stripe: {
    publicKey:
      'pk_test_51OucOgBoaqreuNETZii1F9MkDkR5wckNFigkYdmIvVflw23JL3qgVvbLGzPXCHVmGqO26pKNzKwpIl2Y1uLGChyn00pUbVWe2g',
  },
};
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    CreateComponent,
    ListComponent,
    DetailsComponent,
    AdminListComponent,
    AppointmentViewComponent,
    UserListComponent,
    UserCreateComponent,
    UserViewComponent,
    AssignTestComponent,
    PaymentFormComponent,
    ViewAppointmentTestComponent,
    UpdateAppointmentTestComponent,
    LayoutComponent,
    PatientLayoutComponent,
    LandingComponent,
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
    MatPaginatorModule,
    MatIconModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['*'],
      },
    }),
    NgxStripeModule.forRoot(environment.stripe.publicKey),
    NgxEditorModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}

export function tokenGetter() {
  return localStorage.getItem('labAppointmentToken');
}
