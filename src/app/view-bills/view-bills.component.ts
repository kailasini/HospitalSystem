// view-bills.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-view-bills',
  templateUrl: './view-bills.component.html',
  styleUrls: ['./view-bills.component.css']
})
export class ViewBillsComponent implements OnInit {
  patientEmail: string = '';
  bills: any[] = [];
  ngOnInit(): void {
    this.getUserInfo();
    this.loadBills();
  }

  constructor(private http: HttpClient) { }

  getUserInfo() {
    this.patientEmail = localStorage.getItem('email') || '';
  }

  loadBills(): void {
    this.http.post<any>('http://localhost:3000/bills', { patientEmail: this.patientEmail })
      .subscribe(response => {
        this.bills = response.bills;
      }, error => {
        console.error('Error:', error);
        alert('Failed to fetch bills. Please try again.');
      });
  }

  makePayment(billId: string) {
    this.http.put<any>('http://localhost:3000/api/bill/' + billId + '/pay', {})
      .subscribe(response => {
        alert("Payment successfull")
        console.log(response.message);
        this.loadBills(); // Refresh bills after payment
      });
  }
}
