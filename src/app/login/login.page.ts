import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserApiService } from '../services/user-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  data: any;
  role: any;
  errorMsg: string;
  successMsg: string;
  isSubmitted: boolean;

  constructor(
    private userService: UserApiService,
    private router: Router,
    public fb: FormBuilder,
    private activateRoute: ActivatedRoute,
    ) { }

  ngOnInit() {
    this.role = this.activateRoute.snapshot.params.role;
    this.isSubmitted = false;
    this.loginForm = this.fb.group({
      email: ['',[Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['',[Validators.required]],

    });
  }

  get errorControl() {
    return this.loginForm.controls;
  }

  submitForm()
  {
    this.isSubmitted = true;
    if (!this.loginForm.valid) {
      console.log('Please provide all the required values!')
      return false;
    }else {
       // Initialize Params Object
    var myFormData = new FormData();
    // Begin assigning parameters
    myFormData.append('role',this.role);
    myFormData.append('email', this.loginForm.value.email);
    myFormData.append('password', this.loginForm.value.password);
      this.userService.getByUserInfo(myFormData).toPromise().then((res) => {
          this.data=res;
          //console.log(this.data[0]);
            if(this.data[0].password===this.loginForm.value.password)
            {

              if(this.role == 1 && this.data[0].user_role == 1){
                alert('Login Successfully');
                this.successMsg='Login Successfully';
                this.errorMsg = '';
                this.loginForm.reset();
                localStorage.setItem('userDetails', JSON.stringify(this.data));
                this.router.navigate(['dealer-home']);
              }
              if(this.role == 0 && this.data[0].user_role == 0){
                alert('Login Successfully');
                this.successMsg='Login Successfully';
                this.errorMsg = '';
                this.loginForm.reset();
                localStorage.setItem('userDetails', JSON.stringify(this.data));
                this.router.navigate(['customer-home/customer-home/customer']);
              }
            }
            else{
              this.errorMsg='Invalid Id Or Password';
              this.successMsg = '';
              this.loginForm.reset();
            }
      }).catch(err=> {
        // this.errorMsg = error.message;
        this.errorMsg='User Not Exist';
        this.successMsg = '';
        console.log(err.message);
        this.loginForm.reset();
        });
      }
  }


}

