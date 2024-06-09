// src/app/view-payment/view-payment.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Payment {
  patientEmail: string;
  totalBill: number;
  status: string;
}

@Component({
  selector: 'app-view-payment',
  templateUrl: './view-payment.component.html',
  styleUrls: ['./view-payment.component.css']
})
export class ViewPaymentComponent implements OnInit {
  payments: Payment[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getPayments();
  }

  getPayments() {
    this.http.get<any>('http://localhost:3000/api/payments').subscribe(
      (response) => {
        this.payments = response;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
