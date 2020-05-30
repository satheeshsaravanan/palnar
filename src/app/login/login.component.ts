import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../services/navbar.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  UserCredentialsCheck = {
    userName: 'palnar',
    password: 'password'
  }
 isValidCredentials = false;
  
 
  isLoggedIn = false;

  loginForm: FormGroup;
  isSubmitted  =  false;

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder, private navbarService: NavbarService) { 
    this.navbarService.getLoginStatus().subscribe(status => this.isLoggedIn = status);
  }
 
  ngOnInit() {
    this.loginForm  =  this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
  });
  }

  get formControls() { return this.loginForm.controls; }
 
  loginUser() {
    this.navbarService.updateNavAfterAuth('user');
    this.navbarService.updateLoginStatus(true);
  }
 
  loginAdmin() {
    this.navbarService.updateNavAfterAuth('admin');
    this.navbarService.updateLoginStatus(true);
  }

  login(){
    this.isSubmitted = true;
    if(this.loginForm.invalid){
      return;
    }
    if(this.loginForm.value.userName === this.UserCredentialsCheck.userName 
      && this.loginForm.value.password === this.UserCredentialsCheck.password) {
        this.authService.login(this.loginForm.value);
        this.navbarService.updateLoginStatus(true);
        this.router.navigateByUrl('/home');
      } else {
        this.isValidCredentials = true;
      }
    
  }
}
