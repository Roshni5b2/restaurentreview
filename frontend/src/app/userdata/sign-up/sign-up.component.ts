import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { UserdataService } from '../../userdata.service';

// import { format } from 'path';



@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  providers: [UserdataService]
})
export class SignUpComponent implements OnInit {
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  fullnameRegex = /^[A-Za-z]+([\s][A-Za-z]+)*$/
  showSucceessMessage: boolean;
  serverErrorMessage: string;

  constructor(public userdataService: UserdataService) { }

  ngOnInit(){
}
  onSubmit(form : NgForm){
    this.userdataService.postUserdata(form.value).subscribe(
      res => {
        this.showSucceessMessage = true;
        setTimeout(() => this.showSucceessMessage = false,4000);
        this.resetForm(form);
      },
      err=> {
        if(err.status == 422){
          this.serverErrorMessage = err.error.join('<br/>');
        }
        else
          this.serverErrorMessage = 'Something went wrong';
      }
    );
  }

resetForm(form: NgForm) {
  this.userdataService.selectedUserdata = {
    _id: '',
    fullname: '',
    email: '',
    age: 0,
    phonenumber: 0,
    address: '',
    password: '',
    favouritebars: [null]
  };
  form.resetForm();
  this.serverErrorMessage = '';
}
}


