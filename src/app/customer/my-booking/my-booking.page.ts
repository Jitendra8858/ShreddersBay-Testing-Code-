import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { APIService } from 'src/app/services/api.service';

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
  constructor(
    private apiService: APIService,
    public fb: FormBuilder,
    private router: Router,
    private menu: MenuController) { }

  ngOnInit() {
    this.segment= 'Current';
    this.userDetails = JSON.parse(localStorage.getItem('userDetails'));
    this.userId = this.userDetails.id;
    this.getCurrentOrders();
  }

  getCurrentOrders() {
    this.apiService.getOrders(this.userId).toPromise().then((res) => {
      this.currentOrder = res;
      //console.log(this.data);
    }).catch((err) => {
      console.log('Error' + err);
    });
  }

  getCancelOrders() {
    this.apiService.getCancelOrders(this.userId).toPromise().then((res) => {
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
      //alert('Complete');
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
