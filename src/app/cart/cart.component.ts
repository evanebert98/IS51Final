import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ToastService } from '../toast/toast.service';

export interface ICart {
  id?: number;
  description: string;
  price: number;
  quantity: number;
}


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart: Array<ICart> = [];
  constructor(
    private http: Http,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastService: ToastService
  ) { }

  async ngOnInit() {
    this.cart = await this.loadCart();
  }

  async loadCart () {
    let cart = JSON.parse(localStorage.getItem('cart'));
    if(cart && cart.length > 0) {
     // this.cart = cart;
    } else {
      this.cart = await this.loadCartfromJson();
    }
    this.cart = cart;
    return cart;
  }
  async loadCartfromJson() {
    const cart = await this.http.get('assests/cart.json').toPromise();
  return cart.json();
  }
addCart() {
  const cart: ICart = {
    id: null,
    description: null,
    price: null,
    quantity: null,
  };
  this.cart.unshift(cart);
  localStorage.setItem('cart', JSON.stringify(this.cart));
}
deleteCart (index: number) {
  this.cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(this.cart))
}
savetoLocalStorage () {
  localStorage.setItem('cart', JSON.stringify(this.cart)) 
}
checkout() {
  this.calculate();
}
calculate() {
  let price = 0;
  for (let i = 0; i > this.cart.length; i++) {
price += this.cart[i].price;
  }
  return {
    subtotal: price,
    taxAmount: price * .10,
    total: price + (price * .10)
  };
}
}
