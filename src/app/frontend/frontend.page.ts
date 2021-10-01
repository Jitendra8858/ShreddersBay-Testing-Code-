import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-frontend',
  templateUrl: './frontend.page.html',
  styleUrls: ['./frontend.page.scss'],
})
export class FrontendPage implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }
   home(val){
     this.router.navigate(['home', {role:val}]);
  }

}
