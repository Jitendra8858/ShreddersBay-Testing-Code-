import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
const userURL = 'http://localhost:8000/SHREDDERSBAY_API/API/user_api.php?action=';
const prodURL = 'http://localhost:8000/SHREDDERSBAY_API/API/product_api.php?action=';
const cartURL = 'http://localhost:8000/SHREDDERSBAY_API/API/cart_api.php?action=';
const orderURL = 'http://localhost:8000/SHREDDERSBAY_API/API/orders_api.php?action=';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  httpHeaders: { headers: HttpHeaders; };
  constructor(private http: HttpClient) {
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
}
