import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { CheckoutPageComponent } from './checkout-page/checkout-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { FiltersComponent } from './filters/filters.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { CartComponent } from './cart/cart.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductPageComponent,
    CheckoutPageComponent,
    LoginPageComponent,
    FiltersComponent,
    ProductItemComponent,
    CartComponent
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
