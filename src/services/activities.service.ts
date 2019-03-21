import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Activity } from '../entite/activity';
import { CordonneesGPS } from '../entite/cordonneesGPS';
import "rxjs/add/operator/map";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable() export class ActivitiesService {

  constructor(private http: HttpClient) { }
  url = "http://localhost:8080"



  getActivity(id: number): Observable<Activity> {
    return this.http.get<Activity>(this.url+`/activities/${id.toString()}`);
  }

  demarrerActivity(activity: Activity) : Observable<Activity>{
    console.log("Je suis la");
    return this.http.post<Activity>(this.url+"/activities", activity,httpOptions);
  }

  updateActivity(activity: Activity, gpsCoordinates: CordonneesGPS) : Observable<CordonneesGPS> {
    return this.http.put<CordonneesGPS>(this.url+"/activities/"+activity.id+"/gps", gpsCoordinates);
  }

  finActivity(activity: Activity) : Observable<Activity> {
    return this.http.put<Activity>(this.url+"/activities/"+activity.id, activity, httpOptions);
  }
}
