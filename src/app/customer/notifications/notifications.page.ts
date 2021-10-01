import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { APIService } from '../../services/api.service';
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  role: any;
  data: any;
  constructor(
    private apiService: APIService,
    private router: Router,
    private activateRoute: ActivatedRoute) { }
  ngOnInit() {
    this.getNotifications();

  }
  getNotifications() {

    this.apiService.getNotifications().toPromise().then((res) => {
      console.log(res);
      this.data = res;
    }).catch((err) => {
      console.log('Error' + err);
    });

  }
}
