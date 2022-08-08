import { Component } from '@angular/core';
// for testing only
import {testJson, cart} from "../product-page/testJson";

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})
export class CheckoutPageComponent {
  products = testJson;
  cart = cart;
  cartPriceTotal = this.cartTotal();

  cartTotal() {
    let cartPriceTotal = 0;
    cart.forEach(cartItem => cartPriceTotal += cartItem.price)
    return cartPriceTotal;
  }

  // send request to Stripe API
  // set up confirmation modal
  confirmationModal = false;
  makePurchase() {


    this.confirmationModal = !this.confirmationModal;
  }

  // re-route user back to product page, but maintain login
  cancelOrder() {}

  // return user back to product page with an empty cart
  continueShopping() {}

}
