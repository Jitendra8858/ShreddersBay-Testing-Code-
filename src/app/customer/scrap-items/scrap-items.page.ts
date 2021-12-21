import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserApiService } from 'src/app/services/user-api.service';
import { ToastController } from '@ionic/angular';

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
  prod_id: any;
  file: any;
  totalPrice: any;
  successMsg: string;
  errorMsg: string;
  //image to be displayed in template
  image;
  imageData;
  filename: string;

  constructor(
    private userService: UserApiService,
    public fb: FormBuilder,
    private router: Router,
    private camera: Camera,
    private http: HttpClient,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
    this.prod_id = '';
    this.file = '';
    this.price = '';
    this.userDetails = JSON.parse(localStorage.getItem('userDetails'));
    if(this.userDetails ==null){
      this.router.navigate(['frontend']);
    }
    this.userId = this.userDetails[0].id;

    // console.log(this.userDetails[0]);
    this.submitForm = this.fb.group({
      user_id: [this.userId],
      prod_id: [this.prod_id],
      weight: [''],
      price: [''],
      file: [''],
    });

    this.getProducts();
  }

  getProducts() {
    this.userService.getProducts().toPromise().then((res) => {
      //console.log(res);
      this.data = res;
    }).catch((err) => {
      console.log('Error' + err);
    });

  }

  async openToast(message) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      cssClass: 'toast-custom-class',
    });
    toast.present();
  }


  checkValue(value) {
    console.log(value.detail.value);
    this.id = value.detail.value;
    this.userService.getProdById(this.id).toPromise().then((res) => {
      this.list = res;
      console.log(this.list[0]);
      this.prod_id = this.list[0].p_id;
      this.subProduct = this.list[0].sub_name;
      this.weight = this.list[0].weight;
      this.price = this.list[0].price;
    }).catch((err) => {
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
    this.filename = fileList[0].name;

     this.file = fileList[0];
    console.log(this.file);

  }

  submitForms() {
    if (!this.submitForm.valid) {
      return false;
    } else {
      // Initialize Params Object
      var myFormData = new FormData();
      // Begin assigning parameters
      myFormData.append('user_id', this.userId);
      myFormData.append('prod_id', this.prod_id);
      myFormData.append('file', this.file, this.filename);
      myFormData.append('price', this.price);
      myFormData.append('weight', this.submitForm.value.weight);

      console.log(myFormData);
      this.userService.createCart(myFormData).toPromise().then((res) => {
        this.successMsg = 'Item Added Successfully';
        this.router.navigate(['customer-home/customer-home/my-cart']);
        this.openToast(this.successMsg);
      }).catch((err) => {
        alert('Error' + err);
        console.log('Error' + err);
        this.errorMsg = 'Error' + err;
      });
    }

  }

  openCamera() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    };

    this.camera.getPicture(options).then((imageData) => {
      this.imageData = imageData;
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      this.image = (<any>window).Ionic.WebView.convertFileSrc(imageData);
    }, (err) => {
      // Handle error
      alert('error ' + JSON.stringify(err));
    });
  }
  upload() {
    const url = 'your REST API url';
    const date = new Date().valueOf();

    // Replace extension according to your media type
    const imageName = date + '.jpeg';
    // call method that creates a blob from dataUri
    const imageBlob = this.dataURItoBlob(this.imageData);
    const imageFile = new File([imageBlob], imageName, { type: 'image/jpeg' });

    const postData = new FormData();
    postData.append('file', imageFile);

    const data: Observable<any> = this.http.post(url, postData);
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
