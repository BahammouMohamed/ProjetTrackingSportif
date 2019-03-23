import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import {ListActiviteesPage} from "../list-activitees/list-activitees";
import {ActiviteePage} from "../activitee/activitee";
import {HistoriquePage} from "../historique/historique";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ActiviteePage;
  tab3Root = ContactPage;
  tab4Root = HistoriquePage;

  constructor() {

  }
}
