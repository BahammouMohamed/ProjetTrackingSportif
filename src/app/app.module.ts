import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Geolocation } from '@ionic-native/geolocation';
import { IonicStorageModule } from '@ionic/storage';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {GoogleMaps} from "@ionic-native/google-maps";
import {UserService} from "../services/users.service";
import {ActivitiesService} from "../services/activities.service";
import {Chrono} from "../utils/chrono";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {ListActiviteesPage} from "../pages/list-activitees/list-activitees";
import {ProfilePage} from "../pages/profile/profile";
import {ActiviteePage} from "../pages/activitee/activitee";
import {Sports} from "../utils/sport";
import {HistoriquePage} from "../pages/historique/historique";
import {HistoriqueActiviteePage} from "../pages/historique-activitee/historique-activitee";

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    ListActiviteesPage,
    ProfilePage,
    ActiviteePage,
    HistoriquePage,
    HistoriqueActiviteePage
  ],
  imports: [
    BrowserModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    ListActiviteesPage,
    ProfilePage,
    ActiviteePage,
    HistoriquePage,
    HistoriqueActiviteePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HttpClient,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GoogleMaps,
    Geolocation,
    Chrono,
    Sports,
    ActivitiesService,
    UserService,
  ]
})
export class AppModule {}
