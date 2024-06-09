// src/app/view-doctor/view-doctor.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-view-doctor',
  templateUrl: './view-doctor.component.html',
  styleUrls: ['./view-doctor.component.css']
})
export class ViewDoctorComponent implements OnInit {
  doctors: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getDoctors();
  }

  getDoctors() {
    this.http.get<any>('http://localhost:3000/api/doctors').subscribe(
      (response) => {
        this.doctors = response;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
