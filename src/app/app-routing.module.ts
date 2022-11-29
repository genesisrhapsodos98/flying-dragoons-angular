import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreditsComponent } from './components/credits/credits.component';
import { DaemonsAreRealComponent } from './components/daemons-are-real/daemons-are-real.component';
import { HangarComponent } from './components/hangar/hangar.component';
import { SquadronComponent } from './components/squadron/squadron.component';

const routes: Routes = [
  { path: '', component: SquadronComponent },
  { path: 'hangar', component: HangarComponent },
  { path: 'credits', component: CreditsComponent },
  { path: 'dar', component: DaemonsAreRealComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
