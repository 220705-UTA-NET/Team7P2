import { Component } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})

export class LoginPageComponent {
  // moves label when an input is focused, purely cosmetic
  usernameLabelShift = false;
  passwordLabelShift = false;

  shiftLabel(label: string){
    if (label === "username") {
      this.usernameLabelShift = true;
    } else if (label === "password") {
      this.passwordLabelShift = true;
    }
  }

  // login credentials to be passed to auth API
  loginData = new FormGroup({
      username : new FormControl(''),
      password : new FormControl('')
  })

  authenticateUser() {
    fetch("https://httpbin.org/post", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.loginData.value)
    });
  }

  // open a modal that enables a user to give a username & password + password confirmation
  displayModal = false;
  toggleCreationModal() {
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
