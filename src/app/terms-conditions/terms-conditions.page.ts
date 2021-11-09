import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { APIService } from '../services/api.service';
@Component({
  selector: 'app-terms-conditions',
  templateUrl: './terms-conditions.page.html',
  styleUrls: ['./terms-conditions.page.scss'],
})
export class TermsConditionsPage implements OnInit {
  role: any;
  data: any;
  constructor(
    private apiService: APIService,
    private router: Router,
    private activateRoute: ActivatedRoute) { }
  ngOnInit() {
    this.getTermsConditions();

  }
  getTermsConditions() {

    // this.apiService.getTermsConditions().toPromise().then((res) => {
    //   console.log(res);
    //   this.data = res[0].description;
    // }).catch((err) => {
    //   console.log('Error' + err);
    // });

  }

}
