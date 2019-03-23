import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HistoriqueActiviteePage } from './historique-activitee';

@NgModule({
  declarations: [
    HistoriqueActiviteePage,
  ],
  imports: [
    IonicPageModule.forChild(HistoriqueActiviteePage),
  ],
})
export class HistoriqueActiviteePageModule {}
