import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { APIService } from 'src/app/services/api.service';

@Component({
  selector: 'app-dealer',
  templateUrl: './dealer.page.html',
  styleUrls: ['./dealer.page.scss'],
})
export class DealerPage implements OnInit {
  data: any;
  list: any;
  orders: any;
  public tabs = [
    { title: 'Dealer', url: 'dealer', icon: 'home' },
    { title: 'My-Dues', url: 'my-dues', icon: 'calculator' },
    // { title: 'My-Account',  url: 'my-account', icon: 'person' },
  ];

  constructor(
    private apiService: APIService,
    private router: Router,
    private activateRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getProducts();
    this.availableBooking();
  }

  getProducts() {

    this.apiService.getProducts().toPromise().then((res) => {
      //console.log(res);
      this.data = res;
      this.list = this.data.slice(0, 4);
    }).catch((err) => {
      console.log('Error' + err);
    });

  }

  availableBooking(){
    this.apiService.getAllOrders().toPromise().then((res) => {
      console.log(res);
      this.orders = res;
      //this.orders = this.orders;
      this.orders=this.orders.slice(0,4);
    }).catch((err) => {
      console.log('Error' + err);
    });
  }

  ignore(){
    alert("Ignore");
  }

  accept(){
    alert("Accept");
  }
}
