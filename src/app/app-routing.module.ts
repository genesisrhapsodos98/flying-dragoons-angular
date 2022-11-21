import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreditsComponent } from './components/credits/credits.component';
import { HangarComponent } from './components/hangar/hangar.component';
import { SceneComponent } from './components/scene/scene.component';

const routes: Routes = [
  { path: '', component: SceneComponent },
  { path: 'hangar', component: HangarComponent },
  { path: 'credits', component: CreditsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
