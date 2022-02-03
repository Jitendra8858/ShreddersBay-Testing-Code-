import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
const userURL = 'http://shreddersbay.com/shreddersbayapi/API/user_api.php?action=';
const prodURL = 'http://shreddersbay.com/shreddersbayapi/API/product_api.php?action=';
const cartURL = 'http://shreddersbay.com/shreddersbayapi/API/cart_api.php?action=';
const orderURL = 'http://shreddersbay.com/shreddersbayapi/API/orders_api.php?action=';
const addrURL = 'http://shreddersbay.com/shreddersbayapi/API/address_api.php?action=';
const countryURL = 'http://shreddersbay.com/shreddersbayapi/API/country_api.php?action=';
const stateURL = 'http://shreddersbay.com/shreddersbayapi/API/state_api.php?action=';
const cityURL = 'http://shreddersbay.com/shreddersbayapi/API/city_api.php?action=';
const areaURL = 'http://shreddersbay.com/shreddersbayapi/API/area_api.php?action=';
const addressURL = 'http://shreddersbay.com/shreddersbayapi/API/address_api.php?action=';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  httpHeaders: { headers: HttpHeaders; };
  constructor(private http: HttpClient, private alertController: AlertController, private toastCtrl: ToastController) {
    this.httpHeaders = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }   }

  getAll(): Observable<any> {
    return this.http.get(`${userURL}select`);
  }
  //insert user
  create(myFormData): Observable<any> {
    return this.http.post(`${userURL}insert`, myFormData)
  }
  //select user
  forgetPassword(myFormData): Observable<any> {
    return this.http.post(`${userURL}forget_pass`, myFormData)
  }
 //select single user by id
 getUserById(id: number): Observable<any> {
  return this.http.get(`${userURL}select_id&user_id=${id}`)
}
  //select user
  getByUserInfo(myFormData): Observable<any> {
    return this.http.post(`${userURL}user_info`, myFormData)
  }

    //select Address By user Id
    getAddressById(id): Observable<any> {
      return this.http.get(`${addrURL}select_id&addr_id=${id}`);
    }
      //select Address By user Id
  delAddressById(formData): Observable<any> {
    return this.http.post(`${addrURL}delete&addr_id`,formData);
  }

  //select product
  getProducts(): Observable<any> {
    return this.http.get(`${prodURL}select`);
  }
  //select user
  getProdById(id: number): Observable<any> {
    return this.http.get(`${prodURL}select_id&p_id=${id}`)
  }

  createCart(myFormData){
    return this.http.post(`${cartURL}insert`, myFormData)
  }

  getCartById(id: number): Observable<any> {
    return this.http.get(`${cartURL}select_id&user_id=${id}`)
  }
  deleteItem(id: number): Observable<any> {
    return this.http.delete(`${cartURL}delete&cart_id=${id}`)
  }
  createOrder(myFormData){
    return this.http.post(`${orderURL}insert`, myFormData)
  }

  getCurOrders(id: number): Observable<any> {
    return this.http.get(`${orderURL}select_current&user_id=${id}`)
  }

  getCanOrders(id: number): Observable<any> {
    return this.http.get(`${orderURL}select_cancel&user_id=${id}`)
  }

  getCompOrders(id: number): Observable<any> {
    return this.http.get(`${orderURL}select_complete&user_id=${id}`)
  }

  getCurrentOrders(id: number): Observable<any> {
    return this.http.get(`${orderURL}selectCustomerCurrent&user_id=${id}`)
  }

  getCompleteOrders(id: number): Observable<any> {
    return this.http.get(`${orderURL}selectCustomerComplete&user_id=${id}`)
  }

  getCancelOrders(id: number): Observable<any> {
    return this.http.get(`${orderURL}selectCustomerCancel&user_id=${id}`)
  }

  getOrdersById(id: number): Observable<any> {
    return this.http.get(`${orderURL}select_id&book_id=${id}`)
  }

  updateStatus(myFormData): Observable<any> {
    return this.http.post(`${orderURL}accept`,myFormData)
  }

  cancel(formData): Observable<any> {
    return this.http.post(`${orderURL}cancel`, formData)
  }

  completed(formData){
    return this.http.post(`${orderURL}complete`, formData)
  }

  cancelBooking(formData): Observable<any> {
    return this.http.post(`${orderURL}customer_cancel`,formData)
  }

  getAllOrders(): Observable<any> {
    return this.http.get(`${orderURL}select`);
  }

  //select Address By user Id
  getAddress(id: number): Observable<any> {
    return this.http.get(`${addrURL}AddrByUserId&user_id=${id}`);
  }

  getCountry(): Observable<any> {
    return this.http.get(`${countryURL}select`);
  }

  getState(id): Observable<any> {
    return this.http.get(`${stateURL}select&country_id=${id}`);
  }
  getCity(id): Observable<any> {
    return this.http.get(`${cityURL}select&state_id=${id}`);
  }
  getArea(id): Observable<any> {
    return this.http.get(`${areaURL}select&city_id=${id}`);
  }
  addAddress(myFormData): Observable<any> {
    return this.http.post(`${addressURL}insert`, myFormData)
  }

  async Confirm() {
    return new Promise(async (resolve) => {
      const confirm = await this.alertController.create({
        header: 'Confirm Alert',
      subHeader: 'Beware lets confirm',
      message: 'Are you sure? You Want To Cancel Booking?',
        buttons: [
          {
            text: 'Never',
            role: 'cancel',
            handler: () => {
              return resolve(false);
            },
          },
          {
            text: 'Yes!',
            handler: () => {
              return resolve(true);
            },
          },
        ],
      });

      await confirm.present();
    });
  }

  async Alert(message) {
    return new Promise(async (resolve) => {
      const alert = await this.alertController.create({
        header: 'Alert',
      subHeader: 'Beware lets Alert',
      message: message,
        buttons: [
          {
            text: 'OK',
            handler: () => {
              return resolve(true);
            },
          },
        ],
      });

      await alert.present();
    });
  }


  async openToast(message) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      cssClass: 'toast-custom-class',
    });
    toast.present();
  }



}
