import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { APIService } from '../../services/api.service';
@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.page.html',
  styleUrls: ['./my-account.page.scss'],
})
export class MyAccountPage implements OnInit {
  id: any;
  userData: any;
  name: any;
  email: any;
  constructor(
    private apiService: APIService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.userData=JSON.parse(sessionStorage.getItem('userDetails'));
    this.id=this.userData.id;
    this.name=this.userData.name;
    this.email=this.userData.email;
    //alert(this.userData);
  }
  myProfile(){
    this.router.navigate(['my-profile']);
  }
  myAddr(){
    this.router.navigate(['my-addr']);
  }

  settings(){
    this.router.navigate(['settings']);
  }

  changePass(){
    this.router.navigate(['change-pass']);
  }
  notifications(){
    this.router.navigate(['notifications']);
  }

}
