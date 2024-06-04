import { Injectable } from '@angular/core';
import { Producto } from './producto';
import { BehaviorSubject } from 'rxjs';
import { CarritoService } from './carrito.service';
import { BackConnectionService } from './back-connection.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productList: Array<Producto> = [];
  private $productList: BehaviorSubject<Array<Producto>> = new BehaviorSubject<
    Array<Producto>
  >(this.productList);
  constructor(
    private carritoService: CarritoService,
    private backService: BackConnectionService
  ) {}

  getAllProducts() {
    this.productList = [];
    this.backService.getAllProducts().subscribe((products) => {
      products.forEach((product) => {
        this.anadirProducto(product);
      });
      this.$productList.next(this.productList);
    });
  }

  transformarImagen(buffer: ArrayBuffer) {
    const arrayBufferView = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < arrayBufferView.length; i++) {
      binary += String.fromCharCode(arrayBufferView[i]);
    }

    let type = '';

    // Lógica para saber en que formato está la imagen
    if (binary.startsWith('\x89\x50\x4e\x47')) {
      type = 'image/png';
    } else if (binary.startsWith('\xff\xd8\xff')) {
      type = 'image/jpeg';
    } else if (binary.startsWith('data:image/gif')) {
      type = 'image/gif';
    } else if (binary.startsWith('data:image/jpg')) {
      type = 'image/jpg';
    }

    return 'data:' + type + ';base64,' + btoa(binary);
  }

  getProductList(): Array<Producto> {
    return this.productList;
  }

  get$ProductList() {
    return this.$productList;
  }

  filtrar(valor: string) {
    let listaAuxiliar = this.productList;
    if (valor === '') {
      listaAuxiliar = this.productList;
    } else {
      listaAuxiliar = this.productList.filter((producto) =>
        producto.getName().toLowerCase().includes(valor.toLowerCase())
      );
    }
    this.$productList.next(listaAuxiliar);
  }

  anadirACarrito(lista: Array<Producto>, index: number) {
    this.carritoService.addProducto(lista[index]);
  }

  anadirProducto(product: any) {
    let base64Imagen = this.transformarImagen(product.image.data);
    let producto = new Producto(
      product._id,
      product.name,
      product.price,
      product.description,
      base64Imagen,
      product.availability,
      product.type
    );
    this.productList.push(producto);
  }

  anadirProductoMedianteSocket(product: any) {
    let base64Imagen = this.transformarImagen(product.product.image.data);
    let producto = new Producto(
      product.product._id,
      product.product.name,
      product.product.price,
      product.product.description,
      base64Imagen,
      product.product.availability,
      product.product.type
    );
    this.productList.push(producto);
    this.$productList.next(this.productList);
  }

  updateListProduct(product: any) {
    if (!product.product.availability) {
      this.productList.forEach((producto, index) => {
        if (product.product._id === producto.getId()) {
          this.productList.splice(index, 1);
        }
      });
      this.$productList.next(this.productList);
    } else {
      this.anadirProductoMedianteSocket(product);
    }
  }

  deleteProduct(_id: any) {
    this.productList.forEach((product, index) => {
      if (product.getId() === _id._id) {
        this.productList.splice(index, 1);
      }
    });
  }
}
