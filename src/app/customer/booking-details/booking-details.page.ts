import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { APIService } from 'src/app/services/api.service';
import { UserApiService } from 'src/app/services/user-api.service';

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
  role: any;
  dealer_id: any;
  dealer_record: any;
  constructor(
    private userService: UserApiService,
    private apiService: APIService,
    public fb: FormBuilder,
    private activateRouter: ActivatedRoute,
    private router: Router,
    private menu: MenuController
  ) { }
  ngOnInit() {
    this.userDetails = JSON.parse(localStorage.getItem('userDetails'));
     this.userId = this.userDetails[0].id;
    // alert(this.role);
    this.bId = this.activateRouter.snapshot.params.bookingId;
    this.getOrdersById();
  }
  getOrdersById() {
    this.userService.getOrdersById(this.bId).toPromise().then((res) => {
      this.data = res;
      this.dealer_id=this.data[0].dealer_id;
     //alert(this.dealer_id);
      this.getUserById(this.dealer_id);
      console.log(this.data);
    }).catch((err) => {
      console.log('Error' + err);
    });
  }

  getUserById(dealer_id: number) {
    this.userService.getUserById(dealer_id).toPromise().then((res) => {
      this.dealer_record = res;
      console.log(this.dealer_record);
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

  cancelBooking() {
    if (confirm('Are You Sure You Want To Cancel Booking?')) {
      this.userService.cancelBooking(this.bId).toPromise().then((res) => {
        this.data = res;
        // console.log(this.data);
        this.router.navigate(['customer-home/customer-home/my-booking']);
      }).catch((err) => {
        console.log('Error' + err.error);
      });
    }
  }
}
