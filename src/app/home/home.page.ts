import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarritoService } from '../carrito.service';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  itemSeleccionado!: number;
  constructor(private router: Router, private carrito: CarritoService, private socketService: SocketService, private route:ActivatedRoute){
    this.route.params.subscribe(params => {
      this.itemSeleccionado = params['numeroMesa'];
      this.carrito.setMesaSeleccionado(this.itemSeleccionado);
    })
  }

  cambiarItem(event: any) {
    this.itemSeleccionado = event.detail.value;
    this.carrito.setMesaSeleccionado(this.itemSeleccionado);
  }

  navegarAPedido() {
    this.router.navigate(['/tabs']);
  }
}
