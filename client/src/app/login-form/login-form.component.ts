import { Component } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from "@angular/router";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';

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

    // will need testing, but this may be what we need
    let encodedString = Buffer.from(credentialBase).toString("base64");
    console.log(encodedString)

    //https://team7project2api.azurewebsites.net/login

    // send request
    const response = this.http.get("https://jsonplaceholder.typicode.com/posts/1", {
      headers: {'Authorization': encodedString},
      observe: "response",
      responseType: "json"
    })
      .subscribe((result: any) => {
        this.loginResponse = result
        console.log(this.loginResponse);

        // if status == 200, successful login
        // parse response & determine next step
        if (this.loginResponse.status === 200) {
          console.log('log in successful')
          const responseBody = this.loginResponse.body;

          // save response body into some variable to be used globally
          console.log(responseBody)

          // this.router.navigate(["/productPage"])

        } else {
          // let the user know that the login failed
          console.log(`Login failed`)
          this.loginFailed = true;
        }
      })
  }
}
