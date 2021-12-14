import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { UserApiService } from '../services/user-api.service';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.page.html',
  styleUrls: ['./add-address.page.scss'],
})
export class AddAddressPage implements OnInit {
  userDetails: any;
  userId: any;
  country: any;
  submitForm: FormGroup;
  country_id: any;
  state: any;
  state_id: any;
  city: any;
  city_id: any;
  area: any;
  area_id: any;
  successMsg: string;
  errorMsg: string;
  constructor(
    private userService: UserApiService,
    public fb: FormBuilder,
    private router: Router,
    private menu: MenuController) { }

  ngOnInit() {
    this.userDetails = JSON.parse(localStorage.getItem('userDetails'));
    if(this.userDetails ==null){
      this.router.navigate(['frontend']);
    }
    this.userId = this.userDetails[0].id;
    this.submitForm = this.fb.group({
      country_id: [''],
      state_id: [''],
      city_id: [''],
      area_id: [''],
      address: [''],
      landmark: [''],
      pincode: [''],
    });
    this.getCountry();
  }

  getCountry()
  {
    this.userService.getCountry().toPromise().then((res) => {
      this.country = res;
      console.log(res);
    }).catch((err) => {
      console.log('Error' + err);
    });
  }

  getState($event)
  {
    this.country_id=$event.detail.value;
    this.userService.getState(this.country_id).toPromise().then((res) => {
      this.state = res;
      console.log(res);
    }).catch((err) => {
      console.log('Error' + err);
    });
  }
  getCity($event)
  {
    this.state_id=$event.detail.value;
    this.userService.getCity(this.state_id).toPromise().then((res) => {
      this.city = res;
      console.log(res);
    }).catch((err) => {
      console.log('Error' + err);
    });
  }
  getArea($event)
  {
    this.city_id=$event.detail.value;
    this.userService.getArea(this.city_id).toPromise().then((res) => {
      this.area = res;
      console.log(res);
    }).catch((err) => {
      console.log('Error' + err);
    });
  }

  valueChange($event){
    this.area_id=$event.detail.value;
  }

  submitForms() {
    if (!this.submitForm.valid) {
      return false;
    } else {
      alert();
      // Initialize Params Object
      var myFormData = new FormData();
      //Begin assigning parameters
      myFormData.append('country_id', this.country_id);
      myFormData.append('state_id', this.state_id);
      myFormData.append('city_id', this.city_id);
      myFormData.append('area_id', this.area_id);
      myFormData.append('address', this.submitForm.value.address);
      myFormData.append('landmark', this.submitForm.value.landmark);
      myFormData.append('pincode', this.submitForm.value.pincode);
     // console.log(myFormData);
      this.userService.addAddress(this.userId,myFormData).toPromise().then((res) => {
        alert(res);
        this.successMsg = 'Address Added Successfully';
       // this.router.navigate(['customer-home/customer-home/my-cart']);
      }).catch((err) => {
        alert('Error' + err);
        console.log('Error' + err);
        this.errorMsg = 'Error' + err;
      });
    }

  }


}
