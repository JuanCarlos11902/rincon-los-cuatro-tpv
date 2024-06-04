import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket = io('http://127.0.0.1:3000');

  constructor(private servicio: ProductService) { 
    this.startListeningForProductAdded();
    this.startListeningForProductUpdated();
    this.startListeningForProductDeleted();
  }

  private startListeningForProductAdded() {
    this.socket.on('productAdded', (data) =>{
      this.servicio.anadirProductoMedianteSocket(data);
    })
  }

  private startListeningForProductUpdated(){
    this.socket.on('productUpdated', (data) =>{
      this.servicio.updateListProduct(data);
    })
  }

  private startListeningForProductDeleted(){
    this.socket.on('productDeleted',(data) =>{
      this.servicio.deleteProduct(data);
    })
  }

}