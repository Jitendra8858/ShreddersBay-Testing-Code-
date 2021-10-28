import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: 'customer-home/customer-home/customer', icon: 'home' },
    { title: 'Scrap Items', url: 'customer-home/customer-home/scrap-items', icon: 'mail' },
    { title: 'My Cart', url: 'customer-home/customer-home/my-cart', icon: 'cart' },
    { title: 'My Booking', url: 'customer-home/customer-home/my-booking', icon: 'book' },
    { title: 'My Account', url: 'customer-home/customer-home/my-account', icon: 'person' },
    { title: 'Notifications', url: 'notifications', icon: 'mail' },
    { title: 'Rate the App', url: '#', icon: 'star' },
    { title: 'FAQ', url: 'faqs', icon: 'help' },
    { title: 'Terms & Conditions', url: 'terms-conditions', icon: 'create' },
    { title: 'Contact Us', url: 'contact-us', icon: 'call' },
    { title: 'Logout', url: 'logout', icon: 'power' }
  ];

  constructor(
  ) {}
}
