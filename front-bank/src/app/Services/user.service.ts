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
      `${ Contants.URL_DEV }/api/user/login`,
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
      `${ Contants.URL_DEV }/api/user/validateToken`,
      JSON.stringify(jsonObjset),
      httpOptions
  )
  .pipe(map((resp:any)=>resp))
  }

  public makeRegister (name:string,email:string,password:string,confirmPassword:string) : Observable<User>{

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
  }

  let jsonObjset = {
    name:name,
    email:email,
    password:password,
    confirmPassword:confirmPassword
  }

  return this.http.post(
      `${ Contants.URL_DEV }/api/user/register`,
      JSON.stringify(jsonObjset),
      httpOptions
  )
  .pipe(map((resp:User)=>resp))
  }

  public getUserById (id:string,token:string) : Observable<User>{

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization':token
      })
  }

  return this.http.get(
      `${ Contants.URL_DEV }/api/user/${id}`,
      httpOptions
  )
  .pipe(map((resp:User)=>resp))
  }

}
