import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GoogleMaps, GoogleMap, GoogleMapsEvent } from '@ionic-native/google-maps';
import {Activity} from "../../entite/activity";
import {Chrono} from "../../utils/chrono";




@Component({
  selector: 'page-historique-activitee',
  templateUrl: 'historique-activitee.html',
})
export class HistoriqueActiviteePage {

  private activity: any;
  private map: GoogleMap;
  private duree: string;
  private  options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric', timeZone : "UTC" };


  constructor(public navCtrl: NavController, public navParams: NavParams, public chrono: Chrono) {
    this.activity = this.navParams.get('activity');
  }

  ionViewDidLoad() {
    this.duree = this.chrono.getSecondsAsDigitalClock((<number>this.activity.dateFin - <number>this.activity.dateDebut) / 1000);

    this.map = GoogleMaps.create('map', {
      camera: {
        target: {
          lat: this.activity.coordonnees[0].lat ,
          lng: this.activity.coordonnees[0].lng
        },
        zoom: 15,
        tilt: 0
      }
    });

    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      this.map.setCameraTarget({
        lat: this.activity.coordonnees[0] ? this.activity.coordonnees[0].lat : 0,
        lng: this.activity.coordonnees[0] ? this.activity.coordonnees[0].lng : 0
      })

      this.map.addPolyline({
        points: this.activity.coordonnees
      })
    })
  }

}
