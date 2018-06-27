import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { BlogComponent } from './components/blog/blog.component';
import { BlogLujoComponent } from './components/blog/lujo/lujo.component';
import { BlogSofasComponent } from './components/blog/sofas/sofas.component';
import { BlogVintageComponent } from './components/blog/vintage/vintage.component';
import { FooterComponent } from './components/footer/footer.component';
import { NewsletterComponent } from './components/footer/newsletter/newsletter.component';
import { TopBannerComponent } from './components/header/top-banner/top-banner.component';



import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/header/menu/menu.component';
import { CarritoSimpleComponent } from './components/header/menu/carrito/carrito-simple.component';
import { CarritoComponent } from './components/header/menu/carrito/carrito.component';
import { PromocionComponent } from './components/header/top-banner/promocion/promocion.component';

import {TransferHttpCacheModule} from '@nguniversal/common';


//Directivas
import { StickyMenuDirective } from './directives/sticky.directive';
import { StickyBodyDirective } from './directives/sticky-body.directive';
import { StickyBgMenuDirective } from './directives/sticky-bg-menu.directive';
import { StickySubMenuDirective } from './directives/sticky-submenu.directive';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BlogComponent,
    HeaderComponent,
    MenuComponent,
    BlogLujoComponent,
    BlogSofasComponent,
    BlogVintageComponent,
    CarritoSimpleComponent,
    CarritoComponent,
    PromocionComponent,
    FooterComponent,
    NewsletterComponent,
    TopBannerComponent,
    StickyMenuDirective,
    StickyBodyDirective,
    StickyBgMenuDirective,
    StickySubMenuDirective,
  ],
  imports: [
    HttpModule,
    HttpClientModule,
    BrowserModule.withServerTransition({appId: 'my-app'}),
    RouterModule.forRoot([
      { path: '', component: BlogComponent, pathMatch: 'full'},
      { path: 'lazy', loadChildren: './components/lazy/lazy.module#LazyModule'},
      { path: 'lazy/nested', loadChildren: './components/lazy/lazy.module#LazyModule'}
    ]),
    TransferHttpCacheModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
