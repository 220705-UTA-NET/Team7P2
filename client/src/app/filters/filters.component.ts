import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Product} from "../product-page/product-page.component";

export interface Filter {
  filter: string,
  value: string
}

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent {

  constructor(private http: HttpClient) { }

  activeFilter(event: any) {
    let clickedFilter = event.target;
    clickedFilter.classList.toggle("active-filter");
  }

  // be sure to pass both the metadata (is it material or type) along with the value
  filteredProducts: Array<Product> = [];
  filterType(type: string) {
    // inject type into url
      let filter: Filter = {
        filter: "type",
        value: "type"
      }

      this.http.get("https://team7project2api.azurewebsites.net/", {
        observe: "response",
        responseType: "json"
      })
        .subscribe((result) => {
          console.log(result);
        })
  }

  filterMaterial(material: string) {
    // inject material into url
    let filter: Filter = {
      filter: "material",
      value: material
    }
    this.http.get("https://team7project2api.azurewebsites.net/", {
      observe: "response",
      responseType: "json"
    })
      .subscribe((result) => {
        console.log(result)
      })
  }

}
