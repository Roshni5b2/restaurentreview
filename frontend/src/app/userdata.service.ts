import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Userdata } from './userdata.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserdataService {
  uri = 'http://localhost:4000';
  selectedUserdata: Userdata = {
    _id: '',
    fullname: '',
    email: '',
    age: null,
    phonenumber: null,
    address: '',
    password: '',
    favouritebars: [null]
  }
  currentUser:any
  constructor(private http: HttpClient) { }

  postUserdata(userdata: Userdata){
   return this.http.post(environment.apiBaseUrl+'/signup',userdata);
  }

  login(authCredentials){
    return this.http.post(environment.apiBaseUrl+'/login',authCredentials);
  }

  getUserprofile(){
    return this.http.get(environment.apiBaseUrl+'/userprofile');
  }

putCurrUser(userobj){
  this.currentUser=userobj;
}
getCurrUser(){
  return this.currentUser;
}
isLoggedIn(){
  var currentuser = this.getCurrUser();
  if(currentuser)
    return currentuser;
  else
    return false;
}

deleteUser(){
  var currentuser = this.getCurrUser();
  if(currentuser)
    return null;
  else
    return false;
}

updatefavbar(shopid,uid){
  const issue={
    shopid:shopid
  }
  return this.http.post(`${this.uri}/userprofile/updatefavbar/${uid}`,issue);
}

removefavbar(shopid,uid){
  const issue={
    shopid:shopid
  }
  return this.http.post(`${this.uri}/userprofile/removefavbar/${uid}`,issue);
}

checkbar(cid,uid){
  const issue={
    uid:uid
  }
  return this.http.post(`${this.uri}/userprofile/findfavbar/${uid}`,issue);
}
}

