import { Component, Input, Output, EventEmitter, SimpleChange, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent {

  constructor() {}

  ngAfterViewInit() {
    // for initial setup
    if (this.iterator == 8) {
      this.iObserverSetup();
    }
  }

  @Input() product: any;
  @Input() iterator: any;

  // needed to let the product-page know it needs to update product list with more items
  @Output() displayMoreProducts = new EventEmitter();
  ngOnChanges(changes: SimpleChanges) {
    if (changes['iterator'].currentValue % 8 == 0 && changes['iterator'].currentValue != 0 && changes['iterator'].currentValue != 8) {
      setTimeout(this.iObserverSetup, 1000);
      console.log("CHANGES", changes)
    }
  }

  iObserverSetup() {
    let options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.7
    }

    let callback = (entries: any, observer: any) => {
      entries.forEach((entry: any) => {
        if (entry.isIntersecting) {
          // notify product-page to update allProducts
          console.log("intersecting");
          observer.unobserve(nextObserver)
          console.log("unobserved")
          this.displayMoreProducts.emit(this.iterator);
        }
      })
    }

    let observer = new IntersectionObserver(callback, options);

    let sortingList: NodeListOf<Element> = document.querySelectorAll("h3") as NodeListOf<Element>;

    let observerList: any[] = [];
    Array.from(sortingList, (element) => {
      if (element.classList.contains("observer")) {
        observerList.push(element)
      }
    })
    let nextObserver = observerList[observerList.length - 1]
    console.log(nextObserver, observerList.length)

    observer.observe(nextObserver);
  }
}
