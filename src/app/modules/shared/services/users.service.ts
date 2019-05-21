import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient
  ) { }

  getUsersList(pageId) {
    return this.http.get(`https://reqres.in/api/users?page=${pageId}`);
  }

  getUserData(userId) {
    return this.http.get(`https://reqres.in/api/users/${userId}`);
  }
}
