import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserApiService } from '../services/user-api.service';

@Component({
  selector: 'app-frontend',
  templateUrl: './frontend.page.html',
  styleUrls: ['./frontend.page.scss'],
})
export class FrontendPage implements OnInit {
  data: any;

  constructor(
    private router: Router,
    public userApiService: UserApiService,
  ) { }

  ngOnInit() {

  }
   home(val){
     this.router.navigate(['home', {role:val}]);
  }



}
