import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NavParams } from '@ionic/angular';
import { APIService } from '../services/api.service';
import { UserApiService } from '../services/user-api.service';
@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.page.html',
  styleUrls: ['./faqs.page.scss'],
})
export class FaqsPage implements OnInit {
  role: any;
  data: any;
  list: any;
  faqArr: any;
  show: any;
  constructor(
    private userService: UserApiService,
    private router: Router,
    private activateRoute: ActivatedRoute) { }


  ngOnInit() {

    this.faqArr = [
      {
      question: 'Question 1',
      answer: 'Answer 1'
    },
    {
      question: 'Question 2',
      answer: 'Answer 2'
    },
    {
      question: 'Question 3',
      answer: 'Answer 3'
    }
  ];
  }

  showOrDont(index) {
    if(index !== this.show) {
      this.show = index;
    } else {
      this.show=undefined;
    }
  }
}
