import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Producto } from '../producto';
import { CarritoService } from '../carrito.service';

@Component({
  selector: 'app-bebida',
  templateUrl: './bebida.page.html',
  styleUrls: ['./bebida.page.scss'],
})
export class BebidaPage implements OnInit {
  listaBebidas!: Array<Producto>;
  listaPrimeraMitad: Array<Producto> = new Array();
  listaSegundaMitad: Array<Producto> = new Array();
  constructor(private servicio: ProductService, private carritoService: CarritoService) {}
  ngOnInit(): void {
    this.servicio.get$ProductList().subscribe((products) => {
      this.listaBebidas = products;
      this.rellenarListas();
    });

    if (this.listaBebidas.length == 0) {
      this.servicio.getAllProducts();
    }
  }

  rellenarListas() {
    this.listaPrimeraMitad = new Array();
    this.listaSegundaMitad = new Array();

    for (let i = 0; i < this.listaBebidas.length / 2; i++) {
      if (this.listaBebidas[i].getType() === 'Bebida') {
        this.listaPrimeraMitad.push(this.listaBebidas[i]);
      }
    }

    for (
      let i = this.listaBebidas.length / 2;
      i < this.listaBebidas.length;
      i++
    ) {
      if (
        this.comprobarSiEstaEnLista(
          this.listaPrimeraMitad,
          this.listaBebidas[Math.floor(i)]
        ) == false
      ) {
        if (this.listaBebidas[Math.floor(i)].getType() === 'Bebida') {
          this.listaSegundaMitad.push(this.listaBebidas[Math.floor(i)]);
        }
      }
    }
  }

  countProductsInOrder(product: Producto) {
   let number = this.carritoService.countProductsInOrder(product);
   return number;
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

  anadirProductosPrimeraMitad(i: number) {
    this.servicio.anadirACarrito(this.listaPrimeraMitad, i);
  }

  anadirProductosSegundaMitad(i: number) {
    this.servicio.anadirACarrito(this.listaSegundaMitad, i);
  }
}
