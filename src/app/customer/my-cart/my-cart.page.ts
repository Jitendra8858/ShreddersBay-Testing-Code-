/* eslint-disable no-cond-assign */
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
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
    private router: Router) { }

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
        this.filename = value.file;
      });
    }).catch((err) => {
      console.log('Your Cart Is Empty'+err);
    });
  }


  addAddr() {
    this.router.navigate(['my-addr', {schedule_date: this.dateTime}]);
  }

  plus(){
    this.router.navigate(['customer-home/customer-home/scrap-items']);
  }



}
