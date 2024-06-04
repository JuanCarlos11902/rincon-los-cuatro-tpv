import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BebidaPage } from './bebida.page';

const routes: Routes = [
  {
    path: '',
    component: BebidaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BebidaPageRoutingModule {}
