import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { CheckoutPageComponent } from './checkout-page/checkout-page.component';
import { LoginPageComponent } from './login-page/login-page.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductPageComponent,
    CheckoutPageComponent,
    LoginPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
