import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { APIService } from 'src/app/services/api.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-scrap-items',
  templateUrl: './scrap-items.page.html',
  styleUrls: ['./scrap-items.page.scss'],
  providers: [Camera]
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
  //image to be displayed in template
  image;
  imageData;

  constructor(
    private apiService: APIService,
    public fb: FormBuilder,
    private router: Router,
    private camera: Camera,
    private http: HttpClient
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
   console.log(value.detail.value);
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
        this.successMsg='Item Added Successfully';
        this.router.navigate(['customer-home/customer-home/my-cart']);
      }).catch((err)=> {
        alert('Error'+ err);
        console.log('Error' + err);
        this.errorMsg='Error'+ err;
      });
    }

  }

  openCamera(){
    const options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
   };

    this.camera.getPicture(options).then((imageData) => {
    this.imageData = imageData;
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    this.image=(<any>window).Ionic.WebView.convertFileSrc(imageData);
    }, (err) => {
       // Handle error
       alert('error '+JSON.stringify(err));
  });
}
  upload(){
    const  url = 'your REST API url';
    const date = new Date().valueOf();

    // Replace extension according to your media type
    const imageName = date+ '.jpeg';
    // call method that creates a blob from dataUri
    const imageBlob = this.dataURItoBlob(this.imageData);
    const imageFile = new File([imageBlob], imageName, { type: 'image/jpeg' });

    const  postData = new FormData();
    postData.append('file', imageFile);

    const data: Observable<any> = this.http.post(url,postData);
    data.subscribe((result) => {
      console.log(result);
    });
  }

  dataURItoBlob(dataURI) {
    const byteString = window.atob(dataURI);
   const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
     }
    const blob = new Blob([int8Array], { type: 'image/jpeg' });
   return blob;
  }

}
