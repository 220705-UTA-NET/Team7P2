import { Component } from '@angular/core';
import {Router} from "@angular/router"
// for testing only
import {testJson, cart} from "../product-page/testJson";

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})
export class CheckoutPageComponent {
  constructor(private router: Router) {

  }

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
    // send request to Stripe API
    fetch("");

    this.confirmationModal = !this.confirmationModal;
  }

  // re-route user back to product page, but maintain login
  cancelOrder() {
    this.router.navigate(["/productPage"]);
  }

  // return user back to product page with an empty cart
  continueShopping() {
    // empty cart

    // return user to productPage
    this.router.navigate(["/productPage"]);
  }

}
