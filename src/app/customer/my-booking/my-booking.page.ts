import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { UserApiService } from 'src/app/services/user-api.service';

@Component({
  selector: 'app-my-booking',
  templateUrl: './my-booking.page.html',
  styleUrls: ['./my-booking.page.scss'],
})
export class MyBookingPage implements OnInit {
  userDetails: any;
  userId: any;
  data: any;
  approxPrice: any;
  prodId: any;
  weight: any;
  segment: any;
  currentOrder: any;
  cancelOrder: any;
  compOrder: any;
  constructor(
    private userService: UserApiService,
    public fb: FormBuilder,
    private router: Router,
    private menu: MenuController) { }

  ngOnInit() {
    this.segment= 'Current';
    this.userDetails = JSON.parse(localStorage.getItem('userDetails'));
    if(this.userDetails ==null){
      this.router.navigate(['frontend']);
    }
    this.userId = this.userDetails[0].id;
    this.getCurrentOrders();
  }

  getCurrentOrders() {
    this.userService.getCurrentOrders(this.userId).toPromise().then((res) => {
      this.currentOrder = res;
    }).catch((err) => {
      console.log('Error' + err);
    });
  }

  getCompleteOrders() {
    this.userService.getCompleteOrders(this.userId).toPromise().then((res) => {
      this.compOrder = res;
    }).catch((err) => {
      console.log('Error' + err);
    });
  }

  getCancelOrders() {
    this.userService.getCancelOrders(this.userId).toPromise().then((res) => {
      this.cancelOrder = res;
      //console.log(this.data);
    }).catch((err) => {
      console.log('Error' + err);
    });
  }

  segmentChanged(event: any) {
    //console.log('Segment changed', event.detail.value);
    this.segment = event.detail.value;
    if (this.segment === 'Current') {
      this.getCurrentOrders();
    }
    if (this.segment === 'Complete') {
      this.getCompleteOrders();
    }
    if (this.segment === 'Cancel') {
      //alert('Cancel');
      this.getCancelOrders();

    }
  }

  showBookingDetails(bookingId){
    //alert('show details');
    this.router.navigate(['booking-details',{bookingId}]);
  }
}
