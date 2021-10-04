import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: 'customer', icon: 'home' },
    { title: 'My Booking', url: 'my-booking', icon: 'book' },
    { title: 'My Dues', url: '', icon: 'bookmark' },
    { title: 'Dues Payment Report', url: 'orders', icon: 'bookmark' },
    { title: 'My Account', url: 'my-account', icon: 'person' },
    { title: 'Notifications', url: 'notifications', icon: 'mail' },
    { title: 'FAQ', url: 'faqs', icon: 'bookmarks' },
    { title: 'Terms & Conditions', url: 'terms-conditions', icon: 'settings' },
    { title: 'Contact Us', url: 'contact-us', icon: 'power' },
    { title: 'Logout', url: 'logout', icon: 'power' }
  ];

  public tabs = [
    { title: 'Home', url: 'customer', icon: 'home' },
    { title: 'Scrap Items', url: 'scrap-items', icon: 'mail' },
    { title: 'My Bookings', url: 'my-booking', icon: 'book' },
    { title: 'My Cart', url: 'my-cart', icon: 'cart' },
    { title: 'My Account', url: 'my-account', icon: 'person' },
  ];

  constructor(
  ) {}
}
