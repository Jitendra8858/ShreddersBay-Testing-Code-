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


