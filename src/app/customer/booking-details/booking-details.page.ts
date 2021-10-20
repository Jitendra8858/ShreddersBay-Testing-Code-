import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { APIService } from 'src/app/services/api.service';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.page.html',
  styleUrls: ['./booking-details.page.scss'],
})
export class BookingDetailsPage implements OnInit {
  userDetails: any;
  userId: any;
  data: any;
  bId: any;
  status: any;
  constructor(
    private apiService: APIService,
    public fb: FormBuilder,
    private activateRouter: ActivatedRoute,
    private router: Router,
    private menu: MenuController
    ) { }
  ngOnInit() {
    this.bId = this.activateRouter.snapshot.params.bookingId;
    this.getCurrentOrders();
  }
  getCurrentOrders() {
    this.apiService.getOrdersById(this.bId).toPromise().then((res) => {
      this.data = res;
      console.log(this.data);
    }).catch((err) => {
      console.log('Error' + err);
    });
  }

  getCancelOrders() {
    this.apiService.getCancelOrders(this.bId).toPromise().then((res) => {
      this.data = res;
      console.log(this.data);
    }).catch((err) => {
      console.log('Error' + err);
    });
  }

  cancelBooking(){
    if(confirm('Are You Sure You Want To Cancel Booking?')){
    this.status={status: '0'};
    this.apiService.cancelBooking(this.bId,this.status).toPromise().then((res) => {
      this.data = res;
      console.log(this.data);
      this.router.navigate(['my-booking']);
    }).catch((err) => {
      console.log('Error' + err.error);
    });
  }
}
}
