import { Component, Input } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from "@angular/router"

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent {

  constructor() { }

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
    username: new FormControl(''),
    password: new FormControl(''),
    rePassword: new FormControl('')
  })

  createUserAccount(event: any) {
    event.preventDefault();
    let passwordsMatch: boolean = this.checkPasswordMatch();

    if (passwordsMatch) {
      fetch("https://httpbin.org/post", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.userCreationData.value)
      });

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
