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

    // test that this actually works with the correct form data
    // use https://httpbin.org/post, which supposedly echos POST content
    authenticateUser() {
      fetch("https://httpbin.org/post", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.loginData.value)
      });
    }
}
