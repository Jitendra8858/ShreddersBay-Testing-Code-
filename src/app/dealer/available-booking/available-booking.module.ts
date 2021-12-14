import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AvailableBookingPageRoutingModule } from './available-booking-routing.module';

import { AvailableBookingPage } from './available-booking.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AvailableBookingPageRoutingModule
  ],
  declarations: [AvailableBookingPage]
})
export class AvailableBookingPageModule {}
