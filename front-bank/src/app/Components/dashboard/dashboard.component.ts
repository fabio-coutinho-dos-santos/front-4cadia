import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
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
  public currentMonth = 0
  public indexTab = 0
  public finalBalance=0
  public operations:Operation[]=[]


  constructor(
    private storage:Storage,
    private router:Router,
    private userService:UserService,
    private operationService:OperationService,
    private observer:BreakpointObserver
    ) { }

  private logged = this.storage.getItem(StorageKeysTypes.LOGGED)

  public getIndexCurrentMonth(date:string){
    let aux = date.split("/")
    return aux[0]
  }

  ngOnInit() {

    this.router.navigate["dashboard"]

    // functions used to run tabs in scroll mode
    document.getElementsByClassName('mat-tab-header-pagination-before')[0].remove();
    document.getElementsByClassName('mat-tab-header-pagination-after')[0].remove();

    this.currentMonth = parseInt(this.getIndexCurrentMonth(moment().format('l')))
    this.indexTab = this.currentMonth + 11

    if(this.logged=="FALSE"){
      this.router.navigate(["login"])
    }else{
      this.observer.observe(['(max-width: 800px)']).subscribe((res)=>{
        if(res.matches){
          this.sidenav.mode='over'
          this.sidenav.close()
        }else{
          this.sidenav.mode='side'
          this.sidenav.open()
        }
      });

      this.userService.getUserById(
        this.storage.getItem(StorageKeysTypes.ID_USER),
        this.storage.getItem(StorageKeysTypes.TOKEN))
      .subscribe((user:User)=>{
        this.flagLoadingInformations=true
        this.currentUser=user
      },(err)=>{
        alert(JSON.stringify(err.error.errors[0]))
      })

      this.operationService.getBalance(this.storage.getItem(StorageKeysTypes.TOKEN))
      .subscribe((resp:any)=>{
        this.finalBalance=resp.balance
      },(err)=>{
        alert(JSON.stringify(err.error.errors[0]))
      })

      this.operationService.getStatementByDate("06","2022",this.storage.getItem(StorageKeysTypes.TOKEN))
      .subscribe((operations:Operation[])=>{

      },(err)=>{
        alert(JSON.stringify(err.error.errors[0]))
      })

    }
  }

  public tabChanged = (tabChangeEvent: MatTabChangeEvent): void => {
    console.log('tabChangeEvent => ', tabChangeEvent);
    console.log('index => ', tabChangeEvent.index);
  }

  public exitApp(){
    this.storage.cleanStorage()
    this.router.navigate(["login"])
  }

}
