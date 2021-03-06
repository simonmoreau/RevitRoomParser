import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import {MatListModule} from '@angular/material/list';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from "./app.component";
import { HomeComponent } from './home/home.component';
import { ViewerComponent } from './viewer/viewer.component';
import { HttpClientModule } from "@angular/common/http";
import { InlineSVGModule } from "ng-inline-svg";
import { MouseWheelDirective } from './directives/mouse-wheel.directive';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ViewerComponent,
    MouseWheelDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatListModule,
    InlineSVGModule.forRoot()
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
