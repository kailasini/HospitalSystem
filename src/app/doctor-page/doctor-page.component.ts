import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-doctor-page',
  templateUrl: './doctor-page.component.html',
  styleUrl: './doctor-page.component.css'
})
export class DoctorPageComponent {
  showAppointments: boolean = false;
  appointments: any[] = [];
  doctorEmail: String='';
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.getUserInfo();
  }

  getUserInfo() {
    this.doctorEmail = localStorage.getItem('email') || '';
  }

  viewAppointments() {
    // Replace 'doctor_email' with the actual email of the doctor
    const doctorEmail = localStorage.getItem('email') || '';
    this.http.post<any[]>('http://localhost:3000/appointments', { doctorEmail }).subscribe((appointments) => {
      this.appointments = appointments;
      this.showAppointments = true;
    });
  }
}
