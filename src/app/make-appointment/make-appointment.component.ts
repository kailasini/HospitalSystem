
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-make-appointment',
  templateUrl: './make-appointment.component.html',
  styleUrls: ['./make-appointment.component.css']
})
export class MakeAppointmentComponent {
  currentDate: string;
  appointment = {
    patientEmail: localStorage.getItem('email') || '',
    doctorEmail: '',
    date: '',
    time: '',
    reason: ''
  };

  submitted = false;

  constructor(private http: HttpClient, private router: Router) {
    this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
  }

  submitAppointment() {
    this.submitted = true;
    if (this.appointment.doctorEmail && this.appointment.patientEmail && this.appointment.date && this.appointment.time && this.appointment.reason) {
      this.checkAvailability(
        this.appointment.doctorEmail,
        this.appointment.date,
        this.appointment.time
      );
    }
  }

  checkAvailability(doctorEmail: string, date: string, time: string) {
    this.http.post<any>('http://localhost:3000/checkAvailability', { doctorEmail, date, time })
      .subscribe(response => {
        if (response.message === 'Doctor is available.') {
          alert("Doctor available")
          this.saveAppointment(
            this.appointment.patientEmail,
            this.appointment.doctorEmail,
            this.appointment.date,
            this.appointment.time,
            this.appointment.reason
          );
        }else if(response.message=='Invalid doctor.'){
            alert('Doctor email is invalid')
        } 
        else if(response.message==='Doctor not available at the selected date.'){
          alert('The selected date slot is not available. Please choose a different date.');

        }else{
          alert('The selected time slot is not available. Please choose a different time.');
        }
      }, error => {
        console.error('Error:', error);
      });
  }

  saveAppointment(patientEmail: string, doctorEmail: string, date: string, time: string, reason: string) {
    this.http.post<any>('http://localhost:3000/saveAppointment', { patientEmail, doctorEmail, date, time, reason })
      .subscribe(res => {
        alert('Appointment confirmed');
      }, error => {
        console.error('Error:', error);
      });
  }
}
