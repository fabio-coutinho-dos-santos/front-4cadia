import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/User';
import { UserService } from 'src/app/Services/user.service';
import { Storage } from '../../Untils/Storage';
import StorageKeysTypes  from "../../Untils/StorageKeyTypes"

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers:[Storage,UserService]
})
export class DashboardComponent implements OnInit {

  @ViewChild(MatSidenav,null)
  sidenav!: MatSidenav;

  public currentUser:User

  constructor(
    private storage:Storage,
    private router:Router,
    private userService:UserService,
    private observer:BreakpointObserver
    ) { }

  private logged = this.storage.getItem(StorageKeysTypes.LOGGED)

  ngOnInit() {

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
        this.currentUser=user
      },(err)=>{
        alert(JSON.stringify(err.error.errors[0]))
      })
    }
  }

  public exitApp(){
    this.storage.cleanStorage()
    this.router.navigate(["login"])
  }

}
