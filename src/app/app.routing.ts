import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MetaGuard } from '@ngx-meta/core';
import { HomeComponent } from './components/home/home.component';
import { CategoryComponent } from './components/category/category.component';
import { QuienesComponent } from './components/quienes-somos/quienes-somos.component';
import { TiendasComponent } from './components/tiendas/tiendas.component';
import { ErrorComponent } from './components/error/error.component';
import { TrabajaComponent } from './components/trabaja/trabaja.component';
import { GarantiasComponent } from './components/garantias/garantias.component';
import { EnviosComponent } from './components/envios/envios.component';
import { InfoEnviosComponent } from './components/info-envios/info-envios.component';
import { ResumenCarritoComponent } from './components/resumen-carrito/resumen-carrito.component';
import { ProductoComponent } from './components/producto/producto.component';
import { RedirectComponent } from './components/redirect/redirect.component';
import { IngresarComponent } from './components/ingresar/ingresar.component';
import { InfoPagoComponent } from './components/info-pago/info-pago.component';
import { ResultadoTransacciComponent } from './components/resultado-transaccion/resultado-transaccion.component';
import { ModalComponent } from './components/modal/modal.component';
import { AdminComponent } from './components/admin/admin.component';
import { WishListComponent } from './components/wish-list/wish-list.component';
import { ContactanosComponent } from './components/contactanos/contactanos.component';
import { TerminosComponent } from './components/terminos/terminos.component';
import { PoliticaDatosComponent } from './components/politica-datos/politica-datos.component';
import { PoliticaPrivacidadComponent } from './components/politica-privacidad/politica-privacidad.component';
import { PreguntasFrecuentesComponent } from './components/preguntas-frecuentes/preguntas-frecuentes.component';
import { SinInteresComponent } from './components/sin-interes/sin-interes.component';
import { CitibankComponent } from './components/citibank/citibank.component';
import { HotSaleComponent } from './components/hot-sale/hot-sale.component';
import { NovedadesComponent } from './components/novedades/novedades.component';
import { NewArrivalsComponent } from './components/new-arrivals/new-arrivals.component';
import { CabifyComponent } from './components/cabify/cabify.component';
import { LandingDecoradoresComponent } from './components/mi-cuenta/landing-decoradores/landing-decoradores.component';
import { LandingPlannerComponent } from './components/mi-cuenta/landing-planner/landing-planner.component';
import { CondicionesComplementosAlfComponent } from './components/condiciones-complementos/condiciones-complementos.component';
import { BlogComponent } from './components/blog/blog.component';
import { ConfirmDecoComponent } from './components/confirmacion-decorador/confirmacion-decorador.component';

// Lista de Regalos
import { ListaRegalosComponent } from './components/lista-de-regalos/lista-regalos.component';
import { CrearListaComponent } from './components/lista-de-regalos/crear-lista/crear-lista.component';
import { MiListaComponent } from './components/lista-de-regalos/mi-lista/mi-lista.component';
import { AgregarProductosComponent } from './components/lista-de-regalos/mi-lista/agregar-productos/agregar-productos.component';
import { ResultadoBusquedaListasComponent } from './components/lista-de-regalos/listas-encontradas/listas-encontradas.component';
import { ListaInvitadoComponent } from './components/lista-de-regalos/lista/lista-invitado.component';
import { ResumenRegalosComponent } from './components/lista-de-regalos/lista/resumen-regalos/resumen-regalos.component';
import { InfoPagoRegalosComponent } from './components/lista-de-regalos/lista/info-pago-regalos/info-pago-regalos.component';
import { ResultadoTransaccionListaComponent } from './components/lista-de-regalos/lista/resultados-transaccion-lista/resultados-transaccion-lista.component';
import { RegalosRecibidosComponent } from './components/lista-de-regalos/mi-lista/regalos-recibidos/regalos-recibidos.component';
import { ListaInvitadosComponent } from './components/lista-de-regalos/mi-lista/lista-invitados/lista-invitados.component';
import { TipsComponent } from './components/lista-de-regalos/tips/tips.component';
import { BeneficiosComponent } from './components/lista-de-regalos/beneficios/beneficios.component';
import { AsistenciaComponent } from './components/lista-de-regalos/lista/confirmar/asistencia.component'
import { ContactoRegalosComponent } from './components/lista-de-regalos/contacto-regalos/contacto-regalos.component';

import { InfoBogotaComponent } from './components/info-bogota/info-bogota.component';
import { PromocionAlfComponent } from './components/promocion-alf/promocion-alf.component';
import { LoginComponent } from './components/mi-cuenta/login/login.component';
import { ResumenMiCuentaComponent } from './components/mi-cuenta/resumen/resumen.component';
import { ConfirmarUsuarioComponent } from './components/mi-cuenta/login/confirmar-usuario/confirmar-usuario.component';
import { RemarketingComponent } from './components/remarketing/remarketing.component';
import { PromocionVintageComponent } from './components/promo-vintage/promocion-vintage.component';

const appRoutes: Routes = [
  //{path: '', component: HomeComponent},
  {
    path: '',
    canActivateChild: [MetaGuard],
    children: [
      {
        path: '',
        component: HomeComponent,
        data: {
          meta: {
            title: 'Matisses',
            description: 'Compra online todos nuestros artículos y disfruta de lo mejor en mobiliario y accesorios para tu hogar.'
          }
        }
      },
      {
        path: 'producto/:item',
        component: ProductoComponent,
        data: {
          meta: {
            title: 'Matisses',
            description: 'Compra online todos nuestros artículos y disfruta de lo mejor en mobiliario y accesorios para tu hogar.'
          }
        }
      },
      {
        path: 'categoria',
        component: CategoryComponent,
        data: {
          meta: {
            title: 'Matisses',
            description: 'Compra online todos nuestros artículos y disfruta de lo mejor en mobiliario y accesorios para tu hogar. -- 2',
            keywords: 'categoria, sofas, mesas, casas'
          }
        }
      },
      //Lista de regalos
      {
        path: 'lista-de-regalos',
        component: ListaRegalosComponent,
        pathMatch: 'full',
        data: {
          meta: {
            title: 'Matisses - Lista de Regalos',
            description: 'Lista de regalos Matisses te permite elegir entre todos los productos que tenemos en nuestro amplio catálogo, compartirla con tus invitados y ellos podrán elegir de tu lista lo que quieren regalarte.'
          }
        }
      },
      {
        path: 'sale',
        component: HotSaleComponent,
        pathMatch: 'full',
        data: {
          meta: {
            title: 'Matisses - Sale',            
          }
        }
      },
      {
        path: 'remarketing',
        component: RemarketingComponent,
        pathMatch: 'full',
        data: {
          meta: {
            title: 'Matisses - remarketing',            
          }
        }
      },
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
      { path: 'lista-asistencia/:codigoLista/:codigoInvitado', component: AsistenciaComponent }


    ]
  },
  //Modulos mi cuenta
  { path: 'login', component: LoginComponent },
  { path: 'mi-cuenta', component: ResumenMiCuentaComponent },
  { path: 'decoradores', component: LandingDecoradoresComponent },
  { path: 'planners', component: LandingPlannerComponent },
  { path: 'confirm-user/:nuser', component: ConfirmarUsuarioComponent },

  // { path: '92-consola', redirectTo: 'categoria?group=002' },
  { path: 'blog', component: BlogComponent },

  // { path: 'categoria', component: CategoryComponent, pathMatch: 'full' },
  { path: 'quienes', component: QuienesComponent },
  { path: 'tiendas', component: TiendasComponent },
  { path: 'condiciones-complementos', component: CondicionesComplementosAlfComponent },
  { path: 'sin-intereses', component: SinInteresComponent },
  { path: 'compra-sin-intereses', component: CitibankComponent },
  { path: 'trabaja-con-nosotros', component: TrabajaComponent },
  { path: 'info', component: InfoBogotaComponent },
  { path: 'novedades', component: NovedadesComponent },
  { path: 'new-arrivals', component: NewArrivalsComponent },
  { path: 'evento-alf', component: PromocionAlfComponent },
  { path: 'promo-vintage', component: PromocionVintageComponent },
  { path: 'transporte-matisses', component: CabifyComponent },
  { path: 'garantias', component: GarantiasComponent },
  { path: 'envios', component: EnviosComponent },
  { path: 'info-envios', component: InfoEnviosComponent },
  { path: 'resumen-carrito', component: ResumenCarritoComponent },
  //{ path: 'producto/:item', component: ProductoComponent },
  { path: 'redirect/:previous', component: RedirectComponent },
  { path: 'confirmacion-decorador', component: ConfirmDecoComponent },
  { path: 'ingresar', component: IngresarComponent },
  { path: 'info-pago', component: InfoPagoComponent },
  { path: 'resultado-transaccion/:idCarrito', component: ResultadoTransacciComponent },
  { path: 'pruebas', component: ModalComponent },
  { path: 'admin/:token', component: AdminComponent },
  { path: 'lista-de-deseos', component: WishListComponent },
  { path: 'contactanos', component: ContactanosComponent },
  { path: 'terminos-y-condiciones', component: TerminosComponent },
  { path: 'politica-manejo-de-datos', component: PoliticaDatosComponent },
  { path: 'politica-de-privacidad', component: PoliticaPrivacidadComponent },
  { path: 'preguntas-frecuentes', component: PreguntasFrecuentesComponent },
  { path: '**', component: ErrorComponent } //pagina 404
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
