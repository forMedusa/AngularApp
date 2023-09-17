import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor(private http: HttpClient,
    private cookies:CookieService) { }
  postUrl = 'http://localhost:3000/user';
  updateUrl = 'http://localhost:3000/user/'
  userData:any;
  updateUserId = this.cookies.get('id');
  postUsers(data:any):Observable<any>{
    return this.http.post(this.postUrl,data);
  }
  getUsers():Observable<any>{
    return this.http.get(this.postUrl);
  }
  updateUser(data:any):Observable<any>{
    return this.http.put(this.updateUrl+this.updateUserId,data);
  }
  deleteUser():Observable<any>{
    return this.http.delete(this.updateUrl+this.updateUserId);
  }
  sendData():Observable<any>{
    return this.userData;
  }
}
