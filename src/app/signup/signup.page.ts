import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { APIService } from '../services/api.service';
import { UserApiService } from '../services/user-api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  signupForm: FormGroup;
  user_role: any;



  constructor(
    private http : HttpClient,
    private apiService: APIService,
    private userService: UserApiService,
    private router: Router,
    public fb: FormBuilder,
    private activateRoute: ActivatedRoute
    ) { }

  ngOnInit() {
    this.user_role = this.activateRoute.snapshot.params.role;
    this.signupForm = this.fb.group({
     role: [this.user_role],
      name: [''],
      email: [''],
      password: [''],
      confPass: [''],
      mobile: [''],
    });

    this.getAll();
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
    if (!this.signupForm.valid) {
      return false;
    } else {

      // Initialize Params Object
    var myFormData = new FormData();
    // Begin assigning parameters
    myFormData.append('role', this.signupForm.value.role);
    myFormData.append('name', this.signupForm.value.name);
    myFormData.append('email', this.signupForm.value.email);
    myFormData.append('mobile', this.signupForm.value.mobile);
    myFormData.append('password', this.signupForm.value.confpass);
    console.log(myFormData);
    this.userService.create(myFormData).subscribe((res: Response) => {
      this.router.navigateByUrl('login');
console.log('data inserted');

    });
    }
  }

  getAll(){
    this.userService.getAll().toPromise().then((res)=>{
      console.log(res);
    }).catch((err)=>{
      console.log(err.message);
    });
  }

}
