import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MetaModule } from '@ngx-meta/core';
// import { HttpClientModule } from '@angular/common/http';
// import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';

import { PromocionAlfComponent } from './components/promocion-alf/promocion-alf.component';


import { FooterComponent } from './components/footer/footer.component';
import { NewsletterComponent } from './components/footer/newsletter/newsletter.component';
import { TopBannerComponent } from './components/header/top-banner/top-banner.component';
import { BrowserTransferStateModule } from '@angular/platform-browser';
// Import library module
import { NgxJsonLdModule } from '@ngx-lite/json-ld';


import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/header/menu/menu.component';
import { CarritoSimpleComponent } from './components/header/menu/carrito/carrito-simple.component';
import { CarritoComponent } from './components/header/menu/carrito/carrito.component';
import { PromocionComponent } from './components/header/top-banner/promocion/promocion.component';
import { NewProductsComponent } from './components/new-products/new-products.component';
import { RecommendedComponent } from './components/recommended/recommended.component';
import { TendenciasComponent } from './components/tendencias/tendencias.component';
import { ChatComponent } from './components/chat/chat.component';
import { GoUpComponent } from './components/go-up/go-up.component';
import { CategoryComponent } from './components/category/category.component';
import { FiltrosComponent } from './components/category/filtros/filtros.component';
import { ProductosComponent } from './components/category/productos/productos.component';
import { TiendasComponent } from './components/tiendas/tiendas.component';
import { ProductoComponent } from './components/producto/producto.component';
import { ProductoRelacionadosComponent } from './components/producto/productos-relacionados/producto-relacionados.component';
import { ResultadoTransacciComponent } from './components/resultado-transaccion/resultado-transaccion.component';

import { TransferHttpCacheModule } from '@nguniversal/common';

//Componentes de Carousel principal
import { HomePrincipalComponent } from './components/principal/principal.component';
import { Slide1Component } from './components/principal/slide1/slide-1.component';
import { Slide2Component } from './components/principal/slide2/slide-2.component';
import { Slide3Component } from './components/principal/slide3/slide-3.component';

// Secciones
import { SeccionFijaComponent } from './components/secciones/seccion-fija/seccion-fija.component';
import { Seccion1Component } from './components/secciones/seccion-1/seccion-1.component';
import { Seccion2Component } from './components/secciones/seccion-2/seccion-2.component';
import { Seccion3Component } from './components/secciones/seccion-3/seccion-3.component';


//Directivas
import { StickyMenuDirective } from './directives/sticky.directive';
import { StickyBodyDirective } from './directives/sticky-body.directive';
import { StickyBgMenuDirective } from './directives/sticky-bg-menu.directive';
import { StickySubMenuDirective } from './directives/sticky-submenu.directive';

//Modulo mi cuenta
import { LoginComponent } from './components/mi-cuenta/login/login.component';
import { ResumenMiCuentaComponent } from './components/mi-cuenta/resumen/resumen.component';
import { CuentaComponent } from './components/mi-cuenta/resumen/cuenta/cuenta.component';
import { DireccionesComponent } from './components/mi-cuenta/resumen/direcciones/direcciones.component';
import { PedidosComponent } from './components/mi-cuenta/resumen/pedidos-garantias/pedidos.component';
import { NoviosComponent } from './components/mi-cuenta/resumen/mis-novios/mis-novios.component';
import { ClientesComponent } from './components/mi-cuenta/resumen/mis-clientes/mis-clientes.component';
import { LandingDecoradoresComponent } from './components/mi-cuenta/landing-decoradores/landing-decoradores.component';
import { LandingPlannerComponent } from './components/mi-cuenta/landing-planner/landing-planner.component';
import { ConfirmarUsuarioComponent } from './components/mi-cuenta/login/confirmar-usuario/confirmar-usuario.component';
import { ResumenCarritoComponent } from './components/resumen-carrito/resumen-carrito.component';
import { InfoPagoComponent } from './components/info-pago/info-pago.component';
import { InfoEnviosComponent } from './components/info-envios/info-envios.component';
import { EnviosComponent } from './components/envios/envios.component';
import { GarantiasComponent } from './components/garantias/garantias.component';
import { QuienesComponent } from './components/quienes-somos/quienes-somos.component';
import { TrabajaComponent } from './components/trabaja/trabaja.component';
import { ContactanosComponent } from './components/contactanos/contactanos.component';
// Blog
import { BlogComponent } from './components/blog/blog.component';
import { BlogLujoComponent } from './components/blog/lujo/lujo.component';
import { BlogSofasComponent } from './components/blog/sofas/sofas.component';
import { BlogVintageComponent } from './components/blog/vintage/vintage.component';
import { BlogOcasionalesComponent } from './components/blog/ocasionales/ocasionales.component';
import { BlogFlorerosComponent } from './components/blog/floreros/floreros.component';
import { BlogAparadoresComponent } from './components/blog/aparadores/aparadores.component';
import { BlogExperienciasComponent } from './components/blog/Experiencias/experiencias.component';
import { BlogAromasComponent } from './components/blog/aromas/aromas.component';
import { BlogComingSoonComponent } from './components/blog/coming soon/coming-soon.component';
import { BlogEspejosComponent } from './components/blog/espejos/espejos.component';
import { BlogCueroComponent } from './components/blog/cuero/cuero.component';
import { BlogPlantasComponent } from './components/blog/plantas/plantas.component';
import { BlogQuesosComponent } from './components/blog/quesos/quesos.component';
import { BlogCubiertosComponent } from './components/blog/cubiertos/cubiertos.component';
import { BlogComedoresComponent } from './components/blog/comedores/comedores.component';
//Lista de regalos
import { ListaRegalosComponent } from './components/lista-de-regalos/lista-regalos.component';
import { MenuListaComponent } from './components/lista-de-regalos/menu-lista/menu-lista.component';
import { CrearListaComponent } from './components/lista-de-regalos/crear-lista/crear-lista.component';
import { MiListaComponent } from './components/lista-de-regalos/mi-lista/mi-lista.component';
import { AgregarProductosComponent } from './components/lista-de-regalos/mi-lista/agregar-productos/agregar-productos.component';
import { ResultadoBusquedaListasComponent } from './components/lista-de-regalos/listas-encontradas/listas-encontradas.component';
import { ListaInvitadoComponent } from './components/lista-de-regalos/lista/lista-invitado.component';
import { ResumenRegalosComponent } from './components/lista-de-regalos/lista/resumen-regalos/resumen-regalos.component';
import { CarritoRegalosComponent } from './components/lista-de-regalos/lista/carrito-regalos/carrito-regalos.component';
import { CarritoRegalosSimpleComponent } from './components/lista-de-regalos/lista/carrito-regalos/carrito-regalos-simple.component';
import { InfoPagoRegalosComponent } from './components/lista-de-regalos/lista/info-pago-regalos/info-pago-regalos.component';
import { ResultadoTransaccionListaComponent } from './components/lista-de-regalos/lista/resultados-transaccion-lista/resultados-transaccion-lista.component';
import { RegalosRecibidosComponent } from './components/lista-de-regalos/mi-lista/regalos-recibidos/regalos-recibidos.component';
import { ListaInvitadosComponent } from './components/lista-de-regalos/mi-lista/lista-invitados/lista-invitados.component';
import { TipsComponent } from './components/lista-de-regalos/tips/tips.component';
import { BeneficiosComponent } from './components/lista-de-regalos/beneficios/beneficios.component';
import { AsistenciaComponent } from './components/lista-de-regalos/lista/confirmar/asistencia.component';
import { ContactoRegalosComponent } from './components/lista-de-regalos/contacto-regalos/contacto-regalos.component';
import { AdminComponent } from './components/admin/admin.component';
import { BestSellerComponent } from './components/best-seller/best-seller.component';
import { CabifyComponent } from './components/cabify/cabify.component';
import { CitibankComponent } from './components/citibank/citibank.component';
import { CondicionesComplementosAlfComponent } from './components/condiciones-complementos/condiciones-complementos.component';
import { ErrorComponent } from './components/error/error.component';
import { HotSaleComponent } from './components/hot-sale/hot-sale.component';
import { InfoBogotaComponent } from './components/info-bogota/info-bogota.component';
import { IngresarComponent } from './components/ingresar/ingresar.component';
import { WishListComponent } from './components/wish-list/wish-list.component';
import { MigaDePanComponent } from './components/miga-de-pan/miga-de-pan.component';
import { PreguntasFrecuentesComponent } from './components/preguntas-frecuentes/preguntas-frecuentes.component';
import { NovedadesComponent } from './components/novedades/novedades.component';
import { PoliticaDatosComponent } from './components/politica-datos/politica-datos.component';
import { PoliticaPrivacidadComponent } from './components/politica-privacidad/politica-privacidad.component';
import { RedirectComponent } from './components/redirect/redirect.component';
import { SinInteresComponent } from './components/sin-interes/sin-interes.component';
import { RecomendadosComponent } from './components/sin-interes/recomendados/recomendados.component';
import { ModalComponent } from './components/modal/modal.component';
import { ConfirmDecoComponent } from './components/confirmacion-decorador/confirmacion-decorador.component';
import { JsonLdComponent } from './components/jsonld/jsonld.component';
import { TerminosComponent } from './components/terminos/terminos.component';



@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
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
    NewProductsComponent,
    RecommendedComponent,
    TendenciasComponent,
    ChatComponent,
    GoUpComponent,
    CategoryComponent,
    FiltrosComponent,
    ProductosComponent,
    TiendasComponent,
    ProductoComponent,
    ProductoRelacionadosComponent,
    LoginComponent,
    ResumenMiCuentaComponent,
    CuentaComponent,
    DireccionesComponent,
    PedidosComponent,
    NoviosComponent,
    ClientesComponent,
    LandingDecoradoresComponent,
    LandingPlannerComponent,
    ConfirmarUsuarioComponent,
    ResumenCarritoComponent,
    InfoPagoComponent,
    InfoEnviosComponent,
    ResultadoTransacciComponent,
    EnviosComponent,
    GarantiasComponent,
    QuienesComponent,
    TrabajaComponent,
    ContactanosComponent,
    ListaRegalosComponent,
    MenuListaComponent,
    CrearListaComponent,
    MiListaComponent,
    AgregarProductosComponent,
    ResultadoBusquedaListasComponent,
    ListaInvitadoComponent,
    ResumenRegalosComponent,
    CarritoRegalosComponent,
    CarritoRegalosSimpleComponent,
    InfoPagoRegalosComponent,
    ResultadoTransaccionListaComponent,
    RegalosRecibidosComponent,
    ListaInvitadosComponent,
    TipsComponent,
    BeneficiosComponent,
    AsistenciaComponent,
    ContactoRegalosComponent,
    BestSellerComponent,
    CabifyComponent,
    CitibankComponent,
    CondicionesComplementosAlfComponent,
    ErrorComponent,
    HotSaleComponent,
    InfoBogotaComponent,
    IngresarComponent,
    WishListComponent,
    MigaDePanComponent,
    PreguntasFrecuentesComponent,
    NovedadesComponent,
    PoliticaDatosComponent,
    PoliticaPrivacidadComponent,
    RedirectComponent,
    SinInteresComponent,
    RecomendadosComponent,
    ModalComponent,
    ConfirmDecoComponent,
    JsonLdComponent,
    PromocionAlfComponent,
    TerminosComponent,

    // Banner
    HomePrincipalComponent,
    Slide1Component,
    Slide2Component,
    Slide3Component,
    // Secciones
    SeccionFijaComponent,
    Seccion1Component,
    Seccion2Component,
    Seccion3Component,

    // Blog
    BlogOcasionalesComponent,
    BlogFlorerosComponent,
    BlogAparadoresComponent,
    BlogExperienciasComponent,
    BlogAromasComponent,
    BlogComingSoonComponent,
    BlogEspejosComponent,
    BlogCueroComponent,
    BlogPlantasComponent,
    BlogCubiertosComponent,
    BlogQuesosComponent,
    BlogComedoresComponent
  ],
  imports: [
    HttpModule,
    BrowserModule.withServerTransition({ appId: 'my-app' }),
    RouterModule.forRoot([

      { path: '', component: HomeComponent, pathMatch: 'full'},
      { path: 'blog', component: BlogComponent, pathMatch: 'full'},
        { path: 'tiendas', component: TiendasComponent, pathMatch: 'full'},
        { path: 'producto/:item', component: ProductoComponent},
        { path: 'categoria', component: CategoryComponent, pathMatch: 'full' },
        //Modulos mi cuenta
        { path: 'login', component: LoginComponent },
        { path: 'mi-cuenta', component: ResumenMiCuentaComponent },
        { path: 'decoradores', component: LandingDecoradoresComponent },
        { path: 'planners', component: LandingPlannerComponent },
        { path: 'resumen-carrito', component: ResumenCarritoComponent },
        { path: 'info-pago', component: InfoPagoComponent },
        { path: 'confirm-user/:nuser', component: ConfirmarUsuarioComponent },
        { path: 'resultado-transaccion/:idCarrito', component: ResultadoTransacciComponent },
        { path: 'envios', component:EnviosComponent },
        { path: 'garantias', component:GarantiasComponent },
        { path: 'quienes', component:QuienesComponent },
        { path: 'trabaja-con-nosotros', component:TrabajaComponent },
        { path: 'lista-de-regalos', component:ListaRegalosComponent },
        { path: 'contactanos', component:ContactanosComponent },
        { path: 'lista-de-regalos/crear-lista', component: CrearListaComponent },
        { path: 'mi-lista', component: MiListaComponent },
        { path: 'mi-lista/agregar-productos', component: AgregarProductosComponent },
        { path: 'lista-de-regalos/resultado-busqueda', component: ResultadoBusquedaListasComponent },
        { path: 'lista/:codigoLista', component: ListaInvitadoComponent },//imprimir el codigo de la lista en la url
        { path: 'resumen-regalos', component: ResumenRegalosComponent },
        { path: 'info-pago-regalos', component: InfoPagoRegalosComponent },
        { path: 'resultado-transaccion-regalos/:idCarrito', component: ResultadoTransaccionListaComponent },
        { path: 'mi-lista/regalos-recibidos', component: RegalosRecibidosComponent },
        { path: 'mi-lista/lista-invitados', component: ListaInvitadosComponent },
        { path: 'lista', component: ListaInvitadoComponent },
        { path: 'lista-de-regalos/tips', component: TipsComponent },
        { path: 'lista-de-regalos/beneficios', component: BeneficiosComponent },
        { path: 'lista-de-regalos/contactenos', component: ContactoRegalosComponent },
        { path: 'lista-asistencia/:codigoLista/:codigoInvitado', component: AsistenciaComponent },
        { path: 'lista-de-deseos', component: WishListComponent },
        { path: 'preguntas-frecuentes', component: PreguntasFrecuentesComponent },
        { path: 'novedades', component: NovedadesComponent },
        { path: 'politica-manejo-de-datos', component: PoliticaDatosComponent },
        { path: 'redirect/:previous', component: RedirectComponent },
        { path: 'sin-intereses', component: SinInteresComponent },
        { path: '**', component: ErrorComponent }, //pagina 404
        { path: 'lazy', loadChildren: './components/lazy/lazy.module#LazyModule'},
        { path: 'lazy/nested', loadChildren: './components/lazy/lazy.module#LazyModule'},
        { path: 'admin/:token', component: AdminComponent },




    ]),
    FormsModule,
    MetaModule.forRoot(),
    BrowserAnimationsModule,
    // ReactiveFormsModule,
    TransferHttpCacheModule,
    BrowserTransferStateModule,
    // Register module
    // NgxJsonLdModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
