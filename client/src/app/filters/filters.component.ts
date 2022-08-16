import { Component, Input, Output, EventEmitter, ElementRef } from '@angular/core';
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

  constructor(private http: HttpClient, private router: Router, private elem: ElementRef) { }

  @Input() accessToken: string = '';

  currentFilters: ActiveFilters = {
    type: 'None',
    material: 'None'
  }

  activateFilter(event: any, category: string, detail: string) {
    // reset active class of all
    console.log(event.target.classList)
    if (event.target.classList.contains("filter-option-type")) {
      const elements = this.elem.nativeElement.querySelectorAll(".filter-option-type")
      elements.forEach((element: any) => {
        element.classList.remove("active-filter");
      });

    } else if (event.target.classList.contains("filter-option-material"))  {
        const elements = this.elem.nativeElement.querySelectorAll(".filter-option-material")
        elements.forEach((element: any) => {
          element.classList.remove("active-filter");
        });
    }

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
    this.http.get(`https://team7project2api.azurewebsites.net/store/filter/${this.currentFilters.material}/${this.currentFilters.type}`, {
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

  startRow: number = 0;
  endRow: number = 8;
  fetchAllProducts() {
    this.http.get(`https://team7project2api.azurewebsites.net/store/${this.startRow}/${this.endRow}`, {
      headers: {"Authorization": `Bearer ${this.accessToken}`},
      observe: "response",
      responseType: "json"
    })
      .subscribe((result: any) => {
        console.log("reset", result)
        this.updatedProducts.emit(result.body)
      })
  }
}
