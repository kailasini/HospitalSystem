import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-prescribe-medicine',
  templateUrl: './prescribe-medicine.component.html',
  styleUrls: ['./prescribe-medicine.component.css']
})
export class PrescribeMedicineComponent implements OnInit {

  prescriptionItems: any[] = [{ medicineName: '', quantity: 1 }];
  submitted: boolean = false;
  description: string = '';
  patientEmail: string = '';
  doctorEmail: string = '';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getUserInfo();
  }

  getUserInfo() {
    this.doctorEmail = localStorage.getItem('email') || '';
  }
  submitPrescription() {
    this.submitted = true;
    let isValid = true;
    this.prescriptionItems.forEach(item => {
      if (!item.medicineName || !item.quantity) {
        isValid = false;
      }
    });

    if (!this.description || !this.patientEmail) {
      isValid = false;
    }

    if (isValid) {
      const prescriptionData = {
        medicines: this.prescriptionItems,
        patientEmail: this.patientEmail,
        doctorEmail: this.doctorEmail,
        description: this.description
      };

      this.http.post<any>('http://localhost:3000/prescriptions', prescriptionData)
        .subscribe(response => {
          console.log(response);
          alert('Prescription saved successfully!');
          this.prescriptionItems = [{ medicineName: '', quantity: 1 }];
          this.submitted = false;
        }, error => {
          console.error('Error:', error);
          alert('Failed to save the prescription. Please try again.');
        });
    }
  }

  addMedicine() {
    this.prescriptionItems.push({ medicineName: '', quantity: 1 });
  }
}
