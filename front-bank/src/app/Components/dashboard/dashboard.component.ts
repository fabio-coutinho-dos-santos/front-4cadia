import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSidenav, MatTabChangeEvent } from '@angular/material';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/User';
import { UserService } from 'src/app/Services/user.service';
import { Storage } from '../../Untils/Storage';
import StorageKeysTypes  from "../../Untils/StorageKeyTypes"
import Months from 'src/app/Untils/Months';
import { OperationService } from 'src/app/Services/operation.service';
import * as moment from 'moment';
import Operation from 'src/app/Models/Operation';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers:[Storage,UserService,OperationService]
})

export class DashboardComponent implements OnInit {

  @ViewChild(MatSidenav,null)
  sidenav!: MatSidenav;

  public currentUser:User
  public months = Months
  public flagLoadingInformations=false
  public currentMonth = ""
  public currentYear = ""
  public screenMonth=""
  public indexTab = 0
  public finalBalance=0
  public operations:Operation[]=[]
  public flagLoadingStatement=false
  public sumBalanceMonth=0

  constructor(
    private storage:Storage,
    private router:Router,
    private elementRef:ElementRef,
    private userService:UserService,
    private operationService:OperationService,
    private observer:BreakpointObserver
    ) { }

  private logged = this.storage.getItem(StorageKeysTypes.LOGGED)

  ngOnInit() {

    this.router.navigate["dashboard"]

    // functions used to run tabs in scroll mode
    document.getElementsByClassName('mat-tab-header-pagination-before')[0].remove();
    document.getElementsByClassName('mat-tab-header-pagination-after')[0].remove();

    this.currentMonth = this.getIndexCurrentMonth(moment().format('l'))
    this.currentYear = this.getIndexCurrentYear(moment().format('l'))
    this.indexTab = parseInt(this.currentMonth) + 11
    this.screenMonth = this.getMonthAndYearCurrent()

    if(this.logged=="FALSE"){
      this.router.navigate(["login"])
    }else{
      this.observer.observe(['(max-width: 800px)']).subscribe((res)=>{
        if(res.matches){
          this.sidenav.mode='over'
          this.sidenav.close()
          this.elementRef.nativeElement.style.setProperty('--padding-css', "5%");
        }else{
          this.sidenav.mode='side'
          this.sidenav.open()
          this.elementRef.nativeElement.style.setProperty('--padding-css', "20%");
        }
      });

      this.getUserById()
      this.getBalanceOperations()
      this.getStatementByDate(this.currentMonth,this.currentYear)
    }
  }

  public getMonthAndYearCurrent(){
    let dateScreen = moment().format('MMMM').substring(0,3)
    dateScreen+="/"
    dateScreen+=moment().format('YYYY').substring(2,4)
    return dateScreen
  }

  public getUserById(){
    this.userService.getUserById(
      this.storage.getItem(StorageKeysTypes.ID_USER),
      this.storage.getItem(StorageKeysTypes.TOKEN))
    .subscribe((user:User)=>{
      this.flagLoadingInformations=true
      this.currentUser=user
    },(err)=>{
      alert(JSON.stringify(err.error.errors[0]))
    })
  }

  public getBalanceOperations(){
    this.operationService.getBalance(this.storage.getItem(StorageKeysTypes.TOKEN),this.storage.getItem(StorageKeysTypes.ID_USER))
    .subscribe((resp:any)=>{
      this.finalBalance=resp.balance
    },(err)=>{
      alert(JSON.stringify(err.error.errors[0]))
    })
  }

  public getStatementByDate(month:string,year:string){
    this.flagLoadingStatement=false
    this.operationService.getStatementByDate(month,year,this.storage.getItem(StorageKeysTypes.TOKEN),this.storage.getItem(StorageKeysTypes.ID_USER))
    .subscribe((operations:Operation[])=>{
      this.operations=operations
      this.sumBalanceMonth = this.buildStatementByDay()
      this.flagLoadingStatement=true
    },(err)=>{
      alert(JSON.stringify(err.error.errors[0]))
    })

  }

  public buildStatementByDay(){
    let sum=0
    for(let operation of this.operations){
      if(operation.type === "Credit"){
        sum+=parseFloat(operation.amount)
      }else{
        sum-=parseFloat(operation.amount)
      }
    }
    return sum
  }

  public getIndexCurrentMonth(date:string){
    let aux = date.split("/")
    let month = aux[0]
    if (parseInt(month) < 10){
      month = "0"+month
    }
    return month
  }

  public getIndexCurrentYear(date:string){
    let aux = date.split("/")
    return aux[2]
  }

  // ============================================================================ Functions called by screen ========================================================================================

  public tabChanged (tabChangeEvent: MatTabChangeEvent){
    this.screenMonth = tabChangeEvent.tab.textLabel
    let textLabelTab = tabChangeEvent.tab.textLabel
    let year = this.getYearFromTab(textLabelTab)
    let month = this.getMonth(year,tabChangeEvent.index)

    this.getStatementByDate(month,year)
  }

  public getYearFromTab(textLabelTab:string){
    let aux = textLabelTab.split("/")
    return "20"+aux[1]
  }

  public getMonth(year:string, index:number){
    let month=0
    let monthString=""
    if(year == "2021"){
      month = index+1
    }else if(year == "2022"){
      month = index-11
    }

    if(month<10){
      monthString = "0"+month.toString()
    }else{
      monthString = month.toString()
    }

    return monthString
  }

  public exitApp(){
    this.storage.cleanStorage()
    this.router.navigate(["login"])
  }
  // ============================================================================================================================================================================================


}
