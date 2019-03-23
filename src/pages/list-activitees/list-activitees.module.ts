import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListActiviteesPage } from './list-activitees';

@NgModule({
  declarations: [
    ListActiviteesPage,
  ],
  imports: [
    IonicPageModule.forChild(ListActiviteesPage),
  ],
})
export class ListActiviteesPageModule {}
