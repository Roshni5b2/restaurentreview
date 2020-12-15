import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserdataService } from "../userdata.service";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userdataService : UserdataService,private router : Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if (!this.userdataService.isLoggedIn()) {
        this.router.navigateByUrl('/login');
        this.userdataService.deleteUser();
        return false;
      }
    return true;
  }
  
}
