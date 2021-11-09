import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { APIService } from '../services/api.service';
@Component({
  selector: 'app-my-addr',
  templateUrl: './my-addr.page.html',
  styleUrls: ['./my-addr.page.scss'],
})
export class MyAddrPage implements OnInit {
  id: any;
  userData: any;
  name: any;
  email: any;
  role: any;
  data: any;
  constructor(
    public apiService: APIService,
    private router: Router,
    private activateRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.userData=JSON.parse(localStorage.getItem('userDetails'));
    this.id=this.userData.id;
    this.name=this.userData.name;
    this.email=this.userData.email;
    //alert(this.userData);
    this.getAddress();


  }
  notifications(){
    this.router.navigate(['notifications']);
    this.address();
  }

  getAddress() {

  this.apiService.getAddress().toPromise().then((res) => {
    console.log(res);
    this.data = res;
  }).catch((err) => {
    console.log('Error' + err);
  });

}
address(){
alert('g');
}
}

