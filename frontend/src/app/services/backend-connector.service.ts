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

  sendPasswordResetLink(data){
    return this.http.post(`${this.baseUrl}/sendPasswordResetLink`, data);
  }
  
  changePassword(data) {
    return this.http.post(`${this.baseUrl}/resetPassword`, data)
  }

  //User Component Services
  getUsers(){
    return this.http.get<UsersPostResponse>(`${this.baseUrl}/users`);
  }

  addUser(data){
    return this.http.post(`${this.baseUrl}/users`, data);
  }

  deleteUser(id){
    return this.http.delete(`${this.baseUrl}/users/`+id);
  }

  getUserById(id){
    return this.http.get<UserGetResponse>(`${this.baseUrl}/users/`+id);
  }

  updateUser(data){
    return this.http.put(`${this.baseUrl}/users/`+window.localStorage.getItem("editUserId"), data);
  }

  
}

interface UsersPostResponse {
  data: {'result':[]}
}
interface UserGetResponse {
  data: []
}
