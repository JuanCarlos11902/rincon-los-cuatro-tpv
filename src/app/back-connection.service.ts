import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackConnectionService {

  private url:string = "https://floating-caverns-13553-5b60c3be1747.herokuapp.com/";

  constructor(private http: HttpClient) { 

  }
  getAllProducts(): Observable<any[]>{
    return this.http.get<any[]>(this.url + 'products/getAllIfAvailabilityIsTrue');
  }
 
  addOrder(body:any): Observable<any>{
    return this.http.post<any>(this.url + 'order/add', body);
  }

}
