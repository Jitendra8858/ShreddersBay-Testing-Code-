import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { UserApiService } from 'src/app/services/user-api.service';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.page.html',
  styleUrls: ['./booking-details.page.scss'],
})
export class BookingDetailsPage implements OnInit {
  userDetails: any;
  userId: any;
  data: any;
  bId: any;
  status: any;
  role: any;
  dealer_id: any;
  dealer_record: any;
  confirm: any;
  constructor(
    private userService: UserApiService,
    public fb: FormBuilder,
    private activateRouter: ActivatedRoute,
    private router: Router,
    private menu: MenuController,
    private alertController: AlertController
  ) { }
  ngOnInit() {
    this.userDetails = JSON.parse(localStorage.getItem('userDetails'));
    if(this.userDetails ==null){
      this.router.navigate(['frontend']);
    }
    this.userId = this.userDetails[0].id;
    // alert(this.role);
    this.bId = this.activateRouter.snapshot.params.bookingId;
    this.getOrdersById();
  }
  getOrdersById(){
    const formdata=new FormData();
    formdata.append('booking_id', this.bId);
    this.userService.getOrdersById(formdata).toPromise().then((res) => {
      this.data = res;
      this.dealer_id=this.data[0].dealer_id;
      this.getUserById(this.dealer_id);
      console.log(this.data);
    }).catch((err) => {
      console.log('Error' + err);
    });
  }




  getUserById(dealer_id: number) {
    this.userService.getUserById(dealer_id).toPromise().then((res) => {
      this.dealer_record = res;
      console.log(this.dealer_record);
    }).catch((err) => {
      console.log('Error' + err);
    });
  }

  getCancelOrders() {
    this.userService.getCancelOrders(this.bId).toPromise().then((res) => {
      this.data = res;
      console.log(this.data);
    }).catch((err) => {
      console.log('Error' + err);
    });
  }

  cancelBooking() {
    var formData= new FormData();
    formData.append('booking_id', this.bId);
    this.userService.Confirm().then((res)=>{
      this.confirm=res;
      if( this.confirm ) {
          this.userService.cancelBooking(formData).toPromise().then((res) => {
            this.data = res;
            // console.log(this.data);
            this.router.navigate(['customer-home/customer-home/my-booking']);
          }).catch((err) => {
            console.log(err.error);
          });
        }
    }).catch((err)=>
    {
      console.log(err);
    })

  }
}
