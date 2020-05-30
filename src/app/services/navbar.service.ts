import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class NavbarService {
 
  private links = new Array<{ text: string, path: string }>();
  private isLoggedIn = new Subject<boolean>();

  private sideNavRoutingLink = [
    {
      itemId: 0,
      itemLabel: 'Item 1'
    }, {
      itemId: 1,
      itemLabel: 'Item 2'
    },{
      itemId: 2,
      itemLabel: 'Item 3'
    },{
      itemId: 3,
      itemLabel: 'Item 4'
    },{
      itemId: 4,
      itemLabel: 'Item 5'
    }, {
      itemId: 5,
      itemLabel: 'Item 6'
    },{
      itemId: 6,
      itemLabel: 'Item 7'
    },{
      itemId: 7,
      itemLabel: 'Item 8'
    }];
 
  constructor() {
    this.sideNavRoutingLink.forEach(link => {
      this.addItem({ text: link.itemLabel, path: link.itemId });
    })
    this.isLoggedIn.next(false);
  }
 
  getLinks() {
    return this.links;
  }
 
  getLoginStatus() {
    return this.isLoggedIn;
  }
 
  updateLoginStatus(status: boolean) {
    this.isLoggedIn.next(status);
  }
 
  updateNavAfterAuth(role: string): void {
    this.removeItem({ text: 'Login' });
  }
 
  addItem({ text, path }) {
    this.links.push({ text: text, path: path });
  }
 
  removeItem({ text }) {
    this.links.forEach((link, index) => {
      if (link.text === text) {
        this.links.splice(index, 1);
      }
    });
  }
 
  clearAllItems() {
    this.links.length = 0;
  }
}