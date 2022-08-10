import { Component } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from "@angular/router";
import { HttpClient } from '@angular/common/http';

export interface Customer {
  id: number,
  name: string,
  shipping_address: string
}

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  constructor(private router: Router, private http: HttpClient) { 
    this.loginResponse = '';
  }

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
  loginResponse: any;

  async authenticateUser() {
    let credentialBase: string = `${this.loginData.value.username}:${this.loginData.value.password}`;

    let encodedString = Buffer.from(credentialBase).toString("base64");
    let authCredentials = `Basic ${encodedString}`;

    this.http.get("https://team7project2api.azurewebsites.net/login", {
      headers: {'Authorization': authCredentials},
      observe: "response",
      responseType: "json"
    })
      .subscribe((result: any) => {
        this.loginResponse = result

        // if body.id != 0, login successful
        // parse response & determine next step
        if (this.loginResponse.body.id != 0) {
          console.log('log in successful')

          // response body should return customer info
          const responseBody: Customer = this.loginResponse.body;

          this.router.navigate(["/productPage"], {queryParams: {
            customer:responseBody}
          });

        } else {
          // let the user know that the login failed
          console.log(`Login failed`)
          this.loginFailed = true;
        }
      })
  }
}
