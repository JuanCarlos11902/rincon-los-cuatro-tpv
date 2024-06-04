import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BebidaPageRoutingModule } from './bebida-routing.module';

import { BebidaPage } from './bebida.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BebidaPageRoutingModule
  ],
  declarations: [BebidaPage]
})
export class BebidaPageModule {}
