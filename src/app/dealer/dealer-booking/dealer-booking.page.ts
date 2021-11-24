import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserApiService } from 'src/app/services/user-api.service';

@Component({
  selector: 'app-dealer-booking',
  templateUrl: './dealer-booking.page.html',
  styleUrls: ['./dealer-booking.page.scss'],
})
export class DealerBookingPage implements OnInit {
  segment: string;
  userDetails: any;
  userId: any;
  currentOrder: any;
  cancelOrder: any;
  compOrder: any;

  constructor(private userService: UserApiService,
    public fb: FormBuilder,
    private router: Router,) { }

  ngOnInit() {
    this.segment= 'Current';
    this.userDetails = JSON.parse(localStorage.getItem('userDetails'));
    this.userId = this.userDetails[0].id;
    //alert(this.userId);
    this.getCurrentOrders();
  }
  getCurrentOrders() {
    this.userService.getCurOrders(this.userId).toPromise().then((res) => {
      this.currentOrder = res;
      //console.log(this.data);
    }).catch((err) => {
      console.log('Error' + err);
    });
  }

  getCancelOrders() {
    this.userService.getCanOrders(this.userId).toPromise().then((res) => {
      this.cancelOrder = res;
      //console.log(this.data);
    }).catch((err) => {
      console.log('Error' + err);
    });
  }

  getCompOrders() {
    this.userService.getCompOrders(this.userId).toPromise().then((res) => {
      this.compOrder = res;
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
      this.getCompOrders();
    }
    if (this.segment === 'Cancel') {
      this.getCancelOrders();

    }
  }

  showBookingDetails(bookingId){
    //alert('show details');
    this.router.navigate(['order-details',{bookingId}]);
  }


}
