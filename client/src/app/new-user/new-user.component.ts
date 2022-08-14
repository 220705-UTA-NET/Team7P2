import { Component, Input } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent {

  constructor(private http: HttpClient) { }

  @Input() creationModal: boolean = false;
  ngOnChanges() {
    console.log('fired on change')
    this.toggleCreationModal();
  } 

  // open a modal that enables a user to give a username & password + password confirmation
  displayModal = true;
  toggleCreationModal() {
    console.log('toggle modal')
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

    // testing only
    const testingTokenObject = JSON.parse(localStorage.getItem("customer") || '{}');
    const testingToken = testingTokenObject["Access-Token"];
    console.log(testingToken)

    if (passwordsMatch) {
      // splitting up the form content since the server expects (customer, username, password)

      const name = this.userCreationData.value.name;
      const shipping_address = this.userCreationData.value.shipping_address;
      const username = this.userCreationData.value.username;
      const password = this.userCreationData.value.password

      const combinedData = {
        name: name,
        shipping_address: shipping_address,
        username: username,
        password: password
      };

      const customerData = JSON.stringify(combinedData)
      console.log(customerData)

      // issue is likely due to the fact that the server cannot parse the response body
      this.http.post(`https://team7project2api.azurewebsites.net/customer?username=${username}&password=${password}`, customerData, {
        // header for testing only since create customer is stuck under auth
        headers: new HttpHeaders({
          Authorization: `Bearer ${testingToken}`,
          "Content-Type": "application/json"
          
        }),
        observe: "response",
        responseType: "json"
      })
        .subscribe((result) => {
          console.log(result)
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
