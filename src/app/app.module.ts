import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import * as $ from 'jquery'

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

//Componentes de Carousel principal
import { HomePrincipalComponent } from './components/principal/principal.component';
import { Slide1Component } from './components/principal/slide1/slide-1.component';
import { Slide2Component } from './components/principal/slide2/slide-2.component';
import { Slide3Component } from './components/principal/slide3/slide-3.component';
import { Slide4Component } from './components/principal/slide4/slide-4.component';
import { Slide5Component } from './components/principal/slide5/slide-5.component';
import { Slide6Component } from './components/principal/slide6/slide-6.component';

import { NewProductsComponent } from './components/new-products/new-products.component';
import { RecommendedComponent } from './components/recommended/recommended.component';
import { Seccion1Component } from './components/secciones/seccion-1/seccion-1.component';
import { Seccion2Component } from './components/secciones/seccion-2/seccion-2.component';
import { Seccion3Component } from './components/secciones/seccion-3/seccion-3.component';
import { Seccion4Component } from './components/secciones/seccion-4/seccion-4.component';
import { Seccion5Component } from './components/secciones/seccion-5/seccion-5.component';
import { TendenciasComponent } from './components/tendencias/tendencias.component';
import { ChatComponent } from './components/chat/chat.component';
import { GoUpComponent } from './components/go-up/go-up.component';
import { CategoryComponent } from './components/category/category.component';
import { FiltrosComponent } from './components/category/filtros/filtros.component';
import { ProductosComponent } from './components/category/productos/productos.component';


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
    HomePrincipalComponent,
    Slide1Component,
    Slide2Component,
    Slide3Component,
    Slide4Component,
    Slide5Component,
    Slide6Component,
    NewProductsComponent,
    RecommendedComponent,
    Seccion1Component,
    Seccion2Component,
    Seccion3Component,
    Seccion4Component,
    Seccion5Component,
    TendenciasComponent,
    ChatComponent,
    GoUpComponent,
    CategoryComponent,
    FiltrosComponent,
    ProductosComponent

  ],
  imports: [
    HttpModule,
    HttpClientModule,
    BrowserModule.withServerTransition({appId: 'my-app'}),
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full'},
      { path: 'blog', component: BlogComponent, pathMatch: 'full'},
      { path: 'lazy', loadChildren: './components/lazy/lazy.module#LazyModule'},
      { path: 'lazy/nested', loadChildren: './components/lazy/lazy.module#LazyModule'}
    ]),
    FormsModule,
    BrowserAnimationsModule,
    // ReactiveFormsModule,
    TransferHttpCacheModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
