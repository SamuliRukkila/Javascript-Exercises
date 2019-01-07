import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MeComponent } from './me/me.component';
import { StudiesComponent } from './studies/studies.component';
import { HobbiesComponent } from './hobbies/hobbies.component';

const routes: Routes = [
  { path: '', redirectTo: '/me', pathMatch: 'full' },
  { path: 'me', component: MeComponent },
  { path: 'studies', component: StudiesComponent },
  { path: 'hobbies', component: HobbiesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
