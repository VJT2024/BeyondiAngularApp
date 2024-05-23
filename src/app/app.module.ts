import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environment';

import { LoginComponent } from './user-authentication/login/login.component';
import { SharedModule } from './shared/shared.module';
import * as firebase from 'firebase/app';
import { SignUpComponent } from './user-authentication/sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { AppStoreModule } from './app.store.module';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AuthService } from './user-authentication/auth.service';

firebase.initializeApp(environment.firebase);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    HomeComponent,
    ProductsComponent,
    AdminPanelComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    SharedModule,
    AppStoreModule,
  ],
  providers: [provideAnimationsAsync(), AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
