import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const selectUser = 'http://localhost:8000/SHREDDERSBAY_API/API/user_api.php?action=select';
const insertUrl = 'http://localhost:8000/SHREDDERSBAY_API/API/user_api.php?action=insert';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(`${selectUser}`);
  }
  //insert user
  create(data: any): Observable<any> {
    console.log(data);
    return this.http.post(`${insertUrl}`, data);
  }
}
