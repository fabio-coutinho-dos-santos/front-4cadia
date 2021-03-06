import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './Services/user.service';
import { Storage } from "./Untils/Storage";
import StorageKeysTypes  from "./Untils/StorageKeyTypes"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers:[UserService,Storage]
})
export class AppComponent implements OnInit{
  title = 'front-bank';
  public statusLogged=''
  private token=''

  constructor(
    private userService:UserService,
    private router:Router,
    private storage:Storage){
  }

  ngOnInit(): void {
    this.statusLogged = this.storage.getItem(StorageKeysTypes.LOGGED)
    this.token = this.storage.getItem(StorageKeysTypes.TOKEN)
    this.userService.validateToken(this.token)
    .subscribe((resp)=>{
      if(resp.valid){
        this.goToDashboard()
      }else{
        this.storage.setItem(StorageKeysTypes.LOGGED,"FALSE")
      }
    },(err)=>{
      console.log(err)
    })
  }

  public goToDashboard(){
    this.storage.setItem(StorageKeysTypes.LOGGED,"TRUE")
    this.router.navigate(['/dashboard']);
  }

  }
