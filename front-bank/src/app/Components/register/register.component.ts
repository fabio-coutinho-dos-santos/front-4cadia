import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/Services/user.service';
import { User } from '../../Models/User';
import { Storage } from '../../Untils/Storage';
import StorageKeysTypes  from "../../Untils/StorageKeyTypes"


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers:[UserService,Storage]
})
export class RegisterComponent implements OnInit {

  public flagSubmit=false
  private

  constructor(
    private userService:UserService,
    private storage:Storage
    ) { }

  public registerForm: FormGroup = new FormGroup({
    'name': new FormControl(null, [Validators.required, Validators.email]),
    'email': new FormControl(null, [Validators.required, Validators.email]),
    'password': new FormControl(null, [Validators.required]),
    'confirmPassword': new FormControl(null, [Validators.required])
  })

  ngOnInit() {}

  public submitCredentials(){
    this.flagSubmit=true
    this.userService.makeLogin(this.registerForm.value.email, this.registerForm.value.password)
    .subscribe((user:User)=>{
      this.storage.setItem(StorageKeysTypes.TOKEN,user.token)
      this.storage.setItem(StorageKeysTypes.ID_USER,user._id)
      window.location.reload()
    },(err)=>{
      alert(JSON.stringify(err.error.errors[0]))
    })
  }
}
