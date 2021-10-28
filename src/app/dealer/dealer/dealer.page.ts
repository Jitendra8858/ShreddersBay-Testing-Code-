import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AnyRecord } from 'dns';
import { APIService } from 'src/app/services/api.service';

@Component({
  selector: 'app-dealer',
  templateUrl: './dealer.page.html',
  styleUrls: ['./dealer.page.scss'],
})
export class DealerPage implements OnInit {
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

}
