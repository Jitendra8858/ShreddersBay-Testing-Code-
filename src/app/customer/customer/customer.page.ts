import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NavParams } from '@ionic/angular';
import { APIService } from '../../services/api.service';
@Component({
  selector: 'app-customer',
  templateUrl: './customer.page.html',
  styleUrls: ['./customer.page.scss'],
  providers: [NavParams],

})
export class CustomerPage implements OnInit {
  public appPages = [
    { title: 'Home', url: 'customer-home/customer-home/customer', icon: 'home' },
    { title: 'Scrap Items', url: 'customer-home/customer-home/scrap-items', icon: 'mail' },
    { title: 'My Cart', url: 'customer-home/customer-home/my-cart', icon: 'cart' },
    { title: 'My Booking', url: 'customer-home/customer-home/my-booking', icon: 'book' },
    { title: 'My Account', url: 'customer-home/customer-home/my-account', icon: 'person' },
    { title: 'Notifications', url: 'notifications', icon: 'mail' },
    { title: 'Rate the App', url: '#', icon: 'star' },
    { title: 'FAQ', url: 'faqs', icon: 'help' },
    { title: 'Terms & Conditions', url: 'terms-conditions', icon: 'create' },
    { title: 'Contact Us', url: 'contact-us', icon: 'call' },
    { title: 'Logout', url: 'logout', icon: 'power' }
  ];
  role: any;
  data: any;
  list: any;


  constructor(
    private apiService: APIService,
    private router: Router,
    private activateRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getProducts();

  }
  getProducts(){

    this.apiService.getProducts().toPromise().then((res) => {
      //console.log(res);
      this.data=res;
      // this.list=this.data.slice(0,9);
      this.list=this.data;
    }).catch((err)=> {
      console.log('Error' + err);
    });

  }

  addCart()
  {
    this.router.navigate(['customer-home/customer-home/scrap-items']);
  }

  notifications(){
    this.router.navigate(['notifications']);
  }
}


