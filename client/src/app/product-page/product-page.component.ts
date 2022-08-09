import { Component } from '@angular/core';
import {Router} from "@angular/router"
import {ProductItemComponent} from "../product-item/product-item.component";
import {FiltersComponent} from "../filters/filters.component";

// for testing only
import {testJson, cart} from "../testJson";
// testing only

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})

export class ProductPageComponent {
  // for testing item placement only
  // real data will likely be created in the constructor
  products = testJson;
  cart = cart;
  userProfile = this.setUserProfile();
  // testing only

  constructor(private router: Router) {}

  // for opening the modal to the cart
  // the change in this variable is tracked in cart component, which reacts accordingly
  openModalCommand = false;
  toggleCartModal() {
    this.openModalCommand = !this.openModalCommand
  }

  // adds clicked tile to cart
  addToCart(product: any) {
    cart.push(product);
  }

  setUserProfile() {
    return "testUser";
  }

  profileModalToggle = false;
  toggleProfileModal() {
    this.profileModalToggle = !this.profileModalToggle;
  }

  // fetch order history from API
  viewOrderHistory() {}

  // move user back to login page & reset the session user
  logout() {}

  // allow for infinite scroll OR pagination
  // will be tied to the fetchProducts endpoint
  // grab perhaps first 20 columns, save what column # we are at
  // fetch next 20, so on & so forth
}
