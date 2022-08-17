import { Component, Input, SimpleChanges } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent {

  constructor(private http: HttpClient, private service: ApiService) { }

  @Input() creationModal: boolean = false;
  ngOnChanges(changes: SimpleChanges) {
    this.toggleCreationModal();
  } 

  // open a modal that enables a user to give a username & password + password confirmation
  displayModal = true;
  toggleCreationModal() {
    this.displayModal = !this.displayModal;
  }

  userCreationData = new FormGroup({
    name: new FormControl(''),
    shipping_address: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
    rePassword: new FormControl('')
  })

  createUserAccount(event: any) {
    event.preventDefault();
    let passwordsMatch: boolean = this.checkPasswordMatch();

    const tokenObject = JSON.parse(localStorage.getItem("customer") || '{}');
    const accessToken = tokenObject["Access-Token"];

    if (passwordsMatch) {
      // splitting up the form content since the server expects (customer, username, password)

      const name = this.userCreationData.value.name;
      const shipping_address = this.userCreationData.value.shipping_address;
      const username = this.userCreationData.value.username;
      const password = this.userCreationData.value.password

      const combinedData = {
        name: name,
        address: shipping_address,
        username: username,
        password: password
      };

      const customerData = JSON.stringify(combinedData)

      this.service.postUserCreation(customerData, accessToken)
        .subscribe(() => {
          this.toggleCreationModal();
        })

    } else {
      this.displayPasswordError = true;
    }
  }

  displayPasswordError = false;

  checkPasswordMatch(): boolean {
    let response: boolean;

    if (this.userCreationData.value.password != this.userCreationData.value.rePassword) {
        response = false;
    } else {
        response = true;
    }

    return response;
  }
}
