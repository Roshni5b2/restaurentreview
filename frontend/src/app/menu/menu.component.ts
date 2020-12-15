import { Component, OnInit } from '@angular/core';
import {CoffeebarService} from '../coffeebar.service';
import {Router, ActivatedRoute} from '@angular/router';
import {Coffeebar} from '../coffeebar.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
 
  bardata: Coffeebar[];
  data;

  constructor(private coffeebarService:CoffeebarService, private router:Router, private route: ActivatedRoute) { }


   ngOnInit() : void{
    this.coffeebarService.getCoffeebars().subscribe((coffeebars)=>{
      })
      this.fetchCoffeebars();

    
  }
  fetchCoffeebars(){
    this.coffeebarService
    .getCoffeebars()
    .subscribe((data:Coffeebar[])=>{
      this.bardata=data;

    })
  }

  
}
