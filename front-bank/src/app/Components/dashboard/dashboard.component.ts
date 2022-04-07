import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { Router } from '@angular/router';
import { Storage } from '../../Untils/Storage';
import StorageKeysTypes  from "../../Untils/StorageKeyTypes"

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers:[Storage]
})
export class DashboardComponent implements OnInit {

  @ViewChild(MatSidenav,null)
  sidenav!: MatSidenav;

  constructor(
    private storage:Storage,
    private router:Router,
    private observer:BreakpointObserver
    ) { }

  private logged = this.storage.getItem(StorageKeysTypes.LOGGED)

  ngOnInit() {

    console.log(this.logged)

    if(this.logged=="FALSE"){
      this.router.navigate(["login"])
    }

    this.observer.observe(['(max-width: 800px)']).subscribe((res)=>{
      if(res.matches){
        this.sidenav.mode='over'
        this.sidenav.close()
      }else{
        this.sidenav.mode='side'
        this.sidenav.open()
      }
    });

  }

  public exitApp(){
    this.storage.cleanStorage()
    this.router.navigate(["login"])
  }

}
