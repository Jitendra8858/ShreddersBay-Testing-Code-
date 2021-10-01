import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { APIService } from '../services/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  signupForm: FormGroup;
  role: any;

  constructor(
    private apiService: APIService,
    private router: Router,
    public fb: FormBuilder,
    private activateRoute: ActivatedRoute
    ) { }

  ngOnInit() {
    this.role = this.activateRoute.snapshot.params.role;
    this.signupForm = this.fb.group({
      name: [''],
      mobile: [''],
      email: [''],
      password: [''],
      confPass: [''],
      userRole:[this.role],
    });
  }

  submitForm() {
    console.log(this.signupForm);
    if (!this.signupForm.valid) {
      return false;
    } else {
      this.apiService.create(this.signupForm.value).subscribe(res => {
        alert(res);
        console.log(res);
        this.signupForm.reset();
        this.router.navigate(['']);
      });
    }
  }

}