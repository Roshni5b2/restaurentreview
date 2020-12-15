import { Component, OnInit } from '@angular/core';
import {UserdataService} from '../userdata.service';
import {Router, ActivatedRoute} from '@angular/router';
import {Userdata} from '../userdata.model';

@Component({
  selector: 'app-userdata',
  templateUrl: './userdata.component.html',
  styleUrls: ['./userdata.component.css']
})
export class UserdataComponent implements OnInit {

userdata= Userdata;
id: String;
data: Userdata;
  constructor(private userdataService:UserdataService, private router:Router, private route: ActivatedRoute) { }


  ngOnInit(): void {
   
  }
 
}
