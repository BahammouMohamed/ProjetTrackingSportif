import { Component, ViewChild, ElementRef } from '@angular/core';
import {AlertController, NavController, Platform} from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import {Subscription} from "rxjs";
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


declare var google: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('map') mapElement: ElementRef;
  map: GoogleMap;
  selfMarker: Marker;
  positionSender: any;
  locationUpdater: any;


  //private data : any;
  private data: Activity;
  private isPaused: boolean = false;
  private isStopped: boolean = false;

  private lastPosition: CordonneesGPS;
  private currentPosition: CordonneesGPS;


  constructor(public alertCtrl: AlertController,public chrono: Chrono, public activitiesSvc: ActivitiesService,public navCtrl: NavController, public platform: Platform, private geolocation: Geolocation, private storage: Storage) {

    this.data = new Activity();

  }
  ionViewDidLoad(){
    this.data.utilisateur = {
      idUtilisateur: 1,
      nom: "string",
      prenom: "string",
      poids: 50,
      username: "string",
      password: "string",
    };
    this.data.typeSport = "Tennis";
    this.data.dateDebut = Date.now();
    this.data.dateDebut = Date.now();


    this.activitiesSvc.demarrerActivity(this.data).subscribe(data => {
     // this.data = data; // Récupérer l'id de l'activité du serveur
      this.data.id = data.id;
      //console.log("activity = "+JSON.stringify(data.id));
      console.log("activity = "+data.id);
      this.positionSender = window.setInterval(() => {
        this.data.coordonneesGPS.push(this.currentPosition);

        if(this.data.coordonneesGPS.length > 1) this.lastPosition = this.data.coordonneesGPS[this.data.coordonneesGPS.length - 2];

        this.activitiesSvc.updateActivity(this.data, this.currentPosition).subscribe(
          data => console.log("update = "+data.lat),
          error => console.log(error)
        )
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
      }, 5000)

    }, err => {
      console.log('Error creating activity');
    });

    this.chrono.startChrono();
    this.loadMap();
  }


  loadMap() {
    // Set map origin
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

      // Wait the MAP_READY before using any methods.
      this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
        console.log('Map is ready!');

        // Location service
        this.locationUpdater = this.geolocation.watchPosition()
          .subscribe((position) => {
            this.currentPosition = {
              id: null,
              lat: position.coords.latitude,
              lng: position.coords.longitude,
              timestamp: Date.now()
            };

            this.updateMap(position.coords);
          });
      });
    });
  }
  showStopActivityConfirm(source) {
    let confirm = this.alertCtrl.create({
      title: "Fin d'activité",
      message : "Etes vous sur de vouloir arrêter l'activité?",
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
      () => console.log('Data sent succesfully'),
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
      this.map.clear(); // Remove previous marker
      this.selfMarker.setPosition(new LatLng(position.latitude, position.longitude)); // Set new position
      this.map.addMarker(selfMarkerOptions); // Add new marker
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
