import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent {

  constructor() { }

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


}
