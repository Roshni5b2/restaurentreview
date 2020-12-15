import { Routes } from '@angular/router';
import { UserdataComponent } from './userdata/userdata.component';
import { SignUpComponent } from './userdata/sign-up/sign-up.component';
import { SignInComponent } from './userdata/sign-in/sign-in.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { CoffeebarComponent } from './coffeebar/coffeebar.component';

import { MenuComponent } from './menu/menu.component';
import { MaincoffeeshopComponent } from './maincoffeeshop/maincoffeeshop.component';
import { MapComponent } from './map/map.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { AuthGuard } from './auth/auth.guard';

export const appRoutes: Routes = [
    {
        path:'signup', component:UserdataComponent ,
        children: [{ path: '', component: SignUpComponent}]
    },
    {
        path:'login', component:UserdataComponent ,
        children: [{ path: '', component: SignInComponent}]
    },
    {
        path:'userprofile', component:UserprofileComponent,canActivate:[AuthGuard]
    },
    {
        path:'userdata', component:UserdataComponent 
    },
    {
        path:'menu',component:MenuComponent
    },
    {
        path:'coffeebars',component:CoffeebarComponent
    },
    {
        path:'coffeebars/:id',component:MaincoffeeshopComponent
    },
    {
        path:'map',component:MapComponent
    },
    {
        path:'about',component:AboutusComponent
    },
    {
        path:'', redirectTo: '/home', pathMatch: 'full'
    }

];