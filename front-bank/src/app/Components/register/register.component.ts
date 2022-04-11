import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  public flagShowPassword: boolean = false;
  public flagShowConfirmPassword: boolean = false;


  constructor(
    private userService:UserService,
    private router:Router,
    private observer:BreakpointObserver,
    private elementRef:ElementRef,
    private storage:Storage
    ) { }

  public registerForm: FormGroup = new FormGroup({
    'name': new FormControl(null, [Validators.required]),
    'email': new FormControl(null, [Validators.required, Validators.email]),
    'password': new FormControl(null, [Validators.required]),
    'confirmPassword': new FormControl(null, [Validators.required])
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


    this.userService.makeRegister(
      this.registerForm.value.name,
      this.registerForm.value.email,
      this.registerForm.value.password,
      this.registerForm.value.confirmPassword
      )
    .subscribe((user:User)=>{

      //update session variables TOKEN, ID_USER and LOGGED
      this.storage.setItem(StorageKeysTypes.TOKEN,user.token)
      this.storage.setItem(StorageKeysTypes.ID_USER,user._id)
      this.storage.setItem(StorageKeysTypes.LOGGED,"TRUE")

      //set to erase the spinner
      this.flagSubmit=false

      //redirect to dashboard page
      this.router.navigate(['/dashboard']);
    },(err)=>{
      alert(JSON.stringify(err.error.errors[0]))
      this.flagSubmit=false
    })
  }


  // called from click on incon in screen to show password
  public showPassword(){
    this.flagShowPassword = !this.flagShowPassword;
  }

  // called from click on incon in screen to show password
  public showConfirmPassword(){
    this.flagShowConfirmPassword = ! this.flagShowConfirmPassword
  }
}
