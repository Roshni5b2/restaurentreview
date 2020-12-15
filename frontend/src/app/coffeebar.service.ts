import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoffeebarService {

  uri = 'http://localhost:4000';

  constructor(private http: HttpClient ) { }

  getCoffeebars() {
    return this.http.get(`${this.uri}/coffeebars`);
  }
  
  coffeedata(id) {
    return this.http.get(`${this.uri}/coffeebars/${id}`);
  }

   getshoplocation(){
      return this.http.get(`${this.uri}/coffeebars/getNearby`);
    }

    addreview(sid,fullname,review){
    const issue={
      review:review,
      uname:fullname
    }
    return this.http.post(`${this.uri}/updatereview/${sid}`,issue);
  }
  
  addrate(value,shopid){
    const issue={
      value:value
    }
    return this.http.post(`${this.uri}/addrating/${shopid}`,issue);
  }
}




