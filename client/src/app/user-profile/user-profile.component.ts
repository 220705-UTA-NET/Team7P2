import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from "@angular/router"
import {Customer} from "../login-form/login-form.component";

export interface ICustomer {
  id: number,
  name: string,
  shipping_address: string
}

export interface Order {
  order_date: string
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.setUserProfile();
  }


  @Input() openProfileModalCommand: boolean = false;
  ngOnChanges() {
    this.toggleProfileModal();
  } 

  @Input() customer: Customer = {
    "CustomerID": 0,
    "Access-Token": ''
  };

  userProfile: string = ''
  setUserProfile() {
    this.http.get(`https://team7project2api.azurewebsites.net/customer/${this.customer["CustomerID"]}`, {
      headers: {"Authorization": `Bearer ${this.customer["Access-Token"]}`},
      observe: "response",
      responseType: "json"
    })
      .subscribe((result) => {
        const resultBody: any = result.body;
        this.userProfile = resultBody.name;
      })
  }

  profileModalToggle = true;
  toggleProfileModal() {
    this.profileModalToggle = !this.profileModalToggle;
  }

  displayViewOrder: boolean = false;
  toggleViewOrderDisplay() {
    this.displayViewOrder = !this.displayViewOrder
  }

  orderHistory: any;
  // fetch order history from API
  viewOrderHistory() {
    this.http.get(`https://team7project2api.azurewebsites.net/orders/${this.customer["CustomerID"]}`, {
      headers: {"Authorization": `Bearer ${this.customer["Access-Token"]}`},
      observe: "response",
      responseType: "json"
    })
      .subscribe((result) => {
        console.log("viewOrderHistory", result)
        this.orderHistory = result.body
      })
  }

  // move user back to login page & remove access token
  logout() {
    localStorage.clear();
    this.router.navigate(["/"]);
  }

}
