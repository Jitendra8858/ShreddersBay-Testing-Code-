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

  submitForm() {
    //console.log(this.signupForm.value);
    if (!this.signupForm.valid) {
      return false;
    } else {
      this.userService.create(this.signupForm.value).subscribe(res => {
        //alert(res);
        //console.log(res);
        this.signupForm.reset();
        this.router.navigate(['login']);
      });
    }
  }

  getAll(){
    this.userService.getAll().toPromise().then((res)=>{
      console.log(res);
    }).catch((err)=>{
      console.log(err);
    });
  }

}
