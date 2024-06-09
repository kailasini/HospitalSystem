import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-patient-page',
  templateUrl: './patient-page.component.html',
  styleUrls: ['./patient-page.component.css']
})
export class PatientPageComponent implements OnInit {
  patientEmail: string = '';
  prescribedMedicines: any[] = [];
  showTable: boolean = false;
  ngOnInit(): void {
    this.getUserInfo();
  }

  constructor(private http: HttpClient) { }

  getUserInfo() {
    this.patientEmail = localStorage.getItem('email') || '';
  }
  viewMedicines() {
    this.http.post<any>('http://localhost:3000/viewMedicines', { patientEmail: this.patientEmail })
      .subscribe(response => {
        this.prescribedMedicines = response.prescribedMedicines;
        this.showTable = true;
      }, error => {
        console.error('Error:', error);
        alert('Failed to fetch prescribed medicines. Please try again.');
      });
  }

}
