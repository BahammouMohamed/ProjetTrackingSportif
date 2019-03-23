import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActiviteePage } from './activitee';

@NgModule({
  declarations: [
    ActiviteePage,
  ],
  imports: [
    IonicPageModule.forChild(ActiviteePage),
  ],
})
export class ActiviteePageModule {}
