import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { CreditsComponent } from './components/credits/credits.component';
import { DragoonViewerComponent } from './components/dragoon-viewer/dragoon-viewer.component';
import { DragoonComponent } from './components/dragoon/dragoon.component';
import { HangarComponent } from './components/hangar/hangar.component';
import { LaneComponent } from './components/lane/lane.component';
import { MenuComponent } from './components/menu/menu.component';
import { SelenLaneComponent } from './components/selen-lane/selen-lane.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { SquadronComponent } from './components/squadron/squadron.component';

@NgModule({
  declarations: [
    LaneComponent,
    DragoonComponent,
    SquadronComponent,
    MenuComponent,
    SidenavComponent,
    HangarComponent,
    CreditsComponent,
    DragoonViewerComponent,
    SelenLaneComponent
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
