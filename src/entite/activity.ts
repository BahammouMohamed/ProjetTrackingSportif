import {User} from "./user";
import {CordonneesGPS} from "./cordonneesGPS";

export interface Activity {
  id: number;
  typeSport: string;
  dateDebut: number | Date;
  dateFin: number | Date;
  utilisateur: User;
  coordonneesGPS: Array<CordonneesGPS>;
  distance: number;
  imageUrl: string;
}

export class Activity implements Activity{


  constructor() {
    this.id = 0;
    this.typeSport = "";
    this.dateDebut = 0;
    this.dateFin = 0;
    this.coordonneesGPS = [];
    this.utilisateur = null;
    this.distance = 0;
    this.imageUrl = "";
  }
}
