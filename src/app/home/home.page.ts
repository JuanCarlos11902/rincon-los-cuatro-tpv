import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CarritoService } from '../carrito.service';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  listaMesas: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8];
  itemSeleccionado: number = this.listaMesas[0];
  constructor(private router: Router, private carrito: CarritoService, private socketService: SocketService){
    this.carrito.setMesaSeleccionado(this.itemSeleccionado);
  }

  cambiarItem(event: any) {
    this.itemSeleccionado = event.detail.value;
    this.carrito.setMesaSeleccionado(this.itemSeleccionado);
  }

  navegarAPedido() {
    this.router.navigate(['/tabs']);
  }
}
