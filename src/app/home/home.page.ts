import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavParams } from '@ionic/angular';
// import { GooglePlus } from '@ionic-native/google-plus/ngx';
// import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { APIService } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  providers: [NavParams],
  // providers: [NavParams,GooglePlus,Facebook]
})
export class HomePage implements OnInit {

  role: any;

  constructor(
    public apiService: APIService,
    public navParams: NavParams,
    private router: Router,
    private activateRoute: ActivatedRoute,
    // private googlePlus: GooglePlus,
    // private fb: Facebook
  ) {}

  ngOnInit() {
    this.role = this.activateRoute.snapshot.params.role;
  }
  login(role){
    alert(role);
    this.router.navigate(['login', {role}]);
 }
 signup(role){
  alert(role);
  this.router.navigate(['signup', {role}]);
}

// googleLogin(role){
//   this.googlePlus.login({})
//   .then(res => {
//     console.log(res);
//     console.log('Logged into Facebook!', res);
//     this.apiService.create(res).toPromise().then((a)=>{
//     console.log('Logged into Facebook!', a);

//   }).catch(err => {
//     console.log('Error logging into Facebook', err);
//   });
//   })
//   .catch(err => {
//     console.error(err);
//   });
// }

// facebookLogin(role){
//   this.fb.login(['public_profile', 'user_friends', 'email'])
//   .then((res: FacebookLoginResponse) => {
//     console.log('Logged into Facebook!', res);
//     this.apiService.create(res).toPromise().then((a)=>{
//     console.log('Logged into Facebook!', a);

//   }).catch(err => {
//     console.log('Error logging into Facebook', err);
//   });
// })
//   .catch(e => {
//     console.log('Error logging into Facebook', e);
//   });
// }

}
