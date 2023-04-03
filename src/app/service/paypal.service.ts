import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaypalApiService {
  apiUrl = 'http://localhost:3000/paypal';
  constructor(private http: HttpClient) {}

  createPayment(body: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create-order`, body);
  }
}
