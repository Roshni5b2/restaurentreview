import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {CoffeebarService} from '../coffeebar.service';
import {Router, ActivatedRoute} from '@angular/router';
import {Coffeebar} from '../coffeebar.model';
import { Userdata } from '../userdata.model';
import { UserdataService } from "../userdata.service";

@Component({
  selector: 'app-coffeebar',
  templateUrl: './coffeebar.component.html',
  styleUrls: ['./coffeebar.component.css']
})
export class CoffeebarComponent implements OnInit {
  searchbar: String;
  coffeebar: Coffeebar[];
  data;
  id: String;
  userDetails:any;
  cid:String;
  uid:String;

  constructor(private coffeebarService:CoffeebarService, private router:Router,private userdataService: UserdataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
      this.coffeebarService.getCoffeebars().subscribe((coffeebars)=>{
      
      })
      this.id = this.route.snapshot.paramMap.get('id');
      this.fetchCoffeebars();
      this.userDetails=this.userdataService.getCurrUser();
  }
  fetchCoffeebars(){
    this.coffeebarService
    .getCoffeebars()
    .subscribe((data:Coffeebar[])=>{
      this.coffeebar=data;
    })
  }
  coffeebars(id){
    this.router.navigate(['/coffeebars/${id}']);
  }
  func()
  {
  this.router.navigate(['/map']);
  }
  
}
