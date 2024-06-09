import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      loginAs: ['patient', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { loginAs, email, password } = this.loginForm.value;
      if (loginAs === 'patient') {
        this.http.post<any>('http://localhost:3000/patient-login', { email, password })
          .subscribe(response => {
            console.log(response);
            if (response.success) {
              localStorage.setItem('email', email);
              alert('Login successful!');
              this.router.navigate(['/patient-page']);
            } else if(response.message == 'Invalid email'){
              alert('Invalid Email id. Try again');
            }else{
              alert('Invalid Password. Try again');
            }
          }, error => {
            console.error(error);
            alert('Error while logging in. Please try again.');
          });
      } else if (loginAs === 'admin') {
        this.http.post<any>('http://localhost:3000/admin-login', { email, password })
          .subscribe(response => {
            console.log(response);
            if (response.success) {
              localStorage.setItem('email', email);
              alert('Login successful!');
              this.router.navigate(['/admin-page']);
            } else {
              alert('Invalid email or password');
            }
          }, error => {
            console.error(error);
            alert('Error while logging in. Please try again.');
          });
      } else if (loginAs === 'doctor') {
        this.http.post<any>('http://localhost:3000/doctor-login', { email, password })
          .subscribe(response => {
            console.log(response);
            if (response.success) {
              localStorage.setItem('email', email);
              alert('Login successful!');
              this.router.navigate(['/doctor-page']);
            } else {
              alert('Invalid email or password');
            }
          }, error => {
            console.error(error);
            alert('Error while logging in. Please try again.');
          });
      }
    } else {
      alert('Invalid email or password');
    }
  }
}
