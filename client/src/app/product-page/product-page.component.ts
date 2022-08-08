import { Component } from '@angular/core';
// for testing only
import testingJson from "./testJson";

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})

export class ProductPageComponent {
  // for testing item placement only
  products = testingJson;

  // will need listeners for clicks to:
  // -------------------------------------
  // profile (pop up modal with username + order history)
  // cart (create modal with current cart items + display current number)
  // filters (re-query for items)
  // item (simply add to cart)

}
