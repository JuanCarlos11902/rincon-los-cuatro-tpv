import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component:TabsPage,
    children:[
      {
        path:'pedido',
        loadChildren: () => import("../pedido/pedido.module").then(m => m.PedidoPageModule)
      },
      {
        path:'bebida',
        loadChildren: () => import("../bebida/bebida.module").then(m => m.BebidaPageModule)
      },
      {
        path:'carrito',
        loadChildren: () => import("../carrito/carrito.module").then(m => m.CarritoPageModule)
      },
      {
        path:'',
        redirectTo:'pedido',
        pathMatch:'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
