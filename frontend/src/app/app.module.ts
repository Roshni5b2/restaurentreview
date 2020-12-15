import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
//form modules
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete'; 
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule} from '@angular/material/slider';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

//modules
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//routes
import { appRoutes } from './routes';
//services
import { UserdataService } from './userdata.service';
import { CoffeebarService } from './coffeebar.service';
//components

import { AppComponent } from './app.component';
import { UserdataComponent } from './userdata/userdata.component';
import { SignUpComponent } from './userdata/sign-up/sign-up.component';
import { SignInComponent } from './userdata/sign-in/sign-in.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { CoffeebarFilterPipe } from './coffeebar/coffeebar-filter.pipe';
import { MenuComponent } from './menu/menu.component';
import { CoffeebarComponent } from './coffeebar/coffeebar.component';
import { MaincoffeeshopComponent } from './maincoffeeshop/maincoffeeshop.component';
import { MapComponent } from './map/map.component';
import { AboutusComponent } from './aboutus/aboutus.component';
//other

import { AuthGuard } from './auth/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    UserdataComponent,
    SignUpComponent,
    SignInComponent,
    UserprofileComponent,
    MenuComponent,
    CoffeebarComponent,
    MaincoffeeshopComponent,
    MapComponent,
    CoffeebarFilterPipe,
    AboutusComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    MatToolbarModule,
    MatFormFieldModule, 
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule, 
    MatIconModule, 
    MatButtonModule, 
    MatCardModule, 
    MatTableModule,
    MatDividerModule, 
    MatAutocompleteModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatSliderModule,
    FlexLayoutModule,
    MatSidenavModule,
    MatListModule
  ],
  providers: [AuthGuard, UserdataService, CoffeebarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
