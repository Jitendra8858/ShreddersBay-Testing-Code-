import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavParams } from '@ionic/angular';
import { Facebook,  } from '@ionic-native/facebook/ngx';
import { APIService } from '../services/api.service';
import { GooglePlus } from '@ionic-native/google-plus/ngx';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
 providers: [NavParams]
})
export class HomePage implements OnInit {

  role: any;
  isLoggedIn = false;
  users = { id: '', name: '', givenName:'', email: '', picture: { data: { url: '' } } };

  constructor(
    public apiService: APIService,
    public navParams: NavParams,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private facebook: Facebook,
    private googleplus: GooglePlus

    ) {
    facebook.getLoginStatus()
      .then(res => {
        console.log(res.status);
        if (res.status === 'connect') {
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
      })
      .catch(e => console.log(e));
  }

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

fbLogin() {
  this.facebook.login(['public_profile', 'user_friends', 'email'])
    .then(res => {
      if (res.status === 'connected') {
        this.isLoggedIn = true;
        this.getUserDetail(res.authResponse.userID);
      } else {
        this.isLoggedIn = false;
      }
    })
    .catch(e => console.log('Error logging into Facebook', e));
}

getUserDetail(userid: any) {
  this.facebook.api('/' + userid + '/?fields=id,email,name,picture', ['public_profile'])
    .then(res => {
      console.log(res);
      this.users = res;
    })
    .catch(e => {
      console.log(e);
    });
}

logout() {
  this.facebook.logout()
    .then( res => this.isLoggedIn = false)
    .catch(e => console.log('Error logout from Facebook', e));
}

glogin() {
  this.googleplus.login({})
    .then(res => {
      console.log(res);
      this.users.name = res.displayName;
      this.users.email = res.email;
      this.users.givenName = res.givenName;
      this.users.id = res.userId;
      this.users.picture = res.imageUrl;

      this.isLoggedIn = true;
    })
    .catch(e => console.log('Error logging into Google', e));
}


glogout() {
  this.googleplus.logout()
    .then(res => {
      console.log(res);
      this.users.id = '';
      this.users.name = '';
      this.users.email = '';
      this.users.givenName = '';
      this.users.picture = { data: { url: '' } };

      this.isLoggedIn = false;
    })
    .catch(err => console.error(err));
}

}
