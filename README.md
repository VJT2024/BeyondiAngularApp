# BeyondiAngularApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.7.
The application is build using Firebase Web API's reference document https://developers.google.com/codelabs/building-a-web-app-with-angular-and-firebase and is not a standalone application. Built using below Angular Building block.

Modules: AppModule.

Store: Ngsx store used for managing state of the user. Can find the changes in store/app.state.ts file.

Routing: Implemented in app.routing.module.ts.

Authentication: Includes below divisions

AuthComponents : Login and SignUp components

Authentication: Firebase Authentication -enabled Email and Password Authentication.

FireBase Auth: RegisterUser, SignInUser, ResetUserPassword.
Hard User account deletion is not supported by WebAPI, need backend services such as Node js etc.

Components: HomeComponent, ProductsComponent and AdminComponent.

Services: AuthService.

## Installation

Run `npm install`

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
