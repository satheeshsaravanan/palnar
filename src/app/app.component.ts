import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NavbarService } from './services/navbar.service';
import { BnNgIdleService } from 'bn-ng-idle';
import { HomeComponent } from './home/home.component';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 
  links: Array<{ text: string, path: string }>;
  isLoggedIn = false;
  
  constructor(private bnIdle: BnNgIdleService, private router: Router, private navbarService: NavbarService) { 
    this.router.config.unshift(
      { path: 'login', component: LoginComponent },
      { path: 'home', component:  HomeComponent},
    );
    this.bnIdle.startWatching(500).subscribe((sessionExpired) => {
      if(sessionExpired) {
        this.navbarService.updateLoginStatus(false);
        this.navbarService.getLoginStatus().subscribe(status => this.isLoggedIn = status);
      }
    })
  }
  
  ngOnInit() {
    this.links = this.navbarService.getLinks();
    this.navbarService.getLoginStatus().subscribe(status => this.isLoggedIn = status);
  }
 
  logout() {
    this.navbarService.updateLoginStatus(false);
    this.router.navigate(['login']);
    this.navbarService.getLoginStatus().subscribe(status => this.isLoggedIn = status);
  }
}