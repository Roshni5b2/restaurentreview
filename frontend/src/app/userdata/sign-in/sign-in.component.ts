import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar'
import { UserdataService } from '../../userdata.service';
import {Userdata} from '../../userdata.model';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit { 

  constructor(private userdataService: UserdataService, private router: Router) { }
  model={
    email:'', 
    password:'',
    id:''
  }
userdata;
  id: String;
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  serverErrorMessages: string;
  ngOnInit(): void {
  }
  
onSubmit(form: NgForm){
  this.userdataService.login(form.value).subscribe(
    res => {
    this.router.navigateByUrl('/userprofile');
    this.userdataService.putCurrUser(res['dataofnow'][0]);
     },
      err => {
        this.serverErrorMessages = err.error.message;
      }
    );
  }
}