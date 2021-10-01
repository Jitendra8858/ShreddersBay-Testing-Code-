import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: 'dealer', icon: 'home' },
    { title: 'My Booking', url: 'all-favorite', icon: 'book' },
    { title: 'My Dues', url: 'recipes', icon: 'bookmark' },
    { title: 'Dues Payment Report', url: 'orders', icon: 'bookmark' },
    { title: 'My Account', url: 'logout', icon: 'person' },
    { title: 'Notifications', url: 'content', icon: 'mail' },
    { title: 'FAQ', url: 'all-favorite', icon: 'bookmarks' },
    { title: 'Terms & Conditions', url: 'recipes', icon: 'settings' },
    { title: 'Contact Us', url: '/folder/Filter', icon: 'power' },
    { title: 'Logout', url: '/folder/Filter', icon: 'power' }
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
