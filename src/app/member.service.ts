import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private http:HttpClient) { }

  apiUrl= "http://locahost:3000/"


  createProfile(data:any):Observable<any>{
    return this.http.post(`${this.apiUrl}/profile`, data);
  }

  updateProfile(data:any, id:any):Observable<any>{
    let ids= id;
    return this.http.put(`${this.apiUrl}/profile/${ids}`, data);
  }

  deleteProfile(id:any):Observable<any>{
    let ids= id;
    return this.http.delete(`${this.apiUrl}/profile/${ids}`);
  }

  getMyProfile(id:any):Observable<any>{
    let ids= id;
    return this.http.get(`${this.apiUrl}/profile/${ids}`);
  }

  getMemberDetails():Observable<any>{
    return this.http.get(`${this.apiUrl}/profile`);
  }

}