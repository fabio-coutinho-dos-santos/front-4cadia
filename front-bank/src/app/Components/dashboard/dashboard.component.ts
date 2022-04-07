import { Component, OnInit } from '@angular/core';
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

  constructor(private storage:Storage, private router:Router) { }

  private logged = this.storage.getItem(StorageKeysTypes.LOGGED)

  ngOnInit() {

    console.log(this.logged)

    if(this.logged=="FALSE"){
      this.router.navigate(["login"])
    }

  }

}
