import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Producto } from '../producto';
import { CarritoService } from '../carrito.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.page.html',
  styleUrls: ['./pedido.page.scss'],
})
export class PedidoPage implements OnInit {
  mesaSeleccionada!: number;
  listaProductos: Array<Producto> = new Array();
  listaPrimeraMitad: Array<Producto> = new Array();
  listaSegundaMitad: Array<Producto> = new Array();

  constructor(private servicio: ProductService, private carritoService: CarritoService) {}
  ngOnInit(): void {
    this.servicio.get$ProductList().subscribe((products) => {
      this.listaProductos = products;
      this.rellenarListas();
    });
    this.servicio.getAllProducts();
  }

  filtrar(evento: any) {
    this.servicio.filtrar(evento.detail.value);
    this.rellenarListas();
  }

  rellenarListas() {
    this.listaPrimeraMitad = new Array();
    this.listaSegundaMitad = new Array();

    for (let i = 0; i < this.listaProductos.length / 2; i++) {
      if (this.listaProductos[i].getType() === 'Comida') {
        this.listaPrimeraMitad.push(this.listaProductos[i]);
      }
    }

    for (
      let i = this.listaProductos.length / 2;
      i < this.listaProductos.length;
      i++
    ) {
      if (
        !this.comprobarSiEstaEnLista(
          this.listaPrimeraMitad,
          this.listaProductos[Math.floor(i)]
        )
      ) {
        if (this.listaProductos[Math.floor(i)].getType() === 'Comida') {
          this.listaSegundaMitad.push(this.listaProductos[Math.floor(i)]);
        }
      }
    }
  }

  comprobarSiEstaEnLista(lista: Array<Producto>, producto: Producto) {
    let flag: Boolean = false;
    for (let index = 0; index < lista.length; index++) {
      if (lista[index] === producto) {
        flag = true;
      }
    }
    return flag;
  }

  countProductsInOrder(product: Producto){
   let number =  this.carritoService.countProductsInOrder(product);
   return number;
  }

  anadirProductosPrimeraMitad(i: number) {
    this.servicio.anadirACarrito(this.listaPrimeraMitad, i);
  }

  anadirProductosSegundaMitad(i: number) {
    this.servicio.anadirACarrito(this.listaSegundaMitad, i);
  }
}
