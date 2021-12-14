import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { APIService } from '../services/api.service';
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.page.html',
  styleUrls: ['./contact-us.page.scss'],
})
export class ContactUsPage implements OnInit {
  userData: any;
  id: any;

  constructor(
    public apiService: APIService,
    private router: Router,
    private activateRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.userData=JSON.parse(localStorage.getItem('userDetails'));
    if(this.userData ==null){
      this.router.navigate(['frontend']);
    }
    this.id=this.userData[0].id;
  }
  notifications(){
    this.router.navigate(['notifications']);
  }
  faqs(){
    this.router.navigate(['faqs']);
  }

}
