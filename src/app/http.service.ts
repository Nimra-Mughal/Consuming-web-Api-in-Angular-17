import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IEmployee } from './interface/employee';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  apiurl="https://localhost:7045/api/Student/";
  http=inject(HttpClient);
  constructor() { }
  getallemployee(){
   return this.http.get<IEmployee[]>(this.apiurl)
  }
  createemployee(employee:IEmployee){
    return this.http.post(this.apiurl,employee);
  }
  getemployee(employeeid:number){
    return this.http.get<IEmployee>(this.apiurl+employeeid)
   }
   updateemployee(employeeid:number,employee:IEmployee){
    return this.http.put<IEmployee>(this.apiurl+employeeid,employee)
   }
   deleteemployee(employeeid:number){
    return this.http.delete(this.apiurl+employeeid);
   }
}
