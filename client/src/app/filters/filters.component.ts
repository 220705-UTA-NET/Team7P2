import { Component, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Product} from "../product-page/product-page.component";
import { Router } from '@angular/router';

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

  constructor(private http: HttpClient, private router: Router) { }

  @Input() accessToken: string = '';

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

  // output to be listened for on product-page
  // should be of type Product[], but linter won't recognize it
  @Output() updatedProducts = new EventEmitter<any>();
  filterProducts() {
    this.http.get(`https://team7project2api.azurewebsites.net/store/${this.currentFilters.material}/${this.currentFilters.type}`, {
      headers: {"Authorization": `Bearer ${this.accessToken}`},
      observe: "response",
      responseType: "json"
    })
      .subscribe((result) => {
        // need to subscribe to changes to filteredProducts & change allProducts in product-page accordingly
        this.updatedProducts.emit(result.body)
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
    this.http.get("https://team7project2api.azurewebsites.net/store", {
      headers: {"Authorization": `Bearer ${this.accessToken}`},
      observe: "response",
      responseType: "json"
    })
      .subscribe((result: any) => {
        this.updatedProducts.emit(result.body)
      })
  }
}
