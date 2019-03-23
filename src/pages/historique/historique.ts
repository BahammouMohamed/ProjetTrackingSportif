import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Sports} from "../../utils/sport";
import {ListActiviteesPage} from "../list-activitees/list-activitees";

/**
 * Generated class for the HistoriquePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-historique',
  templateUrl: 'historique.html',
})
export class HistoriquePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public sports: Sports) {
  }

  ionViewDidLoad() {
  }

  loadSportHistoryPage(sport) {
    this.navCtrl.push(ListActiviteesPage, { 'sport': sport });
  }

}
