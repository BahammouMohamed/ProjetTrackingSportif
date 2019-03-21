import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../entite/user';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable() export class UserService {
  constructor(private http: HttpClient) { }

  /*creerUtilisateur(user: User) : Observable<User> {
    return this.http.post<User>('/signup', JSON.stringify(user), httpOptions)
  }*/

  getCurrentUser(id: number) : Observable<User> {
    return this.http.get<User>('/users/'+id, httpOptions);
  }


  getUsers(id: number) : Observable<User> {
    return this.http.get<User>('/users', httpOptions);
  }

  updateProfile(id: number, user: any) : Observable<any> {
    return this.http.put('/users/'+id, user, httpOptions);
  }
}
