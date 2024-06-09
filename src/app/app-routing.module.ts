import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterPatientComponent } from './register-patient/register-patient.component';
import { RegisterDoctorComponent } from './register-doctor/register-doctor.component';
import { PatientPageComponent } from './patient-page/patient-page.component';
import { MakeAppointmentComponent } from './make-appointment/make-appointment.component';
import { DoctorPageComponent } from './doctor-page/doctor-page.component';
import { PrescribeMedicineComponent } from './prescribe-medicine/prescribe-medicine.component';
import { BillGenerateComponent } from './generate-bill/generate-bill.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { ViewBillsComponent } from './view-bills/view-bills.component';
import { ViewDoctorComponent } from './view-doctor/view-doctor.component';
import { InactivateDoctorComponent } from './inactivate-doctor/inactivate-doctor.component';
import { ViewPaymentComponent } from './view-payment/view-payment.component';
import { ViewPatientsComponent } from './view-patients/view-patients.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'addpatient',
    component: RegisterPatientComponent
  },
  {
    path: 'adddoctor',
    component: RegisterDoctorComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'patient-page',
    component: PatientPageComponent
  },
  {
    path: 'doctor-page',
    component: DoctorPageComponent
  },
  {
    path: 'admin-page',
    component: AdminPageComponent
  },
  {
    path: 'make-appointment',
    component: MakeAppointmentComponent
  },
  {
    path: 'prescribe-medicine',
    component: PrescribeMedicineComponent
  },
  {
    path: 'bill-generate',
    component: BillGenerateComponent
  },
  {
    path: 'view-bills',
    component: ViewBillsComponent
  },
  {
    path: 'view-doctor',
    component: ViewDoctorComponent
  },
  {
    path: 'inactivate-doctor',
    component: InactivateDoctorComponent
  },
  {
    path: 'view-payment',
    component: ViewPaymentComponent
  },
  {
    path: 'view-patients',
    component: ViewPatientsComponent
  },
  {
    path:'',redirectTo: 'home',pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
