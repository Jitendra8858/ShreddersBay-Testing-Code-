import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
const selectUser = 'http://localhost:8000/SHREDDERSBAY_API/API/user_api.php?action=select';
const insertUser = 'http://localhost:8000/SHREDDERSBAY_API/API/user_api.php?action=insert';


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
    return this.http.get(selectUser);
  }
  //insert user
  create(myFormData): Observable<any> {
    return this.http.post('http://localhost:8000/SHREDDERSBAY_API/API/user_api.php?action=insert'
      , myFormData)
  }

}
