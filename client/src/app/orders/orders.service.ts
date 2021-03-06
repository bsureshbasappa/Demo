import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getOrdersForUser() {
    console.log('suresh');
    return this.http.get(this.baseUrl + 'orders');
  }

  getOrderDetailed(id: number) {
    console.log('suresh1');
    return this.http.get(this.baseUrl + 'orders/' + id);
    
  }
}