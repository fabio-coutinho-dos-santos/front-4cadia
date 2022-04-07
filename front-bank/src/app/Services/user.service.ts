import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { Contants } from '../constants'

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http: HttpClient) { }

  public makeLogin (email:string,password:string) : Observable<any>{

    console.log(email)
    console.log(password)
    let url = Contants.URL_DEV

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
      // "http://192.168.176.3:3000/oapi/login",
      JSON.stringify(jsonObjset),
      httpOptions
  )
  .pipe(map((resp:any)=>resp))

  }
}
