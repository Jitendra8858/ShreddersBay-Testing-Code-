import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { APIService } from '../services/api.service';
import { UserApiService } from '../services/user-api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  signupForm: FormGroup;
  role: any;
  isSubmitted: boolean;
  message: string;
  data: any;



  constructor(
    private http : HttpClient,
    private apiService: APIService,
    private userService: UserApiService,
    private router: Router,
    public fb: FormBuilder,
    private toastCtrl: ToastController,
    private activateRoute: ActivatedRoute
    ) { }

  ngOnInit() {
    this.role = this.activateRoute.snapshot.params.role;
    this.isSubmitted = false;
    this.signupForm = this.fb.group({
     role: [this.role],
      name: ['',[Validators.required, Validators.minLength(2)]],
      email: ['',[Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['',[Validators.required, Validators.minLength(8), Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}$/)]],
      confPass: ['',[Validators.required, Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}$/)]],
      mobile: ['',[Validators.required, Validators.pattern('^[0-9].{9,11}$')]],
    });

    this.getAll();
  }
  get errorControl() {
    return this.signupForm.controls;
  }



  // submitForm() {
  //   //console.log(this.signupForm.value);
  //   if (!this.signupForm.valid) {
  //     return false;
  //   } else {
  //     this.apiService.create(this.signupForm.value).subscribe(res => {
  //       //alert(res);
  //       //console.log(res);
  //       this.signupForm.reset();
  //       this.router.navigate(['login']);
  //     });
  //   }
  // }

  insertUser(){
    this.isSubmitted = true;
    if (!this.signupForm.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {

      // Initialize Params Object
    var myFormData = new FormData();
    // Begin assigning parameters
    myFormData.append('role', this.signupForm.value.role);
    myFormData.append('name', this.signupForm.value.name);
    myFormData.append('email', this.signupForm.value.email);
    myFormData.append('mobile', this.signupForm.value.mobile);
    myFormData.append('password', this.signupForm.value.password);
    console.log(myFormData);
    this.userService.create(myFormData).subscribe((res: Response) => {
      console.log(res);
      this.data = res;
      if(this.data.message){
        this.openToast(this.data.message);
      }
      alert(this.data.message);
     // this.router.navigate(['login', {role: this.role}]);

    });
    }
  }
  async openToast(message) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 3000,
      cssClass: 'toast-custom-class',
    });
    toast.present();
  }
  getAll(){
    this.userService.getAll().toPromise().then((res)=>{
      console.log(res);
    }).catch((err)=>{
      console.log(err.message);
    });
  }

}
