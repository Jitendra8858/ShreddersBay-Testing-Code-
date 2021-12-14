import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
const userURL = 'http://localhost:8000/SHREDDERSBAY_API/API/user_api.php?action=';
const prodURL = 'http://localhost:8000/SHREDDERSBAY_API/API/product_api.php?action=';
const cartURL = 'http://localhost:8000/SHREDDERSBAY_API/API/cart_api.php?action=';
const orderURL = 'http://localhost:8000/SHREDDERSBAY_API/API/orders_api.php?action=';
const addrURL = 'http://localhost:8000/SHREDDERSBAY_API/API/address_api.php?action=';
const countryURL = 'http://localhost:8000/SHREDDERSBAY_API/API/country_api.php?action=';
const stateURL = 'http://localhost:8000/SHREDDERSBAY_API/API/state_api.php?action=';
const cityURL = 'http://localhost:8000/SHREDDERSBAY_API/API/city_api.php?action=';
const areaURL = 'http://localhost:8000/SHREDDERSBAY_API/API/area_api.php?action=';
const addressURL = 'http://localhost:8000/SHREDDERSBAY_API/API/address_api.php?action=';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  httpHeaders: { headers: HttpHeaders; };
  constructor(private http: HttpClient, private alertController: AlertController) {
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
 //select single user by id
 getUserById(id: number): Observable<any> {
  return this.http.get(`${userURL}select_id&user_id=${id}`)
}
  //select user
  getByUserInfo(myFormData): Observable<any> {
    return this.http.post(`${userURL}user_info`, myFormData)
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

  updateStatus(id, myFormData): Observable<any> {
    return this.http.post(`${orderURL}accept&user_id=${id}`, myFormData)
  }

  cancel(id: number): Observable<any> {
    return this.http.get(`${orderURL}cancel&booking_id=${id}`)
  }

  completed(id){
    return this.http.get(`${orderURL}complete&booking_id=${id}`)
  }

  cancelBooking(id: number): Observable<any> {
    return this.http.get(`${orderURL}customer_cancel&booking_id=${id}`)
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
  addAddress(id, myFormData): Observable<any> {
    return this.http.post(`${addressURL}insert&user_id=${id}`, myFormData)
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
}
