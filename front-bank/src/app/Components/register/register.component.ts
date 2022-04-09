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
  private

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
    this.userService.makeRegister(
      this.registerForm.value.name,
      this.registerForm.value.email,
      this.registerForm.value.password,
      this.registerForm.value.confirmPassword
      )
    .subscribe((user:User)=>{
      this.storage.setItem(StorageKeysTypes.TOKEN,user.token)
      this.storage.setItem(StorageKeysTypes.ID_USER,user._id)
      this.storage.setItem(StorageKeysTypes.LOGGED,"TRUE")
      this.flagSubmit=false
      this.router.navigate(['/dashboard']);
    },(err)=>{
      alert(JSON.stringify(err.error.errors[0]))
      this.flagSubmit=false
    })
  }
}
