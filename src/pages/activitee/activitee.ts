import { Component, ViewChild, ElementRef } from '@angular/core';
import {AlertController, NavController, NavParams, Platform} from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Storage } from '@ionic/storage';
import {
  GoogleMap,
  GoogleMaps,
  Marker,
  MarkerOptions,
  LatLng,
  CameraPosition,
  GoogleMapsEvent
} from "@ionic-native/google-maps";
import {ActivitiesService} from "../../services/activities.service";
import {Activity} from "../../entite/activity";
import {CordonneesGPS} from "../../entite/cordonneesGPS";
import {Chrono} from "../../utils/chrono";
import {StatusBar} from "@ionic-native/status-bar";


declare var google: any;


@Component({
  selector: 'page-activitee',
  templateUrl: 'activitee.html',
})
export class ActiviteePage {
  @ViewChild('map') mapElement: ElementRef;
  map: GoogleMap;
  selfMarker: Marker;
  positionSender: any;
  locationUpdater: any;

  private sport: any;
  private data: Activity;
  private isPaused: boolean = false;
  private isStopped: boolean = false;

  private lastPosition: CordonneesGPS;
  private currentPosition: CordonneesGPS;


  constructor( private statusBar: StatusBar,public navParams: NavParams, public alertCtrl: AlertController,public chrono: Chrono, public activitiesSvc: ActivitiesService,public navCtrl: NavController, public platform: Platform, private geolocation: Geolocation) {
    this.data = new Activity();
  }
  ionViewDidLoad(){
    this.sport = this.navParams.get('sport');
    this.data.utilisateur = {
      idUtilisateur: 2,
    };
    this.data.typeSport = this.sport.code;
    this.data.dateDebut = Date.now();
    this.data.dateFin = Date.now();


    this.activitiesSvc.demarrerActivity(this.data).subscribe(data => {

      this.data.id = data.id;
      console.log("activity = "+data.id);
      this.positionSender = window.setInterval(() => {
        this.data.coordonneesGPS.push(this.currentPosition);

        if(this.data.coordonneesGPS.length > 1) this.lastPosition = this.data.coordonneesGPS[this.data.coordonneesGPS.length - 2];


        if(this.lastPosition) {
          this.data.distance += this.distanceEntre(this.lastPosition, this.currentPosition);
          this.activitiesSvc.updateActivity(this.data, this.currentPosition).subscribe(
            data => console.log("update = " + data.lat),
            error => console.log(error)
          )
        }
        this.map.addPolyline({
          points: this.data.coordonneesGPS
        })


        /*if(this.lastPosition && this.lastPosition.lat != this.currentPosition.lat && this.lastPosition.lng != this.currentPosition.lng) {
          this.data.distance += this.distanceEntre(this.lastPosition, this.currentPosition);
          this.activitiesSvc.updateActivity(this.data, this.currentPosition).subscribe(
            data => console.log(data.lat),
            error => console.log(error)
          )
        }*/
      }, this.sport.FrequenceRefresh)

    }, err => {
      console.log('Error creating activity');
    });

    this.chrono.startChrono();
    this.loadMap();
  }

  ionViewDidLeave() {
    this.statusBar.styleDefault();
    this.chrono.resetChrono();
    this.unloadMap();
  }
  unloadMap() {
    if(this.locationUpdater) this.locationUpdater.unsubscribe();
  }


  loadMap() {
    this.geolocation.getCurrentPosition().then((position) => { // CALLBACK HELL
      console.log(`${position.coords.latitude}, ${position.coords.longitude}`);

      this.map = GoogleMaps.create('map', {
        camera: {
          target: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          },
          zoom: 15,
          tilt: 0
        }
      });


      this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
        console.log('Map is ready!');


        this.locationUpdater = this.geolocation.watchPosition()
          .subscribe((position) => {
            this.currentPosition = {
              id: null,
              lat: position.coords.latitude,
              lng: position.coords.longitude,
              date: Date.now()
            };

            this.updateMap(position.coords);
          });
      });
    });
  }
  stopConfirm(source) {
    let confirm = this.alertCtrl.create({
      title: "Fin d'activité",
      message : "Etes vous sur de vouloir arrêter ?",
      buttons: [
        {
          text: 'Non',
          handler: () => {}
        },
        {
          text: 'Oui',
          handler: () => {
            this.stopActivity(source);
          }
        }
      ]
    });
    confirm.present();
  }

  stopActivity(source) {
    this.isStopped = true;
    window.clearInterval(this.positionSender);
    this.chrono.pauseChrono();

    this.data.dateFin = Date.now();
    this.data.coordonneesGPS = []; // Don't send the gps coordinates twice

    this.activitiesSvc.finActivity(this.data).subscribe(
      () => console.log("Donnée envoyés avec succés"),
      err => console.log(err)
    );

    // If we're coming here from back button, we want to go back NOW
    if (source == 'navbar') this.navCtrl.pop();
  }



  pauseActivity() {
    this.isPaused = true;
    this.chrono.pauseChrono();
  }

  reprendreActivity() {
    this.isPaused = false;
    this.chrono.startChrono();
  }

  private updateMap(position) {
    let selfMarkerOptions: MarkerOptions = {
      title: "Ma position",
      position: new LatLng(position.latitude,position.longitude),
      icon: 'red',
      draggable: false
    };

    if (this.selfMarker != null) {
      this.map.clear();
      this.selfMarker.setPosition(new LatLng(position.latitude, position.longitude));
      this.map.addMarker(selfMarkerOptions);
    }
    else {
      this.map.addMarker(selfMarkerOptions).then((marker) => { this.selfMarker = marker; });
    }

    this.map.setCameraTarget(new LatLng(position.latitude, position.longitude));
  }

  degreesEnRadian(degrees: number) {
    return (Math.PI * degrees) / 180;
  }


  distanceEntre(a: CordonneesGPS, b: CordonneesGPS) {
    let r = 6378000

    let latA = this.degreesEnRadian(a.lat);
    let lngA  = this.degreesEnRadian(a.lng);
    let latB = this.degreesEnRadian(b.lat);
    let lngB = this.degreesEnRadian(b.lng);

    return r * (Math.PI / 2 - Math.asin(Math.sin(latB) * Math.sin(latA) + Math.cos(lngB - lngA) * Math.cos(latB) * Math.cos(latA)))
  }
}

