import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { Facebook } from '@ionic-native/facebook/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule,FormsModule  } from '@angular/forms';


import { GooglePlus } from '@ionic-native/google-plus/ngx';

// Import camera module
import { Camera } from '@ionic-native/camera/ngx';

import {  File } from '@ionic-native/file/ngx/index';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    Camera,
    File,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy,},
    Facebook,
    GooglePlus
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
