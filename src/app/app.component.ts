import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  appPages = [
    { title: 'Home', url: 'customer-home/customer-home/customer', icon: 'home' },
    { title: 'Scrap Items', url: 'customer-home/customer-home/scrap-items', icon: 'mail' },
    { title: 'My Cart', url: 'customer-home/customer-home/my-cart', icon: 'cart' },
    { title: 'My Booking', url: 'customer-home/customer-home/my-booking', icon: 'book' },
    { title: 'My Account', url: 'customer-home/customer-home/my-account', icon: 'person' },
    { title: 'Notifications', url: 'notifications', icon: 'mail' },
    { title: 'Rate the App', url: 'rate-the-app', icon: 'star' },
    { title: 'FAQ', url: 'faqs', icon: 'help' },
    { title: 'Terms & Conditions', url: 'terms-conditions', icon: 'create' },
    { title: 'Contact Us', url: 'contact-us', icon: 'call' },
    { title: 'Logout', url: 'logout', icon: 'power' }
  ];
  userData: any;
  dateTime: any;
  activateRoute: any;
  router: any;
  user_id: any;
  name: any;
  email: any;
  profile: any;

  constructor() { }

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('userDetails'));
    this.name = this.userData[0].name;
    this.email = this.userData[0].email;
    this.profile = this.userData[0].profile;
  }
}
