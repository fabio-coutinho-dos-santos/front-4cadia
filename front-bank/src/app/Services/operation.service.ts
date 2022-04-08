import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { Contants } from '../constants'
import Operation from '../Models/Operation';

@Injectable({
  providedIn: 'root'
})
export class OperationService {

  constructor(private http:HttpClient) { }

  public getBalance (token:string) : Observable<Object>{

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization':token
      })
  }

  return this.http.get(
      `${ Contants.URL_DEV }/api/operation/balance`,
      httpOptions
  )
  .pipe(map((resp:Object)=>resp))
  }


  public getStatementByDate (month:string, year:string, token:string) : Observable<Operation[]>{

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization':token
      })
  }

  return this.http.get(
      `${ Contants.URL_DEV }/api/operation/getStatementByDate?month=${month}&year=${year}`,
      httpOptions
  )
  .pipe(map((resp:Operation[])=>resp))
  }

}
