import { Component } from '@angular/core';
import {Router} from "@angular/router"
// for testing only
import {testJson, cart} from "./testJson";

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
  cartPriceTotal = this.cartTotal();
  userProfile = this.setUserProfile();
  // testing only

  constructor(private router: Router) {

  }

  cartTotal() {
    let cartPriceTotal = 0;
    cart.forEach(cartItem => cartPriceTotal += cartItem.price)
    return cartPriceTotal;
  }

  cartToggle = false;
  toggleCartModal() {
    this.cartToggle = !this.cartToggle;
  }

  addToCart(product: any) {
    cart.push(product);
  }
  
  removeCartItem(itemName: any) {
    let itemIndex = cart.indexOf(itemName);
    cart.splice(itemIndex, 1);
  }

  makePurchase() {
    // send cart data to checkout page
    this.router.navigate(["/checkout"]);
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

  activeFilter(event: any) {
    let clickedFilter = event.target;
    clickedFilter.classList.toggle("active-filter");
  }

  filterType(type: string) {
    // inject type into url
      fetch("");
  }

  filterMaterial(type: string) {
    // inject material into url
    fetch("");
  }

  // allow for infinite scroll OR pagination
  // will be tied to the fetchProducts endpoint
  // grab perhaps first 20 columns, save what column # we are at
  // fetch next 20, so on & so forth
}
