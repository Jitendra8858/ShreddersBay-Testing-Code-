import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-home',
  templateUrl: './customer-home.page.html',
  styleUrls: ['./customer-home.page.scss'],
})
export class CustomerHomePage implements OnInit {
 public tabs = [
    { title: 'Home', url: 'customer', icon: 'home' },
    { title: 'Scrap Items', url: 'scrap-items', icon: 'mail' },
    { title: 'My Bookings', url: 'my-booking', icon: 'book' },
    { title: 'My Cart', url: 'my-cart', icon: 'cart' },
    { title: 'My Account', url: 'my-account', icon: 'person' },
  ];
  constructor() { }

  ngOnInit() {
  }

}
