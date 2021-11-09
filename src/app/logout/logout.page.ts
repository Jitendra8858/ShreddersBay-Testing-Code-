import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { APIService } from '../services/api.service';
@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  constructor(
    private apiService: APIService,
    private router: Router,
    public fb: FormBuilder,
    private activateRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    sessionStorage.removeItem('userDetails');
    sessionStorage.clear();
    this.router.navigate(['']);
    this.logout();

  }
  logout() {
    sessionStorage.removeItem('userDetails');
    sessionStorage.clear();
    this.router.navigate(['']);


  }
}
