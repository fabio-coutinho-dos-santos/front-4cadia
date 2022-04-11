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
  public flagShowPassword: boolean = false;

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

     // observer used to check size screen dinamically
    // if screen < 800px reduce adjust interface element changing the css value
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

    //set this flag to crate a spinner loading in screen
    this.flagSubmit=true

    this.userService.makeLogin(this.loginForm.value.email, this.loginForm.value.password)
    .subscribe((user:User)=>{

      //update session variables TOKEN, ID_USER and LOGGED
      this.storage.setItem(StorageKeysTypes.TOKEN,user.token)
      this.storage.setItem(StorageKeysTypes.ID_USER,user._id)
      this.storage.setItem(StorageKeysTypes.LOGGED,"TRUE")

      //redirect to dashboard page
      this.router.navigate(['/dashboard']);

      //set to erase the spinner
      this.flagSubmit=false
    },(err)=>{
      alert(JSON.stringify(err.error.errors[0]))
      this.flagSubmit=false
    })
  }

  // called from click on incon in screen to show password
  public showPassword(){
    this.flagShowPassword = !this.flagShowPassword;
  }

}
