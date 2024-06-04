import { Injectable } from '@angular/core';
import { Producto } from './producto';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private mesaSeleccionada!: number;
  private listaCarrito!: Array<Producto>;
  private formulario!: string;
  private $listaCarrito!: BehaviorSubject<Array<Producto>>
  
  constructor(private http: HttpClient) {
    this.listaCarrito = new Array();
    this.$listaCarrito = new BehaviorSubject<Array<Producto>>(this.listaCarrito)
  }

  getListaCarrito(){
    return this.listaCarrito;
  }

  countProductsInOrder(product: Producto){
    let count = 0;
    this.listaCarrito.forEach((productInOrder) => {
      if(productInOrder.getId() === product.getId()){
        count++;
      }
    });
    return count;
  }

  addProducto(producto:Producto){
    this.listaCarrito.push(producto);
    this.$listaCarrito.next(this.listaCarrito);
  }

  eliminarProducto(numero:number){
    this.listaCarrito.splice(numero,2);
    this.$listaCarrito.next(this.listaCarrito);
  }
  
  getFormulario(){
    return this.formulario;
  }

  setFormulario(valor:string){
    this.formulario = valor;
  }

  getMesaSeleccionada(){
    return this.mesaSeleccionada;
  }

  setMesaSeleccionado(valor:number){
    this.mesaSeleccionada = valor;
  }

  get$ListaCarrito(){
    return this.$listaCarrito;
  }

  vaciarCarrito(){
    this.listaCarrito = [];
    this.$listaCarrito.next(this.listaCarrito);
  }

  realizarPedido(body:any): Observable<any>{
    return this.http.post("http://localhost:3000/order/add", body);
  }

}
