import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { CommonModule } from '@angular/common';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginService } from './services/login.service';
import { HttpClientModule } from '@angular/common/http';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  declarations: [AppComponent, LoadingComponent],
  imports: [HttpClientModule,BrowserModule, IonicModule.forRoot(), AppRoutingModule, CommonModule],
  providers: [LoginService,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy}],
  bootstrap: [AppComponent],
})
export class AppModule {}
