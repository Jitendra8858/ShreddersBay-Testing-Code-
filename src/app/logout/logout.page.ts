import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
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
    private activateRoute: ActivatedRoute,
    private toastCtrl: ToastController,
  ) { }

  ngOnInit() {
    localStorage.removeItem('userDetails');
    localStorage.clear();
    this.openToast();
    this.router.navigate(['/frontend']);
  }

  async openToast() {
    const toast = await this.toastCtrl.create({
      message: 'Logout SuccessFully...',
      duration: 2000,
      cssClass: 'toast-custom-class',
    });
    toast.present();
  }

}
