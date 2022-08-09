import { Component } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from "@angular/router"

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  constructor(private router: Router) { }

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

  // combine username & password, seperated by ; & base64 encryped
  // send as an authorization header
  // endpoint is /login
  loginFailed = false;
  async authenticateUser() {
    let credentialBase: string = `${this.loginData.value.username}:${this.loginData.value.password}`;

    // will need testing, but this may be what we need
    let encodedString = Buffer.from(credentialBase).toString("base64");
    console.log(encodedString)

    // send request
    const response = await fetch("https://httpbin.org/get", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': JSON.stringify(encodedString)
      }
    });

    // if 200 (user successfully logged in)
    // parse response & determine next step
    if (response.status === 200) {
      console.log(response);
      const responseBody = await response.text();
      // const customer = JSON.parse(responseBody);
      console.log(responseBody)

    } else {
      // let the user know that the login failed
      console.log(`Login failed: ${response.status}`)
      this.loginFailed = true;
    }

    // this.router.navigate(["/productPage"])
  }

}
