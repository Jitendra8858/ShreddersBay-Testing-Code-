/* eslint-disable no-cond-assign */
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { APIService } from 'src/app/services/api.service';
import { MenuController } from '@ionic/angular';
import { formatDate } from '@angular/common';
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
  orderDetails = { userId: '', prodId: '', weight: '', approxPrice: '', bookingDate: '', scheduleDate: '' };
  prodId: any;
  price: any;
  bookingDate: any;
  weight: any;
  cartId: any;

  constructor(
    private apiService: APIService,
    public fb: FormBuilder,
    private router: Router,
    private menu: MenuController) { }

  ngOnInit() {
    this.userDetails = JSON.parse(localStorage.getItem('userDetails'));
    this.userId = this.userDetails.id;
    this.getCartById();
  }

  removeCart(id) {
    this.apiService.deleteItem(id).toPromise().then((res) => {
      this.message = res;
      //alert(this.message.message);
      location.reload();
    }).catch((err) => {
      console.log('Error' + err);
    });
  }

  getCartById() {
    this.apiService.getCartById(this.userId).toPromise().then((res) => {
      this.data = res;
      this.data.forEach((value) => {
        this.approxPrice = value.total_price;
        this.prodId = value.prod_id;
        this.weight = value.total_weight;
        this.cartId = value.id;
       // alert(this.cartId);
      });
    }).catch((err) => {
      console.log('Your Cart Is Empty');
    });

  }


  placeRequest() {
    this.dateTime = this.dateTime;
    const dValue = new Date();
    this.bookingDate = formatDate(dValue, 'yyyy-MM-dd', 'en-US');
    this.orderDetails.userId = this.userId;
    this.orderDetails.prodId = this.prodId;
    this.orderDetails.weight = this.weight;
    this.orderDetails.bookingDate = this.bookingDate;
    this.orderDetails.scheduleDate = this.dateTime;
    this.orderDetails.approxPrice = this.approxPrice;
    //console.log( this.orderDetails);
    this.apiService.createOrder(this.orderDetails).toPromise().then((res) => {
      alert('Request Placed Successfully');
      this.successMsg = 'Request Placed Successfully';

      this.removeCart(this.cartId);
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
