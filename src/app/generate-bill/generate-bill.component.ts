// src/app/bill-generate/bill-generate.component.ts
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-generate-bill',
  templateUrl: './generate-bill.component.html',
  styleUrls: ['./generate-bill.component.css']
})
export class BillGenerateComponent {
  patientEmail: string = '';
  bill: number = 0;
  

  constructor(private http: HttpClient) {}

  generateBill() {
    this.http.post<any>('http://localhost:3000/api/generatebill', { patientEmail: this.patientEmail }).subscribe(
      (response) => {
        this.bill = response.bill;
        alert("Bill generation successfull")
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
