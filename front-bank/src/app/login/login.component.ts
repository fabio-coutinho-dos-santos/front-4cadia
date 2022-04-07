import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers:[UserService]
})
export class LoginComponent implements OnInit {

  public flagSubmit=false

  constructor(private userService:UserService) { }

  public loginForm: FormGroup = new FormGroup({
    'email': new FormControl(null, [Validators.required, Validators.email]),
    'password': new FormControl(null, [Validators.required])
  })

  ngOnInit() {



  }

  public submitCredentials(){
    this.flagSubmit=true
    this.userService.makeLogin(this.loginForm.value.email, this.loginForm.value.password)
    .subscribe((resp)=>{
      console.log(resp)
    })

  }

}
