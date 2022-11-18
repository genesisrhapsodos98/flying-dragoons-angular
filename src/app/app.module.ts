import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { LaneComponent } from './components/lane/lane.component';
import { DragoonComponent } from './components/dragoon/dragoon.component';
import { SceneComponent } from './components/scene/scene.component';
import { MenuComponent } from './components/menu/menu.component';

@NgModule({
  declarations: [
    LaneComponent,
    DragoonComponent,
    SceneComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [MenuComponent]
})
export class AppModule { }
