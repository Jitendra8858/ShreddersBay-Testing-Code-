import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserApiService } from '../services/user-api.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.page.html',
  styleUrls: ['./change-pass.page.scss'],
})
export class ChangePassPage implements OnInit {
  passForm: FormGroup;
  id: any;
  pass: any;
  userData: any;successMsg: string;
  email: any;
  token: any;
  role: any;
  isSubmitted: boolean; 
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';

 constructor(
  private router: Router,
  public fb: FormBuilder,
  private activateRoute: ActivatedRoute,
  private userService: UserApiService,
  private toastCtrl: ToastController
  ) { }


  ngOnInit() {
    this.isSubmitted = false;
    this.userData=JSON.parse(localStorage.getItem('userDetails'));
    if(this.userData ==null){
      this.router.navigate(['frontend']);
    }
    this.id=this.userData[0].id;
    this.pass=this.userData[0].password;
    this.token=this.userData[0].token;
    this.email=this.userData[0].email;
    this.role=this.userData[0].user_role;


   // alert(this.role);
    console.log(this.userData);
    this.passForm = this.fb.group({
      oldPass: ['',[Validators.required]],
      password: ['',[Validators.required]],
      confPass: ['',[Validators.required]],
    });
  }
  get errorControl() {
    return this.passForm.controls;
  }

  submitForm() {
    this.isSubmitted = true;
    console.log(this.passForm.value);
    if (!this.passForm.valid) {
      return false;
    } else {
      var myFormData = new FormData();
        //Begin assigning parameters
       // alert(this.id);
        myFormData.append('user_id', this.id);
        myFormData.append('token', this.token);
        myFormData.append('user_role', this.role);
        myFormData.append('password', this.passForm.value.password);
        this.userService.updatePassword(myFormData).toPromise().then((res) => {
          console.log(res);
          this.successMsg = 'Password Updated Successfully';
           this.userService.getUserById(this.id).toPromise().then((response) => {
             console.log(response);
           // location.reload();

      });
   
  
  });
    }
  }
  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
}
}
