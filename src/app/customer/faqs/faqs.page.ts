import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NavParams } from '@ionic/angular';
import { APIService } from '../../services/api.service';
@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.page.html',
  styleUrls: ['./faqs.page.scss'],
})
export class FaqsPage implements OnInit {
  role: any;
  data: any;
  list: any;
  constructor(
    private apiService: APIService,
    private router: Router,
    private activateRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getFaqs();

  }

  getFaqs(){

    this.apiService.getFaqs().toPromise().then((res) => {
      console.log(res);
      this.data=res;
    }).catch((err)=> {
      console.log('Error' + err);
    });

  }

}
