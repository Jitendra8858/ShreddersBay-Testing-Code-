import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { APIService } from '../../services/api.service';
@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
})
export class MyProfilePage implements OnInit {
  profileForm: FormGroup;
  id: any;
  userData: any;
  constructor(
    private apiService: APIService,
    private router: Router,
    public fb: FormBuilder,
    private activateRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.userData=JSON.parse(localStorage.getItem('userDetails'));
    this.id=this.userData.id;
    //alert(this.userData);
    this.profileForm = this.fb.group({
      name: [''],
      mobile: [''],
      email: ['']
    });
  }

  submitForm() {
    console.log(this.profileForm.value);
    if (!this.profileForm.valid) {
      return false;
    } else {
      this.apiService.update(this.id,this.profileForm.value).subscribe(res => {
        alert(res);
        console.log(res);
        this.profileForm.reset();
        this.router.navigate(['']);
      });
    }
  }

}
