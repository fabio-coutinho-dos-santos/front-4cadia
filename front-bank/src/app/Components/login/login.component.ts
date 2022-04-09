import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    private router:Router,
    private observer:BreakpointObserver,
    private elementRef:ElementRef,
    private storage:Storage
    ) { }

  public loginForm: FormGroup = new FormGroup({
    'email': new FormControl(null, [Validators.required, Validators.email]),
    'password': new FormControl(null, [Validators.required])
  })

  ngOnInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((res)=>{
      if(res.matches){
        this.elementRef.nativeElement.style.setProperty('--heigh-css', "40%");
        this.elementRef.nativeElement.style.setProperty('--margin-top-css', "5%");
      }else{
        this.elementRef.nativeElement.style.setProperty('--heigh-css', "100%");
        this.elementRef.nativeElement.style.setProperty('--margin-top-css', "20%");
      }
    });
  }


  public submitCredentials(){
    this.flagSubmit=true
    this.userService.makeLogin(this.loginForm.value.email, this.loginForm.value.password)
    .subscribe((user:User)=>{
      this.storage.setItem(StorageKeysTypes.TOKEN,user.token)
      this.storage.setItem(StorageKeysTypes.ID_USER,user._id)
      this.storage.setItem(StorageKeysTypes.LOGGED,"TRUE")
      this.router.navigate(['/dashboard']);
    },(err)=>{
      alert(JSON.stringify(err.error.errors[0]))
    })
  }

}
