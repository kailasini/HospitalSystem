import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css'
})
export class AdminPageComponent {
  adminEmail: String = ''
  ngOnInit(): void {
    this.getUserInfo();
  }

  getUserInfo() {
    this.adminEmail = localStorage.getItem('email') || '';
  }
}
