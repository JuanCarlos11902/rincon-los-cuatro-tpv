import { Component, OnInit } from '@angular/core';
import { Producto } from '../producto';
import { CarritoService } from '../carrito.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {
  listaCarrito!: Array<Producto>;
  listaCarritoSinDuplicados!: Array<Producto>;
  mesaSeleccionada!: number;
  sumaTotal!: any;

  constructor(
    private servicio: CarritoService,
    private allertController: AlertController,
    private router: Router
  ) {
    this.mesaSeleccionada = this.servicio.getMesaSeleccionada();
  }

  ngOnInit() {
    this.listaCarritoSinDuplicados = new Array();
    this.servicio.get$ListaCarrito().subscribe((lista) => {
      this.listaCarritoSinDuplicados = new Array();
      this.listaCarrito = lista;
      this.listaCarrito.forEach((product) => {
        this.listaCarritoSinDuplicados.push(product);
      });

      this.calcularTotal();
      this.eliminarDuplicados();
    });
  }

  vaciarCarrito() {
    this.servicio.vaciarCarrito();
    this.listaCarrito = [];
    this.listaCarritoSinDuplicados = [];
    this.sumaTotal = 0;
  }

  borrarProducto(i: number) {
    let producto = this.listaCarrito[i];
    this.listaCarrito.splice(i, 1);
    this.calcularTotal();
    this.checkIfEmpty(producto);
  }

  checkIfEmpty(product: Producto) {
    if (this.countProductsInOrder(product) === 0) {
      this.listaCarritoSinDuplicados = this.listaCarritoSinDuplicados.filter(
        (producto) => producto.getId() != product.getId()
      );
    }
  }

  countProductsInOrder(product: Producto) {
    let number = this.servicio.countProductsInOrder(product);
    return number;
  }

  eliminarDuplicados() {
    let seenIds = new Set<String>();

    this.listaCarritoSinDuplicados = this.listaCarrito.filter(
      (product, index) => {
        if (seenIds.has(product.getId())) {
          return false;
        } else {
          seenIds.add(product.getId());
          return true;
        }
      }
    );
  }

  calcularTotal() {
    this.sumaTotal = 0;
    this.listaCarrito.forEach((producto) => {
      let variableTemporal = this.sumaTotal + producto.getPrice();
      this.sumaTotal = variableTemporal;
    });
  }

  async crearPedido() {
    if (this.listaCarrito.length != 0) {
      let productsIds: any[] = [];
      this.listaCarrito.forEach((product) => {
        productsIds.push(product.getId());
      });
      let tableNumber = this.mesaSeleccionada;
      let description = await this.requestDescriptionOfOrder();
      if (description === '') {
        description = 'No hay ninguna descripción para este pedido';
      }
      let body = {
        tableNumber: tableNumber,
        products: productsIds,
        totalPrice: this.sumaTotal,
        orderDescription: description,
      };

      this.servicio.realizarPedido(body).subscribe(
        (response) => {
          console.log('Pedido realizado con éxito', response);
          this.crearAlerta();
        },
        (error) => {
          console.error('Error al realizar el pedido', error);
        }
      );
      this.listaCarrito = [];
      this.servicio.vaciarCarrito();
      this.router.navigate(['/home/' + this.mesaSeleccionada]);
    } else {
      const alert = await this.allertController.create({
        header: 'Seleccione al menos un producto',
        subHeader: 'No se puede realizar un pedido sin productos',
        buttons: ['OK'],
      });

      await alert.present();
    }
  }

  async requestDescriptionOfOrder(): Promise<string> {
    return new Promise(async (resolve, reject) => {
      const alert = await this.allertController.create({
        header: 'Algo que quieras hacer saber al camarero?',
        inputs: [
          {
            name: 'descripcion',
            type: 'textarea',
            placeholder: 'Escribe aquí',
          },
        ],
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              resolve('No hay ninguna descripción para este pedido');
            },
          },
          {
            text: 'Enviar',
            handler: (data) => {
              resolve(data.descripcion);
            },
          },
        ],
      });

      await alert.present();
    });
  }

  async crearAlerta() {
    const alert = await this.allertController.create({
      header: 'Su pedido ha llegado a cocina',
      subHeader:
        'En breves momentos podrá disfrutar de lo que ha pedido. Gracias por confiar en nosotros',
      buttons: ['OK'],
    });

    await alert.present();
  }
}
