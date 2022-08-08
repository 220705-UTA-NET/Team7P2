import { Component } from '@angular/core';
// for testing only
import {testJson, cart} from "./testJson";

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})

export class ProductPageComponent {
  // for testing item placement only
  products = testJson;
  cart = cart;
  cartPriceTotal = this.cartTotal();

  cartTotal() {
    let cartPriceTotal = 0;
    cart.forEach(cartItem => cartPriceTotal += cartItem.price)
    return cartPriceTotal;
  }

  cartToggle = false;
  toggleCartModal() {
    this.cartToggle = !this.cartToggle;
  }
  
  removeCartItem(itemName: any) {
    let itemIndex = cart.indexOf(itemName);
    cart.splice(itemIndex, 1);
  }

  // to do:
  // -------------------------------------
    // cart
      // - onClick delete item from cart




    // item (simply add to cart)

    // filters (re-query for items)

    // profile (pop up modal with username + order history)
    
    // allow for infinite scroll OR pagination
}
