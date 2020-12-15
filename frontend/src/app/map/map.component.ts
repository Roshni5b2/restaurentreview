import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import {CoffeebarService} from '../coffeebar.service';
import {Router, ActivatedRoute} from '@angular/router';
import {Coffeebar} from '../coffeebar.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  coffeebar:Coffeebar[];
  userlatitude: String;
  userlongitude: String;
  id: String;
  a={};
  constructor(private coffeebarService:CoffeebarService, private router:Router,  private route: ActivatedRoute) { 
   
   }
   
   ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
     this.fetchCoffeeshops();
   }
   coffeebars(id){
    myid:this.router.navigate(['/coffeebars/${id}']);
  }
   fetchCoffeeshops(){
   this.coffeebarService.getCoffeebars()
    .subscribe((data:Coffeebar[])=>{ 
      this.coffeebar=data;
      
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(position){
          var a={
            userlatitude:position.coords.latitude,
            userlongitude:position.coords.longitude
          }
          const mymap = L.map('mapid').setView([a.userlatitude,a.userlongitude], 13);
          var circle = L.circle([0,0], {
            color:'red',
          radius:5000
        }).addTo(mymap);
          circle.setLatLng([a.userlatitude,a.userlongitude]).bindPopup("My Location");
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1Ijoicm9zaG5pNTYyMCIsImEiOiJjazlrMmNxdjgwNDB3M29wZ2NldDkzaHhzIn0.IjMNgg4SmyZ5HHSgkrySSQ'
        }).addTo(mymap);     
        for(var i=0;i<Object.keys(data).length;i++){ 
          var marker = new L.marker([data[i].latitude,data[i].longitude])
           .bindPopup(data[i].name) .addTo(mymap);
          }
        })
      }
      else{
      }
    })

   }
}
