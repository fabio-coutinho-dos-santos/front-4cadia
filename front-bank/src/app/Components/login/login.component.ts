import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../Models/User';
import { UserService } from '../../Services/user.service';
import { Storage } from '../../Untils/Storage';
import StorageKeysTypes  from "../../Untils/StorageKeyTypes"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers:[UserService,Storage]
})
export class LoginComponent implements OnInit {

  public flagSubmit=false
  private

  constructor(
    private userService:UserService,
    private storage:Storage
    ) { }

  public loginForm: FormGroup = new FormGroup({
    'email': new FormControl(null, [Validators.required, Validators.email]),
    'password': new FormControl(null, [Validators.required])
  })

  ngOnInit() {}

  public submitCredentials(){
    this.flagSubmit=true
    this.userService.makeLogin(this.loginForm.value.email, this.loginForm.value.password)
    .subscribe((user:User)=>{
      this.storage.setItem(StorageKeysTypes.TOKEN,user.token)
      this.storage.setItem(StorageKeysTypes.ID_USER,user._id)
      window.location.reload()
    },(err)=>{
      alert(JSON.stringify(err.error.errors[0]))
    })
  }

}
