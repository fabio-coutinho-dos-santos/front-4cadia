import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { Contants } from '../constants'
import { User } from '../Models/User';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http: HttpClient) { }

  public makeLogin (email:string,password:string) : Observable<User>{

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
  }

  let jsonObjset = {
    email:email,
    password:password
  }

  return this.http.post(
      `${ Contants.URL_DEV }/oapi/login`,
      JSON.stringify(jsonObjset),
      httpOptions
  )
  .pipe(map((resp:User)=>resp))
  }

  public validateToken (token:string) : Observable<any>{

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
  }

  let jsonObjset = {
    token:token
  }

  return this.http.post(
      `${ Contants.URL_DEV }/oapi/validateToken`,
      JSON.stringify(jsonObjset),
      httpOptions
  )
  .pipe(map((resp:any)=>resp))
  }
}
