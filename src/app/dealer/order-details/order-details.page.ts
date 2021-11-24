import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { APIService } from 'src/app/services/api.service';
import { UserApiService } from 'src/app/services/user-api.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.page.html',
  styleUrls: ['./order-details.page.scss'],
})
export class OrderDetailsPage implements OnInit {
  userDetails: any;
  bId: any;
  data: any;

  constructor(
    private userService: UserApiService,
    private apiService: APIService,
    public fb: FormBuilder,
    private activateRouter: ActivatedRoute,
    private router: Router,) { }

  ngOnInit() {
    this.userDetails = JSON.parse(localStorage.getItem('userDetails'));
    // this.role = this.userDetails[0].user_role;
    // alert(this.role);
    this.bId = this.activateRouter.snapshot.params.bookingId;
    this.getOrdersById();
  }

  getOrdersById() {
    this.userService.getOrdersById(this.bId).toPromise().then((res) => {
      this.data = res;
      console.log(this.data);
    }).catch((err) => {
      console.log('Error' + err);
    });
  }


  getCancelOrders() {
    this.userService.getCanOrders(this.bId).toPromise().then((res) => {
      this.data = res;
      console.log(this.data);
    }).catch((err) => {
      console.log('Error' + err);
    });
  }

  delivered()
  {
      this.userService.completed(this.bId).toPromise().then((res) => {
        this.data = res;
        this.router.navigate(['dealer-home/dealer-home/dealer-booking']);
      }).catch((err) => {
        console.log('Error' + err.error);
      });
  }

cancel(){
  if(confirm('Are You Sure You Want To Cancel Booking?')){
  this.userService.cancel(this.bId).toPromise().then((res) => {
    this.data = res;
    this.router.navigate(['dealer-home/dealer-home/dealer-booking']);
  }).catch((err) => {
    console.log('Error' + err.error);
  });
}
}

}
