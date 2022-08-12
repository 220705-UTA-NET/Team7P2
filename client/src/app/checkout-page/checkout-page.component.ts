import { Component } from '@angular/core';
import {ActivatedRoute, Router, Params} from "@angular/router"
import { Product } from '../product-page/product-page.component';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})

export class CheckoutPageComponent {

  constructor(private router: Router, private route: ActivatedRoute) {
    this.route.queryParams.subscribe((params) => {
      let filledCart: Product[] = JSON.parse(params["cart"]);
      this.cart = filledCart;
      this.cartPriceTotal = this.cartTotal();
    });
  }

  cart: Product[] = [];
  cartPriceTotal = 0;

  cartTotal() {
    let cartPriceTotal = 0;
    this.cart.forEach(cartItem => cartPriceTotal += cartItem.price)
    return cartPriceTotal;
  }

  // send request to Stripe API
  // set up confirmation modal
  confirmationModal = false;
  makePurchase() {

    // make request to payment api

    this.confirmationModal = !this.confirmationModal;
  }

  // re-route user back to product page, but maintain login
  cancelOrder() {
    // will need to pass the current cart so that it is not lost
    this.router.navigate(["/productPage"], {queryParams : {cart: JSON.stringify(this.cart)}});
  }

  // return user back to product page with an empty cart
  continueShopping() {
    // cart is automatically reset
    // return user to productPage
    this.router.navigate(["/productPage"]);
  }

}
