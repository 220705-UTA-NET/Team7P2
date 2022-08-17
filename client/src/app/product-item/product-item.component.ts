import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ApiService} from "../api.service";

export interface Review {
  id: number,
  customer_id: number,
  jewelry_id: number,
  review_date: string,
  content: string,
  rating: number
}

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})

export class ProductItemComponent {

  constructor(private http: HttpClient, private service: ApiService) {}

  ngAfterViewInit() {
    // for initial setup
    if (this.iterator == 8) {
      this.iObserverSetup();
    }
  }

  @Input() product: any;
  @Input() iterator: any;
  @Input() accessToken: any;

  // needed to let the product-page know it needs to update product list with more items
  @Output() displayMoreProducts = new EventEmitter();
  ngOnChanges(changes: SimpleChanges) {
    if (changes['iterator'].currentValue % 8 == 0 && changes['iterator'].currentValue != 0 && changes['iterator'].currentValue != 8) {
      this.iObserverSetup();
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

          // re-comment once we have more products in the db
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

  reviews: Review[] = [];
  seeReviews(event: any) {
    event.stopPropagation();
    const itemId: string = event.target.id;

    this.service.getReviews(this.accessToken, itemId)
      .subscribe((result: any) => {
        // returns all results in an array, with content being the text
        const contentBody: Review[] = result.body
        contentBody.forEach((review: Review) => {
          // render the review & the star rating within the item's container
          this.reviews.push(review);
        })
      })
  }
}
