/* eslint-disable no-cond-assign */
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { formatDate } from '@angular/common';
import { UserApiService } from 'src/app/services/user-api.service';
@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.page.html',
  styleUrls: ['./my-cart.page.scss'],
})
export class MyCartPage implements OnInit {
  userDetails: any;
  userId: any;
  data: any;
  message: any;
  approxPrice: any;
  tRec: any;
  dateTime: any;
  successMsg: string;
  errorMsg: string;
  prodId: any;
  price: any;
  bookingDate: any;
  weight: any;
  cartId: any;
  filename: string | Blob;

  constructor(
    private userService: UserApiService,
    public fb: FormBuilder,
    private router: Router,
    private menu: MenuController) { }

  ngOnInit() {
    this.userDetails = JSON.parse(localStorage.getItem('userDetails'));
    this.userId = this.userDetails[0].id;
    this.getCartById();

  }

  removeCart(cart_id) {
    this.userService.deleteItem(cart_id).toPromise().then((res) => {
      this.message = res;
      alert(this.message.message);
      location.reload();
    }).catch((err) => {
      console.log('Error' + err);
    });
  }

  getCartById() {
    this.userService.getCartById(this.userId).toPromise().then((res) => {
      this.data = res;
      this.data.forEach((value) => {
        this.approxPrice = value.total_price;
        this.prodId = value.prod_id;
        this.weight = value.total_weight;
        this.cartId = value.cart_id;
        this.filename = value.cart_id;
         alert(this.filename);
      });
    }).catch((err) => {
      console.log('Your Cart Is Empty'+err);
    });
  }


  placeRequest() {
    this.dateTime = this.dateTime;
    const dValue = new Date();
    this.bookingDate = formatDate(dValue, 'yyyy-MM-dd', 'en-US');
     // Initialize Params Object
     var myFormData = new FormData();
     // Begin assigning parameters
     myFormData.append('user_id',this.userId);
     myFormData.append('prod_id', this.prodId);
     myFormData.append('approx_weight', this.weight);
     myFormData.append('booking_date',this.bookingDate);
     myFormData.append('schedule_date', this.dateTime);
     myFormData.append('approx_price', this.approxPrice);
     myFormData.append('filename', this.filename);

    //console.log( this.orderDetails);
    this.userService.createOrder(myFormData).toPromise().then((res) => {
      alert('Request Placed Successfully');
      this.successMsg = 'Request Placed Successfully';
      this.router.navigate(['customer-home/customer-home/my-booking']);
    }).catch((err) => {
      alert('Error' + err);
      console.log('Error' + err.error);
      this.errorMsg = 'Error' + err;
    });
  }

  plus(){
    this.router.navigate(['customer/scrap-items']);
  }



}
