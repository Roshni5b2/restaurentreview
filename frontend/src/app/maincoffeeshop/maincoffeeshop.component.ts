import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CoffeebarService } from '../coffeebar.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Coffeebar } from '../coffeebar.model';
import { Userdata } from '../userdata.model';
import { UserdataService } from "../userdata.service";
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule} from '@angular/forms';
import * as L from 'leaflet';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-maincoffeeshop',
  templateUrl: './maincoffeeshop.component.html',
  styleUrls: ['./maincoffeeshop.component.css']
})


export class MaincoffeeshopComponent implements OnInit {
  autoTicks = false;
  disabled = false;
  invert = false;
  max = 5;
  min = 0;
  showTicks = false;
  step = 0.1;
  thumbLabel = true;
  value = 0;
  vertical = false;
  tickInterval = 1;

  id: String;
  reviewlayout:any;
  _id: String;
  coffeebar: Coffeebar;
  data;
  createForm: FormGroup;
  userDetails:any;
  currentusername: String;
  review: String[];
  cid:String;
  uid:String;
  userid:String;
  isCollapsed:boolean=true;
  ratediv:boolean=true;
  reviewRegex = /^[A-Za-z]+([\s][A-Za-z]+)*$/

  @Input() selected: boolean;
  @Output() selectedChange = new EventEmitter<boolean>();

  constructor(private coffeebarService:CoffeebarService, private userdataService: UserdataService,private fb: FormBuilder, private snackBar: MatSnackBar, private router:Router, private route: ActivatedRoute) {
  this.createForm = this.fb.group({
      review: ['',Validators.required]
    }); 
    
  }
  ngOnInit(): void {
      this.coffeebarService.getCoffeebars().subscribe((coffeebars)=>{
      })
      this.id = this.route.snapshot.paramMap.get('id');
      this.fetchCoffeebars(); 
      this.userDetails=this.userdataService.getCurrUser();
  }

  addreview(coffeebar,currentusername,review){
    this.coffeebarService.addreview(coffeebar,currentusername,review).subscribe(data =>{
      if(!review==null){
        this.reviewlayout=[];
        this.snackBar.open('please enter Review', 'OK', {duration: 2000});
      }
      this.ngOnInit();
      this.snackBar.open('Review Added Successfully', 'OK', {duration: 7000});
    }),(err)=>{
      this.snackBar.open('Could not able to Add Review, Try again Later', 'OK', {duration: 7000});
    }
  }
  toggleCollapse(){
    
    if(this.userDetails == null){
      this.router.navigate([`/login`]);
    }
    else{      
      this.isCollapsed=!this.isCollapsed;
    }
  }
  
  rateadd(value,shopid){ 
    this.coffeebarService.addrate(value,shopid).subscribe(data =>{
      this.snackBar.open('Rated Successfull', 'OK', {duration: 7000});
      this.ngOnInit();
    }),(err)=>{
      this.snackBar.open('Could not able to rate, Try again Later', 'OK', {duration: 7000});
    }
  }
  ratedivdsipaly(){
    if(this.userDetails == null){
      this.router.navigate([`/login`]);
     }
     else{
       // this.router.navigate([`/home`]);    
       this.ratediv=!this.ratediv;
     }
  }
  getSliderTickInterval(): number | 'auto' {
    if (this.showTicks) {
      return this.autoTicks ? 'auto' : this.tickInterval;
    }
    return 0;
  }
  
  fetchCoffeebars(){
    this.coffeebarService.coffeedata(this.id).subscribe((data:Coffeebar)=>{
      this.coffeebar=data;
      this.reviewlayout=this.coffeebar.review;
      this.fetchmap();
      this.ngOnInit();
    })
  }

  fetchmap(){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(function(position){
      })
    }
    else{
    }
    const mymap = L.map('mapid').setView([this.coffeebar.latitude, this.coffeebar.longitude], 10);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'pk.eyJ1Ijoicm9zaG5pNTYyMCIsImEiOiJjazlrMmNxdjgwNDB3M29wZ2NldDkzaHhzIn0.IjMNgg4SmyZ5HHSgkrySSQ'
  }).addTo(mymap);
  var marker = L.marker([this.coffeebar.latitude, this.coffeebar.longitude]).addTo(mymap);
  
 marker.bindPopup(this.coffeebar.name).openPopup();
 }
}
