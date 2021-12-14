import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { APIService } from '../../services/api.service';
import { UserApiService } from '../../services/user-api.service';
@Component({
  selector: 'app-my-addr',
  templateUrl: './my-addr.page.html',
  styleUrls: ['./my-addr.page.scss'],
})
export class MyAddrPage implements OnInit {
  user_id: any;
  userData: any;
  name: any;
  email: any;
  role: any;
  data: any;
  successMsg: string;
  errorMsg: string;
  addr_id: any;
  approxPrice: any;
  prodId: any;
  weight: any;
  cartId: any;
  filename: any;
  dateTime: any;
  bookingDate: any;
  constructor(
    public userService: UserApiService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('userDetails'));
     this.dateTime = this.activateRoute.snapshot.params.schedule_date;
    if(this.userData ==null){
      this.router.navigate(['frontend']);
    }
    this.user_id = this.userData[0].id;
    this.name = this.userData[0].name;
    this.email = this.userData[0].email;
    this.getAddress();
  }
  notifications() {
    this.router.navigate(['notifications']);
  }

  async openToast(message) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      cssClass: 'toast-custom-class',
    });
    toast.present();
  }

  getAddress() {
    this.userService.getAddress(this.user_id).toPromise().then((res) => {
      console.log(res);
      this.data = res;
    }).catch((err) => {
      console.log('Error' + err);
    });
  }
  address($event) {
    alert($event.detail.value);
    this.addr_id = $event.detail.value;
  }

  placeRequest() {

    const dValue = new Date();
    this.bookingDate = formatDate(dValue, 'yyyy-MM-dd', 'en-US');
    // Initialize Params Object
    var myFormData = new FormData();
    this.userService.getCartById(this.user_id).toPromise().then((res) => {
      res.forEach((value) => {
        this.approxPrice = value.total_price;
        this.prodId = value.prod_id;
        this.weight = value.total_weight;
        this.cartId = value.cart_id;
        this.filename = value.file;
      });

      // Begin assigning parameters
      myFormData.append('user_id', this.user_id);
      myFormData.append('prod_id', this.prodId);
      myFormData.append('approx_weight', this.weight);
      myFormData.append('booking_date', this.bookingDate);
      myFormData.append('schedule_date', this.dateTime);
      myFormData.append('approx_price', this.approxPrice);
      myFormData.append('filename', this.filename);
      myFormData.append('addr_id', this.addr_id);
      // console.log( this.orderDetails);
      this.userService.createOrder(myFormData).toPromise().then((res) => {
        this.openToast('Request Placed Successfully');
       // this.successMsg = 'Request Placed Successfully';
        this.router.navigate(['customer-home/customer-home/my-booking']);
      }).catch((err) => {
        this.openToast(err);
        console.log('Error' + err.error);
        this.errorMsg = 'Error' + err;
      });
    }).catch((err) => {
      console.log('Your Cart Is Empty' + err);
    });

  }

  plus() {
    this.router.navigate(['customer-home/customer-home/scrap-items']);
  }
}

