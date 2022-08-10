import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, Params} from "@angular/router"
import { HttpClient } from '@angular/common/http';
import {Customer} from "../login-form/login-form.component";

// for testing only
import {testJson, cart} from "../testJson";
// testing only

export interface Product {
  id: number,
  name: string,
  price: number,
  material: string,
  type: string
}

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})

export class ProductPageComponent implements OnInit {
  // for testing item placement only
  // real data will likely be created in the constructor
  products = testJson;
  cart = cart;
  // testing only

  // https://team7project2api.azurewebsites.net/store for getting al jewelry
  constructor(private router: Router, private http: HttpClient, private route: ActivatedRoute) {}

  customer: any;

  ngOnInit(): void {
    this.fetchAllProducts();
    this.route.queryParams.subscribe(
      (params: Params) => {
        this.customer = params["customer"];
      }
    );

    console.log(this.customer);
  }

  allProducts: Array<Product> = [];
  async fetchAllProducts() {
    // returns List<Jewelry> (id, name, price, material, type)
    this.http.get("https://team7project2api.azurewebsites.net/store", {
      observe: "response",
      responseType: "json"
    })
      .subscribe((result: any) => {
        console.log(result)
        // loop through result.body, appending each product to allProducts
        // add error handling for 500 returns
      })
  }

  // for opening the modal to the cart
  // the change in this variable is tracked in cart component, which reacts accordingly
  openModalCommand = false;
  toggleCartModal() {
    this.openModalCommand = !this.openModalCommand;
  }

  // adds clicked tile to cart
  addToCart(product: any) {
    cart.push(product);
  }

  openProfileModalCommand = false;
  toggleProfileModal() {
    this.openProfileModalCommand = !this.openProfileModalCommand;
  }

  // allow for infinite scroll OR pagination
  // will be tied to the fetchProducts endpoint
  // grab perhaps first 20 columns, save what column # we are at
  // fetch next 20, so on & so forth

}
