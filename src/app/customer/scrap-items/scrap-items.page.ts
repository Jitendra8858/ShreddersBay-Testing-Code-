import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { APIService } from 'src/app/services/api.service';

@Component({
  selector: 'app-scrap-items',
  templateUrl: './scrap-items.page.html',
  styleUrls: ['./scrap-items.page.scss'],
})
export class ScrapItemsPage implements OnInit {
  data: any;
  list: any;
  id: any;
  userId: any;
  subProduct: any;
  weight: any;
  submitForm: FormGroup;
  price: any;
  img1: string | ArrayBuffer;
  userDetails: any;
  userName: any;
  pId: any;
  file: any;
  totalPrice: number;
  successMsg: string;
  errorMsg: string;

  constructor(
    private apiService: APIService,
    public fb: FormBuilder,
    private router: Router,
    ) { }

  ngOnInit() {
    this.pId='';
    this.file='';
    this.price='';
    this.userDetails =JSON.parse(localStorage.getItem('userDetails'));
    this.userId=this.userDetails.id;

    this.submitForm = this.fb.group({
      userId: [this.userId],
      prodId: [this.pId],
      weight: [''],
      totalPrice: [''],
      file: [''],
    });

    this.getProducts();
  }

  getProducts(){
    this.apiService.getProducts().toPromise().then((res) => {
      //console.log(res);
      this.data=res;
    }).catch((err)=> {
      console.log('Error' + err);
    });

  }

 checkValue(value){
    this.id=JSON.stringify(value.detail.value);
    this.apiService.getProductByPID(this.id).toPromise().then((res) => {
      this.list=res;
      this.pId=this.list.p_id;
      this.subProduct=this.list.sub_products;
      this.weight=this.list.weight;
      this.price=this.list.price;
    }).catch((err)=> {
      console.log('Error' + err);
    });
  }

  fileChange(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (value) => {
        this.img1 = value.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);  // to trigger onload
    }
    const fileList: FileList = event.target.files;
    this.file = fileList[0].name;
    console.log(this.file);
  }

  submitForms() {
    if (!this.submitForm.valid) {
      return false;
    } else {

      this.submitForm.value.prodId=this.pId;
      this.submitForm.value.file=this.file;
      this.totalPrice=this.submitForm.value.weight*this.price;
      this.submitForm.value.totalPrice=this.totalPrice;
      console.log(this.submitForm.value);
      this.apiService.createCart(this.submitForm.value).toPromise().then((res) => {
        alert('Item Added Successfully');
        this.successMsg='Items Added Successfully';
        this.router.navigate(['my-cart']);
      }).catch((err)=> {
        alert('Error'+ err);
        console.log('Error' + err);
        this.errorMsg='Error'+ err;
      });
    }

  }
}
