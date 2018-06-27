// import {Component} from '@angular/core';
//
// @Component({
//   selector: 'app-root',
//   template: `
//   <h1>Universal Demo using Angular and Angular CLI</h1>
//   <a routerLink="/">Home</a>
//   <a routerLink="/lazy">Lazy</a>
//   <a routerLink="/lazy/nested">Lazy_Nested</a>
//   <router-outlet></router-outlet>
//   `,
//   styles: []
// })
// export class AppComponent {
//
// }
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
//import { HeaderComponent } from './components/header/header.component';
import { routing, appRoutingProviders } from './app.routing';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
}
/*
@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing
    ],
    providers: [appRoutingProviders],
    bootstrap: [AppComponent]
})
export class AppModule { }
*/
