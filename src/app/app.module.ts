import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { DragoonComponent } from './components/dragoon/dragoon.component';
import { LaneComponent } from './components/lane/lane.component';
import { MenuComponent } from './components/menu/menu.component';
import { SceneComponent } from './components/scene/scene.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { HangarComponent } from './components/hangar/hangar.component';
import { CreditsComponent } from './components/credits/credits.component';

@NgModule({
  declarations: [
    LaneComponent,
    DragoonComponent,
    SceneComponent,
    MenuComponent,
    SidenavComponent,
    HangarComponent,
    CreditsComponent
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
