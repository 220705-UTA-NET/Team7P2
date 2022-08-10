import { Component, Input } from '@angular/core';
import {Router} from "@angular/router"
import {cart} from "../testJson";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent {
  // for testing fake values ONLY
  cart = cart;
  // 

  constructor(private router: Router) {}

  // listening for changes to openModalCommand from parent (fires when user clicks cart icon to open modal)
  @Input() openModalCommand: boolean = false;
  ngOnChanges() {
    this.toggleCartModal();
  }

  // cartToggle needs to be initially set to TRUE so that it does not automatically open on load:
  // The opening of the modal within parent product-page component fires an event that triggers toggleCartModal automatically
  cartToggle = true;
  toggleCartModal() {
    console.log("fired toggleCartModal")
    this.cartToggle = !this.cartToggle;
  }

  cartPriceTotal = this.cartTotal();
  cartTotal() {
    let cartPriceTotal = 0;
    cart.forEach(cartItem => cartPriceTotal += cartItem.price)
    return cartPriceTotal;
  }

  makePurchase() {
    // send cart data to checkout page
    this.router.navigate(["/checkout"]);
  }

  // interface ProductItem {
  //   name: string,
  //   price: number,
  // }

  removeCartItem(itemName: any) {
    let itemIndex = cart.indexOf(itemName);
    cart.splice(itemIndex, 1);
  }
}
