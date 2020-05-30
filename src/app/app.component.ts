import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { NavbarService } from './services/navbar.service';
import { BnNgIdleService } from 'bn-ng-idle';
 
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
      { path: 'user', component: UserComponent },
      { path: 'admin', component: AdminComponent },
    );
    this.bnIdle.startWatching(50).subscribe((sessionExpired) => {
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