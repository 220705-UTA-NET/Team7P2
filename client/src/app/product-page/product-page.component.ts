import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router"
import { HttpClient } from '@angular/common/http';
import {Customer} from "../login-form/login-form.component";

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

  constructor(private router: Router, private http: HttpClient) {
    // views where the user came from, relevant for persisting user cart
    const previousRoute = this.router.getCurrentNavigation()?.previousNavigation?.finalUrl?.toString();
    this.previousUrl = previousRoute || '';
  }

  ngOnInit(): void {
    this.fetchAllProducts();
  }

  previousUrl: string = '';

  customer: Customer = {
    "CustomerID": 0,
    "Access-Token": ''
  };

  allProducts: Array<Product> = [];
  productFetchError: boolean = false;

  fetchAllProducts() {
    // will not parse without {} since getItem can be null
    const customer: Customer = JSON.parse(localStorage.getItem("customer") || '{}');
    this.customer = customer;

    // returns List<Jewelry> (id, name, price, material, type)
    this.http.get("https://team7project2api.azurewebsites.net/store", {
      headers: {"Authorization": `Bearer ${customer["Access-Token"]}`},
      observe: "response",
      responseType: "json"
    })
      .subscribe((result: any) => {
        if (result.status === 200) {
          const products = result.body;

          products.forEach((item: Product) => {
            this.allProducts.push(item);

          })

        } else {
          // render a statement that there was a problem loading the results
          this.productFetchError = true;
          console.log(result.status)
        }
      })
  }

  // for opening the modal to the cart
  // the change in this variable is tracked in cart component, which reacts accordingly
  openModalCommand = false;
  toggleCartModal() {
    this.openModalCommand = !this.openModalCommand;
  }

  cart: Product[] = [];
  // adds clicked tile to cart
  addToCart(product: Product) {
    this.cart.push(product);
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
