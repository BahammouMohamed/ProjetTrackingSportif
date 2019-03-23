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
  url = "http://localhost:8080";

  /*creerUtilisateur(user: User) : Observable<User> {
    return this.http.post<User>('/signup', JSON.stringify(user), httpOptions)
  }*/

  getCurrentUser(id: number) : Observable<User> {
    return this.http.get<User>(this.url+'/users/'+id, httpOptions);
  }


  getUsers(id: number) : Observable<User> {
    return this.http.get<User>(this.url+'/users', httpOptions);
  }

  getActivities(id: number) : Observable<any> {
    return this.http.get(this.url+'/users/'+id+'/activities', httpOptions);
  }

  getActivitiesBySport(id: number, sport: string) : Observable<any> {
    return this.http.get(this.url+'/users/'+id+'/activities/'+sport, httpOptions);
  }

  updateProfile(id: number, user: any) : Observable<any> {
    return this.http.put(this.url+'/users/'+id, user, httpOptions);
  }
}
