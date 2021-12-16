import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserApiService } from 'src/app/services/user-api.service';

@Component({
  selector: 'app-available-booking',
  templateUrl: './available-booking.page.html',
  styleUrls: ['./available-booking.page.scss'],
})
export class AvailableBookingPage implements OnInit {
  userDetails: any;
  user_id: any;
  orders: any;

  constructor(private userService: UserApiService,
    private router: Router) { }

  ngOnInit() {
    this.userDetails = JSON.parse(localStorage.getItem('userDetails'));
    if(this.userDetails ==null){
      this.router.navigate(['frontend']);
    }
    this.user_id = this.userDetails[0].id;
    this.availableBooking();

  }

  availableBooking(){
    this.userService.getAllOrders().toPromise().then((res) => {
      // console.log(res);
      this.orders = res;
    //  this.orders=this.orders.slice(0,4);
    }).catch((err) => {
      console.log('Error' + err);
    });
  }

  ignore(book_id){
    // this.userService.updateStatus(this.user_id, myFormData).toPromise().then((res) => {
    //   console.log(res);
    //   this.orders = res;
    //   //this.orders = this.orders;
    //   this.orders=this.orders.slice(0,4);
    // }).catch((err) => {
    //   console.log('Error' + err);
    // });
  }

  accept(book_id){
    // Initialize Params Object
 var myFormData = new FormData();
 // Begin assigning parameters
 myFormData.append('user_id',this.user_id);
 myFormData.append('booking_id',book_id);
    this.userService.updateStatus(myFormData).toPromise().then((res) => {
      this.orders = res;
      this.router.navigate(['dealer-home/dealer-home/dealer-booking']);
    }).catch((err) => {
      console.log('Error' + err);
    });
  }

}
