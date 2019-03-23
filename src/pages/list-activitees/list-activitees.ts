import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Activity} from "../../entite/activity";
import {GoogleMap} from "@ionic-native/google-maps";
import {Sports} from "../../utils/sport";
import {ActivitiesService} from "../../services/activities.service";
import {HistoriqueActiviteePage} from "../historique-activitee/historique-activitee";
import {UserService} from "../../services/users.service";
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-list-activitees',
  templateUrl: 'list-activitees.html',
})
export class ListActiviteesPage {
  private sport: any;
  //TODO Récupérer l'ID de l'Uilisateur courrant
  private userId: number = 2;
  private activities: Array<Activity>;
  private map: GoogleMap;
  private  options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric', timeZone : "UTC" };



  constructor(public navCtrl: NavController, public navParams: NavParams, public sports: Sports, public storage: Storage, public userService: UserService) {
    this.sport = this.navParams.get('sport');
    this.activities = [];
  }

  ionViewDidLoad() {
    this.userService.getActivitiesBySport(this.userId,this.sport.code).subscribe(activities => {
      activities.forEach(activity => {
        this.storage.set(`activity${activity.idActivity}`, activity);
        activity.dateDebut = new Date(<number>activity.dateDebut);
        activity.dateFin = new Date(<number>activity.dateFin);
        this.activities.push(activity);
      });

      this.activities = activities;
    })
  }

  loadHistoriqueActivitee(activity: Activity) {
    this.storage.get(`activity${activity.id}`).then(storedActivity => {
      if(storedActivity) {
        this.navCtrl.push(HistoriqueActiviteePage, { 'activity': activity });
      }
      else {
        this.navCtrl.push(HistoriqueActiviteePage, { 'activity': activity });
      }
    })
  }

}
