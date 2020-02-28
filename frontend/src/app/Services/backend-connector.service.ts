import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BackendConnectorService {

  private baseUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) { }

  login(data){
    return this.http.post(`${this.baseUrl}/login`, data);
  }
  
  signup(data){
    return this.http.post(`${this.baseUrl}/signup`, data);
  }

  
}
