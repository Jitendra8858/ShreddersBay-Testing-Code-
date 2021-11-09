import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dealer-home',
  templateUrl: './dealer-home.page.html',
  styleUrls: ['./dealer-home.page.scss'],
})
export class DealerHomePage implements OnInit {

  sideNav = [
    {title : 'Home', url : '/dealer-home/dealer-home/dealer', icon: 'home'},
    {title : 'My Booking', url : '/dealer-home/dealer-home/dealer-booking', icon: 'book'},
    {title : 'My Account', url : '/dealer-home/dealer-home/my-account', icon: 'person'},
    {title : 'Notification', url : '/dealer-home/dealer-home/notifications', icon: 'notifications'},
    {title : 'FAQ', url : '/dealer-home/dealer-home/faqs', icon: 'power'},
    {title : 'Terms & Conditions', url : '/dealer-home/dealer-home/terms-conditions', icon: 'power'},
    {title : 'Contact Us', url : '/dealer-home/dealer-home/contact-us', icon: 'mail'},
    {title : 'Logout', url : '/dealer-home/dealer-home/logout', icon: 'power'},
  ];



  constructor() { }

  ngOnInit() {
  }

}
