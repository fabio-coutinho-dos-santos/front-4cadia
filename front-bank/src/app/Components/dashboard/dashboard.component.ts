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
  public currentMonth = 4
  public index = this.currentMonth + 11
  public finalBalance=0

  constructor(
    private storage:Storage,
    private router:Router,
    private userService:UserService,
    private operationService:OperationService,
    private observer:BreakpointObserver
    ) { }

  private logged = this.storage.getItem(StorageKeysTypes.LOGGED)

  ngOnInit() {

    this.router.navigate["dashboard"]

    document.getElementsByClassName('mat-tab-header-pagination-before')[0].remove();
    document.getElementsByClassName('mat-tab-header-pagination-after')[0].remove();

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
      })

    }
  }

  tabChanged = (tabChangeEvent: MatTabChangeEvent): void => {
    console.log('tabChangeEvent => ', tabChangeEvent);
    console.log('index => ', tabChangeEvent.index);
  }

  public exitApp(){
    this.storage.cleanStorage()
    this.router.navigate(["login"])
  }

}
