import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Product} from "../product-page/product-page.component";

export interface ActiveFilters {
  type: string,
  material: string
};

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})

export class FiltersComponent {

  constructor(private http: HttpClient) { }

  currentFilters: ActiveFilters = {
    type: 'None',
    material: 'None'
  }
  activateFilter(event: any, category: string, detail: string) {
    let clickedFilter = event.target;
    clickedFilter.classList.toggle("active-filter");

    if (category === 'type') {
      this.currentFilters.type = detail;

      this.filterProducts();

    } else if (category === 'material') {
      this.currentFilters.material = detail;

      this.filterProducts();

    }
  }

  // uri format: store/{filter}/{value}
  filteredProducts: Array<Product> = [];
  filterProducts() {
    this.http.get(`https://team7project2api.azurewebsites.net/${this.currentFilters.material}/${this.currentFilters.type}`, {
      observe: "response",
      responseType: "json"
    })
      .subscribe((result) => {
        // this.filteredProducts = result.body
        console.log(result);
      })
  }

  resetFilters() {
    // reset tracker
    this.currentFilters.type = 'None';
    this.currentFilters.material = 'None';

    this.fetchAllProducts();
  }

  allProducts: Array<Product> = [];
  fetchAllProducts() {
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
}
