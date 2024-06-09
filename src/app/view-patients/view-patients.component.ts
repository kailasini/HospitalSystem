// src/app/view-patients/view-patients.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-view-patients',
  templateUrl: './view-patients.component.html',
  styleUrls: ['./view-patients.component.css']
})
export class ViewPatientsComponent implements OnInit {
  patients: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getPatients();
  }

  getPatients() {
    this.http.get<any>('http://localhost:3000/api/patients').subscribe(
      (response) => {
        this.patients = response;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
