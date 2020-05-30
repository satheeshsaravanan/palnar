import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserComponent } from '../user/user.component';
import { AdminComponent } from '../admin/admin.component';
import { LoginComponent } from '../login/login.component';
import { NavbarService } from '../services/navbar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  links: Array<{ text: string, path: string }>;
  isLoggedIn = false;
 
  constructor(private router: Router, private navbarService: NavbarService) {
    this.router.config.unshift(
      { path: 'login', component: LoginComponent },
      { path: 'user', component: UserComponent },
      { path: 'admin', component: AdminComponent },
    );
  }
 
  ngOnInit() {
    this.links = this.navbarService.getLinks();
    this.navbarService.getLoginStatus().subscribe(status => this.isLoggedIn = status);
  }
}
