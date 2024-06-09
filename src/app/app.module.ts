import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RegisterPatientComponent } from './register-patient/register-patient.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { RegisterDoctorComponent } from './register-doctor/register-doctor.component';
import { PatientPageComponent } from './patient-page/patient-page.component';
import { MakeAppointmentComponent } from './make-appointment/make-appointment.component';
import { DoctorPageComponent } from './doctor-page/doctor-page.component';
import { PrescribeMedicineComponent } from './prescribe-medicine/prescribe-medicine.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { BillGenerateComponent } from './generate-bill/generate-bill.component';
import { PaymentComponent } from './payment/payment.component';
import { ViewBillsComponent } from './view-bills/view-bills.component';
import { ViewDoctorComponent } from './view-doctor/view-doctor.component';
import { InactivateDoctorComponent } from './inactivate-doctor/inactivate-doctor.component';
import { ViewPaymentComponent } from './view-payment/view-payment.component';
import { ViewPatientsComponent } from './view-patients/view-patients.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterPatientComponent,
    LoginComponent,
    RegisterDoctorComponent,
    PatientPageComponent,
    MakeAppointmentComponent,
    DoctorPageComponent,
    PrescribeMedicineComponent,
    AdminPageComponent,
    BillGenerateComponent,
    PaymentComponent,
    ViewBillsComponent,
    ViewDoctorComponent,
    InactivateDoctorComponent,
    ViewPaymentComponent,
    ViewPatientsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
