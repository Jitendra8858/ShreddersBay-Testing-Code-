import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
})
export class MyProfilePage implements OnInit {
  [x: string]: any;
  profileForm: FormGroup;
  id: any;
  userData: any;
  constructor(
    private router: Router,
    public fb: FormBuilder,
    private activateRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.userData=JSON.parse(localStorage.getItem('userDetails'));
    if(this.userData ==null){
      this.router.navigate(['frontend']);
    }
    this.id=this.userData[0].id;
    this.name=this.userData[0].name;
    this.mobile=this.userData[0].mobile;
    this.email=this.userData[0].email;
    //alert(this.userData);
    this.profileForm = this.fb.group({
      name: [this.name],
      mobile: [''],
      email: ['']
    });
  }



  submitForm() {
    //  console.log(this.profileForm.value);
      if (!this.profileForm.valid) {
        return false;
      } else {
        var myFormData = new FormData();
        //Begin assigning parameters
        myFormData.append('id', this.id);
        myFormData.append('name', this.profileForm.value.name);
        myFormData.append('email', this.profileForm.value.email);
        myFormData.append('mobile', this.profileForm.value.mobile);
        this.userService.create(myFormData).toPromise().then((res) => {
          this.successMsg = 'Profile Updated Successfully';
           this.userService.getUserById(this.id).toPromise().then((response) => {
             this.myUserData=(response);
           localStorage.setItem('userDetails', JSON.stringify(this.myUserData));

       location.reload();
      });


        });
      }
    }

  }
