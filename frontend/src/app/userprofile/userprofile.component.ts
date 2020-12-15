import { Component, OnInit } from '@angular/core';
import {Userdata} from '../userdata.model';
import { UserdataService } from "../userdata.service";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar'
import { MatTableDataSource } from '@angular/material/table';
import { CoffeebarService } from '../coffeebar.service';
import { Coffeebar } from '../coffeebar.model';


@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  coffeebar:Coffeebar[];
  cid:String;
  uid:String;
  userid:String;
  constructor(private userdataService: UserdataService,private coffeebarService:CoffeebarService,private snackBar: MatSnackBar, private router : Router,private route: ActivatedRoute) { }
  userDetails;

  ngOnInit(): void {
    this.userDetails=this.userdataService.getCurrUser();
    this.fetchIssuesbar();
    this.updatefavbar(this.cid,this.uid);
    this.removefavbar(this.cid,this.uid);
    }
    onLogout(){
      this.userdataService.deleteUser();
      this.router.navigate(['/login']);
    }
    fetchIssuesbar(){
      this.coffeebarService
      .getCoffeebars()
      .subscribe((data:Coffeebar[])=>{
        this.coffeebar=data;
      });
    }
     favChanged(cid,uid,event){
      if (event.checked ==  true){
        this.updatefavbar(cid,uid) 
        this.ngOnInit();
      }
      else{      
        this.removefavbar(cid,uid) 
        this.ngOnInit();
      }    
    }
    updatefavbar(cid,uid){
      this.userdataService.updatefavbar(cid,uid).subscribe(data =>{
        this.snackBar.open('Update Successfull', 'OK', {duration: 7000});
      }),(err)=>{
        this.snackBar.open('Update failed', 'OK', {duration: 7000});
      }
    }
    removefavbar(cid,uid){
      this.userdataService.removefavbar(cid,uid).subscribe(data =>{
        this.snackBar.open('Removed Successfull', 'OK', {duration: 7000});
      }),(err)=>{
        this.snackBar.open('Not removed', 'OK', {duration: 7000});
      }
    }
    
    checkedfunction(cid){
      let arraydata=this.userDetails.favouritebars;
      for (var i = 0; i < Object.keys(arraydata).length; i++) {
        if(arraydata[i]==cid){
          return true;
        }
      }    
    }
    tracByBarId(index:number, element:any){
      return element._id;
    }
}
