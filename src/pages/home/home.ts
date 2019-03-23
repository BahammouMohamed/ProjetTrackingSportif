import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Sports} from "../../utils/sport";
import {ActiviteePage} from "../activitee/activitee";



declare var google: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  sport: string = '';


  constructor(public navCtrl: NavController, public sports: Sports) {
  }

  ionViewDidLoad() {
  }

  ngAfterViewInit(){
  }

  public demarrerActivitee(sport) {
    this.navCtrl.push(ActiviteePage, { 'sport': sport });
  }
}
