import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RatingcateringPageRoutingModule } from './ratingcatering-routing.module';

import { RatingcateringPage } from './ratingcatering.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RatingcateringPageRoutingModule
  ],
  declarations: [RatingcateringPage]
})
export class RatingcateringPageModule {}
