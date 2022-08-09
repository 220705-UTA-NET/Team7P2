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

  authenticateUser() {
    fetch("https://httpbin.org/post", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.loginData.value)
    });

    this.router.navigate(["/productPage"])
  }

}
