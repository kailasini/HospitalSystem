// src/app/inactivate-doctor/inactivate-doctor.component.ts
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-inactivate-doctor',
  templateUrl: './inactivate-doctor.component.html',
  styleUrls: ['./inactivate-doctor.component.css']
})
export class InactivateDoctorComponent {
  email: string = '';
  message: string = '';

  constructor(private http: HttpClient) {}

  inactivateDoctor() {
    this.http.post<any>('http://localhost:3000/api/inactivate-doctor', { email: this.email }).subscribe(
      (response) => {
        this.message = response.message;
      },
      (error) => {
        console.error(error);
        this.message = 'Error inactivating doctor account.';
      }
    );
  }
}

