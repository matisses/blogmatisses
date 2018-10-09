import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../../services/global';

import { Customer } from '../../models/customer';
import { Item } from '../../models/item';
import { City } from '../../models/city';
import { ShippingMethod } from '../../models/shipping-method';
import { DatosPagoPlaceToPay } from '../../models/datos-pago-placetopay';

import { CustomerService } from '../../services/customer.service';
import { CityService } from '../../services/city.service';
import { ShippingMethodService } from '../../services/shipping-method.service';
import { PlacetoPayService } from '../../services/placetopay.service';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { ItemService } from '../../services/item.service';
import { CoordinadoraService } from '../../services/coordinadora.service';
import { ShoppingCartValidatorService } from '../../services/shopping-cart-validator.service';
import { DescuentosService } from '../../services/descuentos.service';
import { DigitoVerificacionService } from '../../services/digitoVerificacion.service';

import { CarritoSimpleComponent } from '../header/menu/carrito/carrito-simple.component';
import { CarritoComponent } from '../header/menu/carrito/carrito.component';
import { SessionUsuarioService } from '../../services/session-usuario.service';
//import { CompileAnimationStateDeclarationMetadata } from '@angular/compiler';

declare var $: any;

@Component({
  templateUrl: 'info-pago.html',
  styleUrls: ['info-pago.component.css'],
  providers: [CustomerService, CityService, ShippingMethodService, PlacetoPayService, ShoppingCartService, ItemService, CoordinadoraService,
    ShoppingCartValidatorService, DescuentosService, DigitoVerificacionService,SessionUsuarioService]
})

export class InfoPagoComponent implements OnInit {
  @ViewChild(CarritoSimpleComponent)
  public carrito: CarritoSimpleComponent;

  @ViewChild(CarritoComponent)
  public carrito1: CarritoComponent;

  public costoEnvio: number = 0;
  public costoEnvioFormat: string;
  public totalEnvio: number = 0;
  public messageError: string;
  public messageCambio: string;
  public tiendaSeleccionada: string = 'Medellín';
  public urlReturn: string;
  public procesandoP2P: boolean = false;
  public valid: boolean = true;
  public validMontoSaldoFavor: boolean = true;
  public disabled: boolean = false;
  public customer: Customer;
  public metodoEnvioSeleccionado: ShippingMethod = null;
  public datosPago: DatosPagoPlaceToPay = null;
  public ciudadesPrincipales: Array<City>;
  public otrasCiudades: Array<City>;
  public metodosEnvio: Array<ShippingMethod>;
  private viewportWidth: number = 0;
  public resumenMobileVisible: boolean = false;
  public resumenDesktopVisible: boolean = false;
  public maxlength: number;
  public totalEnvioFormat: string = "0";
  public totalEnvioFinal: number = 0;
  public totalEnvioFinalFormat: string = "0";
  public montoEnvioMinimo: string = "0";
  public mostrarInfoEnvio: boolean = false;
  public saldoFavorFormat: number = 0;
  public saldoFavor: number = 0;
  public selectMonto: string = 'SI';
  public disabledMonto: boolean = true;
  public montoSaldoFavor: number;
  public montoTotalFactura: number;
    public customerEdit: any;

  constructor(private _route: ActivatedRoute, private _router: Router, private _customerService: CustomerService, private _cityService: CityService,
    private _shippingMethodService: ShippingMethodService, private _placetopayService: PlacetoPayService, private _shoppingCartService: ShoppingCartService,
    private _itemService: ItemService, private _coordinadoraService: CoordinadoraService, private _shoppingCartValidatorService: ShoppingCartValidatorService,
    private _descuentosService: DescuentosService, private _digitoVerificacionService: DigitoVerificacionService,private _userService: SessionUsuarioService) {
    this.messageError = '';
    this.urlReturn = GLOBAL.urlTransactionResult;
    this.limpiar();
    this.ciudadesPrincipales = new Array<City>();
    this.otrasCiudades = new Array<City>();
    this.metodosEnvio = new Array<ShippingMethod>();
    this.inicializarCliente();
  }

  ngOnInit() {
    this.carrito.cargarCarrito();
    this.obtenerMetodosEnvio();
    this.obtenerCiudades();
    this.totalEnvioFinal = (this.carrito.totalCarrito + this.totalEnvio) - this.carrito.totalDescuentos;
    this.montoTotalFactura=this.carrito.totalCarrito-this.carrito.totalDescuentos;
    this.totalEnvioFinalFormat = this.formatNumber(this.totalEnvioFinal);
  }

  ngAfterViewInit() {
    $(document).ready(function () {
      $("html, body").animate({ scrollTop: 0 }, 1000);
    });
  }

  public validarUsoSaldo() {
    if (this.selectMonto == 'NO') {
      this.disabledMonto = false;
    } else {
      this.disabledMonto = true;
    }
  }

  public aplicarSaldoFavor() {
    if (!this.disabledMonto) {
      this.validMontoSaldoFavor = false;
      if (this.montoSaldoFavor < 0) {
        //TODO: poner logica con multiple pago falta
      }
    } else {
      $('#saldoFavorModal').modal('hide');
      this.valid = true;
      this.messageError = '';
      if (this.metodoEnvioSeleccionado == null || this.metodoEnvioSeleccionado.code == 0) {
        this.messageError = 'Debes seleccionar un medio de envió.';
        return;
      }
      if (this.metodoEnvioSeleccionado.code == 2 && (this.tiendaSeleccionada == null || this.tiendaSeleccionada.length <= 0)) {
        this.messageError = 'Debes seleccionar la tienda en la que deseas recoger los artículos.';
        return;
      } else if (this.metodoEnvioSeleccionado.code != 2) {
        this.tiendaSeleccionada = null;
      }
      if (this.customer.fiscalID == null || this.customer.fiscalID.length <= 0
        || this.customer.firstName == null || this.customer.firstName.length <= 0
        || this.customer.lastName1 == null || this.customer.lastName1.length <= 0
        || this.customer.fiscalIdType == null || this.customer.fiscalIdType.length <= 0
        || this.customer.addresses[0].address == null || this.customer.addresses[0].address.length <= 0
        || this.customer.addresses[0].cellphone == null || this.customer.addresses[0].cellphone.length <= 0
        || this.customer.addresses[0].cityCode == null || this.customer.addresses[0].cityCode == 0
        || this.customer.addresses[0].email == null || this.customer.addresses[0].email.length <= 0) {
        this.messageError = 'Debes llenar todos los campos obligatorios para poder proceder con el pago.';
        this.valid = false;
        return;
      }
      //this.procesandoP2P = true;

      this._itemService.validarItems(this.carrito.shoppingCart.items).subscribe(
        response => {
          let itemsSinSaldo = false;
          let items: Array<Item> = response;

          for (let i = 0; i < items.length; i++) {
            for (let j = 0; j < this.carrito.shoppingCart.items.length; j++) {
              if (items[i].itemcode === this.carrito.shoppingCart.items[j].itemcode && items[i].sinSaldo) {
                this.carrito.shoppingCart.items[j].sinSaldo = true;
                itemsSinSaldo = true;
                break;
              }
            }
          }

          if (itemsSinSaldo) {
            //Devolver a la vista de carrito para notificarle al usuario que los items no tienen saldo
            localStorage.setItem('matisses.shoppingCart', JSON.stringify(this.carrito.shoppingCart));
            this._router.navigate(['/resumen-carrito']);
          } else {
            //Se mapean los datos para guardar el carrito en mongo DB
            let shoppingCart = {
              metodoEnvio: this.metodoEnvioSeleccionado.code,
              tiendaRecoge: this.tiendaSeleccionada,
              fechacreacion: null,
              precioNuevo: false,
              items: this.carrito.shoppingCart.items
            }

            for (let i = 0; i < shoppingCart.items.length; i++) {
              if (shoppingCart.items[i].itemcode == '24400000000000000121') {
                if (this.carrito.validarItem(shoppingCart.items[i].itemcode)) {
                  shoppingCart.precioNuevo = true;
                }
              }
              if (!shoppingCart.items[i].descuento || shoppingCart.items[i].descuento > 0) {
                shoppingCart.items[i].nuevoPrecio = shoppingCart.items[i].priceafterdiscount;
              } else {
                shoppingCart.items[i].nuevoPrecio = shoppingCart.items[i].priceaftervat;
              }
            }
            this._shoppingCartService.saveShoppingCart(shoppingCart).subscribe(
              response => {
                //Se guarda en el localStorage el carrito
                this.carrito.shoppingCart._id = response.shoppingCart._id;
                localStorage.setItem('matisses.shoppingCart', JSON.stringify(this.carrito.shoppingCart));
                this.validarCliente(this.carrito.shoppingCart._id, this.saldoFavor);
                this.saldoFavorFormat = 0;
                this.saldoFavor = 0;
              },
              error => { console.error(error); }
            );
          }
        },
        error => {
          console.error(error);
          //this.procesandoP2P = false;
        }
      );
    }
  }

  public obtenerCiudades() {
    this.ciudadesPrincipales = new Array<City>();
    this.otrasCiudades = new Array<City>();
    this._cityService.findPrincipalCities().subscribe(
      response => {
        this.ciudadesPrincipales = response.cities;
      },
      error => { console.error(error); }
    );
    this._cityService.findOtherCities().subscribe(
      response => {
        this.otrasCiudades = response.cities;
      },
      error => { console.error(error); }
    );
  }

  public obtenerMetodosEnvio() {
    this.metodosEnvio = new Array<ShippingMethod>();
    let baseComplementos = 150000;//TODO: monto base envios gratis para complementos y no mobiliario.
    let baseMobiliario = 7000000;//TODO: monto base envios gratis para mobiliario. categoriaMobiliario = ["002", "003", "005", "006", "009"]
    let baseMobiliarioCiudad = 2000000; //TODO: monto base envios gratis para mobiliario en el area metropolitana y valle del aburra.

    this._shippingMethodService.listShippingMethods().subscribe(
      response => {
        this.metodosEnvio = new Array<ShippingMethod>();
        //for (let i = 0; i < response.length; i++) {
        // if(response[i].code === 3){
        //   //TODO: se debe quitar esta condición si el medio es Coordinadora
        // } else
        /*if (this.validarEnvioGratisCiudades()) {
          this.metodosEnvio.push(response[i]);
        } else if (((this.carrito.totalCarrito) - this.carrito.totalDescuentos) >= baseComplementos && response[i].code === 1) {
          this.metodosEnvio.push(response[i]);
        } else if (((this.carrito.totalCarrito) - this.carrito.totalDescuentos) < baseComplementos && response[i].code !== 1) {
          this.metodosEnvio.push(response[i]);
        } else if (((this.carrito.totalCarrito) - this.carrito.totalDescuentos) < baseMobiliario && response[i].code === 4) {
          this.metodosEnvio.push(response[i])
        } else if (((this.carrito.totalCarrito) - this.carrito.totalDescuentos) >= baseMobiliario && response[i].code === 1) {
          this.metodosEnvio.push(response[i])
        }*/
        //}

        //Es item de mobiliario
        if (this.validarEnvioGratisMobiliario()) {
          if (this.validarEnvioGratisCiudades()) {
            if (((this.carrito.totalCarrito) - this.carrito.totalDescuentos) < baseMobiliarioCiudad) {
              this.metodosEnvio.push(response[3]);//Acordar
              this.montoEnvioMinimo = '2,000,000';
              this.mostrarInfoEnvio = true;
            } else if (((this.carrito.totalCarrito) - this.carrito.totalDescuentos) >= baseMobiliarioCiudad) {
              this.metodosEnvio.push(response[0]);//Gratis
              this.metodosEnvio.push(response[1]);//Recoger en tienda
              this.mostrarInfoEnvio = false;
            }
          } else if (((this.carrito.totalCarrito) - this.carrito.totalDescuentos) < baseMobiliario) {
            this.metodosEnvio.push(response[3]);//Acordar
            this.montoEnvioMinimo = '7,000,000';
            this.mostrarInfoEnvio = true;
          } else if (((this.carrito.totalCarrito) - this.carrito.totalDescuentos) >= baseMobiliario) {
            this.metodosEnvio.push(response[0]);//Gratis
            this.metodosEnvio.push(response[1]);//Recoger en tienda
            this.mostrarInfoEnvio = false;
          }
        } else { /*Es item no es mobiliario*/
          if (((this.carrito.totalCarrito) - this.carrito.totalDescuentos) < baseComplementos) {
            this.metodosEnvio.push(response[1]);//Recoger en tienda
            this.metodosEnvio.push(response[2]);//coordinadora
            this.mostrarInfoEnvio = true;
            this.montoEnvioMinimo = '150,000';
          } else if (((this.carrito.totalCarrito) - this.carrito.totalDescuentos) >= baseComplementos) {
            this.metodosEnvio.push(response[0]);//Gratis
            this.metodosEnvio.push(response[1]);//Recoger en tienda
            this.mostrarInfoEnvio = false;
          }
        }
      },
      error => { console.error(error); }
    );

    // this.metodosEnvio = new Array<ShippingMethod>();
    // this._shippingMethodService.listShippingMethods().subscribe(
    //   response => {
    //     for (let i = 0; i < response.length; i++) {
    //       if (response[i].code === 3) {
    //         //TODO: se debe quitar esta condición si el medio es Coordinadora
    //       } else {
    //         this.metodosEnvio.push(response[i]);
    //       }
    //     }
    //     // this.metodosEnvio = response;
    //   },
    //   error => {
    //     console.error(error);
    //   }
    // );
  }

  public buscarCliente() {
    this.metodoEnvioSeleccionado = null;
    this.disabled = false;
    this.customer.fiscalID = this.customer.fiscalID.trim();
    this.customer.cardCode = this.customer.fiscalID.trim();

    this.messageError = '';
    if (this.customer.fiscalID != null && this.customer.fiscalID.length > 0) {
      this._customerService.getCustomerData(this.customer.fiscalID).subscribe(
        response => {
          if (response.fiscalIdType === '31') {
            this.customer.fiscalID = response.fiscalID;
            this.customer.fiscalIdType = response.fiscalIdType;
            this.customer.firstName = response.contacts.firstName + ' ' + (response.contacts.middleName == null ? "" : response.contacts.middleName);
            this.customer.lastName1 = response.contacts.lastName1;
            this.customer.lastName2 = response.contacts.lastName2 == null ? "" : response.contacts.lastName2;
            this.customer.birthDate = response.birthDate;
            this.customer.addresses[0].email = response.addresses[0].email;
            this.customer.addresses[0].cellphone = response.addresses[0].cellphone;
            this.customer.addresses[0].address = response.addresses[0].address;
            this.customer.addresses[0].cityCode = response.addresses[0].cityCode;
            this.customer.cardName = response.cardName;
            this.disabled = true;
            this.valid = false;
            return;
          }

          this.customer = response;
          this.disabled = true;
          this.consultarCostoEnvio();
          this.consultarSaldoFavor(this.customer.cardCode);
        },
        error => {
          if (this.customer.fiscalIdType === '31') {
            this._digitoVerificacionService.consultarDigitoVerificacion(this.customer.fiscalID).subscribe(
              response => {
                if (response != null || response.length > 0) {
                  this.customer.fiscalID = this.customer.fiscalID + '-' + response;
                } else {
                  this.messageError = "Lo sentimos. Se produjo un error inesperado, inténtelo mas tarde.";
                }
              },
              error => { console.error(error); }
            );
          }

          let cedula = this.customer.fiscalID;
          this.customer.firstName = null;
          this.customer.lastName1 = null;
          this.customer.lastName2 = null;
          this.customer.cardName = null;
          this.customer.addresses[0].email = null;
          this.customer.addresses[0].cellphone = null;
          this.customer.addresses[0].cityCode = null;
          this.customer.addresses[0].address = null;
          this.customer.fiscalID = cedula;
          console.error(error);
        }
      );
    } else { this.limpiar(); }
  }

  public consultarCostoEnvio() {
    let datosCompra = {
      ciudadDestino: this.customer.addresses[0].cityCode,
      items: []
    };

    for (let j = 0; j < this.carrito.shoppingCart.items.length; j++) {
      datosCompra.items.push(this.carrito.shoppingCart.items[j]);
    }

    this._coordinadoraService.crearCotizacionEnvio(datosCompra).subscribe(
      response => {
        for (let i = 0; i < this.metodosEnvio.length; i++) {
          if (this.metodosEnvio[i].code === 3) {
            this.costoEnvio = response.valor;
            this.costoEnvioFormat = this.formatNumber(this.costoEnvio);
            break;
          }
        }
        this.obtenerMetodosEnvio();
      },
      error => { console.error(error); }
    );
  }

  public consultarSaldoFavor(id: string) {
    this._customerService.getSaldoFavor(id).subscribe(
      response => {
        this.saldoFavorFormat = response.content;
        this.saldoFavor = response.resultado;
      },
      error => { console.error(error) }
    );
  }

  private validarEnvioGratisMobiliario() {
    let categoriaMobiliario = ["002", "003", "005", "006", "009", "013", "014"];
    let cont = 0;
    for (let j = 0; j < this.carrito.shoppingCart.items.length; j++) {
      for (let i = 0; i < categoriaMobiliario.length; i++) {
        if (categoriaMobiliario[i] == this.carrito.shoppingCart.items[j].group.code) {
          cont += 1;
        }
      }
    }
    if (cont >= 1) {
      return true;
    } else {
      return false;
    }
  }

  private validarEnvioGratisCiudades() {
    //TODO: parametrizacion de ciudades para envios gratis.
    let ciudadesEnvioGratis = [
      //Antioquia: valle de Aburra
      "MEDELLÍN05001",
      "BELLO05088",
      "ITAGUI05360",
      "ENVIGADO05266",
      "CALDAS (Antioquia)05129",
      "COPACABANA05212",
      "LA ESTRELLA05380",
      "GIRARDOTA05308",
      "SABANETA05631",
      "BARBOSA (Antioquia)05079",

      //Bogotá DC: area metropolitana
      /*"BOGOTÁ11001",
      "SOACHA25754",
      "CHÍA25175",
      "ZIPAQUIRÁ25899",
      "MADRID25430",
      "FUNZA25286",
      "CAJICÁ25126",
      "SIBATÉ25740",
      "TOCANCIPÁ25817",
      "TABIO25785",
      "LA CALERA25377",
      "SOPÓ25758",
      "COTA25214",
      "TENJO25799",
      "MOSQUERA (Cundinamarca)25473",
      "GACHANCIPÁ25295",
      "BOJACÁ25099",
      "EL ROSAL25260"*/
    ];

    for (let k = 0; k < ciudadesEnvioGratis.length; k++) {
      if (ciudadesEnvioGratis[k] == (this.customer.addresses[0].cityName.toUpperCase() + this.customer.addresses[0].cityCode)) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  }

  public pagar() {
    this.valid = true;
    this.messageError = '';
    if (this.metodoEnvioSeleccionado == null || this.metodoEnvioSeleccionado.code == 0) {
      this.messageError = 'Debes seleccionar un medio de envió.';
      return;
    }
    if (this.metodoEnvioSeleccionado.code == 2 && (this.tiendaSeleccionada == null || this.tiendaSeleccionada.length <= 0)) {
      this.messageError = 'Debes seleccionar la tienda en la que deseas recoger los artículos.';
      return;
    } else if (this.metodoEnvioSeleccionado.code != 2) {
      this.tiendaSeleccionada = null;
    }
    if (this.customer.fiscalID == null || this.customer.fiscalID.length <= 0
      || this.customer.firstName == null || this.customer.firstName.length <= 0
      || this.customer.lastName1 == null || this.customer.lastName1.length <= 0
      || this.customer.fiscalIdType == null || this.customer.fiscalIdType.length <= 0
      || this.customer.addresses[0].address == null || this.customer.addresses[0].address.length <= 0
      || this.customer.addresses[0].cellphone == null || this.customer.addresses[0].cellphone.length <= 0
      || this.customer.addresses[0].cityCode == null || this.customer.addresses[0].cityCode == 0
      || this.customer.addresses[0].email == null || this.customer.addresses[0].email.length <= 0) {
      this.messageError = 'Debes llenar todos los campos obligatorios para poder proceder con el pago.';
      this.valid = false;
      return;
    }
    this.procesandoP2P = true;
//Edicion cliente
    this._customerService.findCustomerObject(this.customer.fiscalID).subscribe(
      response => {
        this.customerEdit = response;
        this.customerEdit.U_FechaNacimiento = this.customer.birthDate;
        this.customerEdit.Cellular=this.customer.addresses[0].cellphone;
        this.customerEdit.County=this.customer.addresses[0].email;
        this.customerEdit.EmailAddress=this.customer.addresses[0].email;
        this.customerEdit.BPAddresses.BPAddress[0].County = this.customer.addresses[0].email;
        this.customerEdit.BPAddresses.BPAddress[0].BuildingFloorRoom = this.customer.addresses[0].cellphone;
        this.customerEdit.BPAddresses.BPAddress[0].Street = this.customer.addresses[0].address;
        this.customerEdit.BPAddresses.BPAddress[0].City=this.customer.addresses[0].cityName;

          this._userService.editarCliente(this.customerEdit).subscribe(
            response => {

              if (response.estado == 0) {

                  return;
                // this.RegistermessageError = 'Tu usuario se editó exitosamente.';
                // $('#messageUser').modal('show');
                // return;
              }
            },
            error => { console.error(error);   return;}
          );

      },
      error => { console.error(error); }
    );

    this._itemService.validarItems(this.carrito.shoppingCart.items).subscribe(
      response => {
        let itemsSinSaldo = false;
        let items: Array<Item> = response;

        for (let i = 0; i < items.length; i++) {
          for (let j = 0; j < this.carrito.shoppingCart.items.length; j++) {
            if (items[i].itemcode === this.carrito.shoppingCart.items[j].itemcode && items[i].sinSaldo) {
              this.carrito.shoppingCart.items[j].sinSaldo = true;
              itemsSinSaldo = true;
              break;
            }
          }
        }

        if (itemsSinSaldo) {
          //Devolver a la vista de carrito para notificarle al usuario que los items no tienen saldo
          localStorage.setItem('matisses.shoppingCart', JSON.stringify(this.carrito.shoppingCart));
          this._router.navigate(['/resumen-carrito']);
        } else {
          //Se mapean los datos para guardar el carrito en mongo DB

          let shoppingCart = {
            metodoEnvio: this.metodoEnvioSeleccionado.code,
            tiendaRecoge: this.tiendaSeleccionada,
            fechacreacion: null,
            precioNuevo: false,
            items: this.carrito.shoppingCart.items
          }

          for (let i = 0; i < shoppingCart.items.length; i++) {
            if (shoppingCart.items[i].itemcode == '24400000000000000121') {
              if (this.carrito.validarItem(shoppingCart.items[i].itemcode)) {
                shoppingCart.precioNuevo = true;
              }
            }
            if (!shoppingCart.items[i].descuento || shoppingCart.items[i].descuento > 0) {
              shoppingCart.items[i].nuevoPrecio = shoppingCart.items[i].priceafterdiscount;
            } else {
              shoppingCart.items[i].nuevoPrecio = shoppingCart.items[i].priceaftervat;
            }
          }
          this._shoppingCartService.saveShoppingCart(shoppingCart).subscribe(
            response => {
              //Se guarda en el localStorage el carrito
              this.carrito.shoppingCart._id = response.shoppingCart._id;
              localStorage.setItem('matisses.shoppingCart', JSON.stringify(this.carrito.shoppingCart));
              this.validarCliente(this.carrito.shoppingCart._id, 0);
            },
            error => { console.error(error); }
          );
        }
      },
      error => {
        console.error(error);
        this.procesandoP2P = false;
      }
    );
  }

  private validarCliente(_idCarrito, monto) {
    this.obtenerNombreCiudad();

    this._customerService.getCustomerData(this.customer.cardCode).subscribe(
      response => {
        //Mandar directo a placetopay
        this.enviarPlaceToPay(_idCarrito, monto);
      },
      error => {
        //Se debe mandar a crear el cliente en SAP
        let apellidos = '';
        let nacionalidad = '';
        let tipoPersona = '';
        let NombreCliente = '';
        apellidos += this.customer.lastName1;

        if (this.customer.lastName2 != null && this.customer.lastName2.length > 0) {
          apellidos += ' ' + this.customer.lastName2;
        }
        if (this.customer.nationality === 'NATIONAL') {
          nacionalidad = 'NATIONAL';
        } else {
          nacionalidad = 'FOREIGN';
        }

        if (this.customer.fiscalIdType === '31') {
          tipoPersona = 'JURIDICA';
          NombreCliente = this.customer.cardName.toUpperCase();
        } else {
          tipoPersona = 'NATURAL';
          NombreCliente = this.customer.firstName.toUpperCase() + ' ' + apellidos.toUpperCase();
        }

        let businesspartner = {
          birthDate: '1900-01-01',
          cardCode: this.customer.cardCode.trim() + 'CL',
          cardName: NombreCliente,
          defaultBillingAddress: 'FACTURACIÓN',
          defaultShippingAddress: 'FACTURACIÓN',
          firstName: this.customer.firstName.toUpperCase(),
          lastName1: this.customer.lastName1.toUpperCase(),
          lastName2: this.customer.lastName2 == null ? "" : this.customer.lastName2.toUpperCase(),
          fiscalID: this.customer.fiscalID,
          selfRetainer: 'N',
          salesPersonCode: '98',
          cardType: 'CUSTOMER',
          fiscalIdType: this.customer.fiscalIdType,
          foreignType: 'CON_CLAVE',
          gender: 'NINGUNO',
          nationality: nacionalidad,
          personType: tipoPersona,
          taxRegime: 'REGIMEN_SIMPLIFICADO',
          addresses: [],
          contacts: {
            name: 'ContactoWeb',
            firstName: this.customer.firstName.toUpperCase(),
            middleName: '',
            lastName1: this.customer.lastName1.toUpperCase(),
            lastName2: this.customer.lastName1 == null ? "" : this.customer.lastName2.toUpperCase(),
            address: this.customer.addresses[0].address.toUpperCase(),
            tel1: '',
            cellolar: this.customer.addresses[0].cellphone,
            eMailL: this.customer.addresses[0].email.toUpperCase()
          }
        }

        let billAddress = {
          stateCode: this.customer.addresses[0].cityCode.toString().substring(0, 2),
          stateName: '',
          cityCode: this.customer.addresses[0].cityCode,
          cityName: this.customer.addresses[0].cityName,
          addressName: 'FACTURACIÓN',
          addressType: 'BILLING',
          address: this.customer.addresses[0].address,
          landLine: this.customer.addresses[0].cellphone,
          cellphone: this.customer.addresses[0].cellphone,
          email: this.customer.addresses[0].email,
          country: 'CO',
          taxCode: ''
        }

        let shipAddress = {
          stateCode: this.customer.addresses[0].cityCode.toString().substring(0, 2),
          stateName: '',
          cityCode: this.customer.addresses[0].cityCode,
          cityName: '',
          addressName: 'FACTURACIÓN',
          addressType: 'SHIPPING',
          address: this.customer.addresses[0].address,
          landLine: this.customer.addresses[0].cellphone,
          cellphone: this.customer.addresses[0].cellphone,
          email: this.customer.addresses[0].email,
          country: 'CO',
          taxCode: ''
        }

        businesspartner.addresses.push(billAddress);
        businesspartner.addresses.push(shipAddress);

        this._customerService.createCustomer(businesspartner).subscribe(
          response => {
            if (response.estado == 0) {
              this.enviarPlaceToPay(_idCarrito, monto);
            } else {
              this.messageError = "Lo sentimos. Se produjo un error inesperado, inténtelo mas tarde.";
            }
          },
          error => { console.error(error); }
        );
      }
    );
  }

  private enviarPlaceToPay(_id, monto) {
    //Se valida el estado de los items como primera medida
    let datosCompraWeb = {
      idCarrito: '00000000000000000',
      items: this.carrito.shoppingCart.items
    }

    this._shoppingCartValidatorService.validate(datosCompraWeb).subscribe(
      response => {
        if (response.mensaje === 'true') {
          //Se mapean los datos que se le enviaran a PlacetoPay
          let apellidos = '';
          apellidos += this.customer.lastName1;

          if (this.customer.lastName2 != null && this.customer.lastName2.length > 0) {
            apellidos += ' ' + this.customer.lastName2;
          }

          let buyer = {
            document: this.customer.cardCode,
            name: this.customer.firstName,
            surname: apellidos,
            documentType: this.customer.fiscalIdType,
            email: this.customer.addresses[0].email,
            mobile: this.customer.addresses[0].cellphone,
            address: {
              street: this.customer.addresses[0].address,
              city: this.customer.addresses[0].cityName,
              country: this.customer.addresses[0].country
            }
          };

          let payment = {
            allowPartial: 'false',
            description: 'Compra matisses.co',
            reference: _id,
            amount: {
              currency: 'COP',
              total: ((this.carrito.totalCarrito + (this.metodoEnvioSeleccionado.code === 3 ? this.costoEnvio : 0)) - this.carrito.totalDescuentos),
              montoSaldoFavor: monto,
              montoTotal: this.totalEnvioFinal,
              costoEnvio: (this.metodoEnvioSeleccionado.code === 3 ? this.costoEnvio : 0),
              taxes: {
                kind: 'valueAddedTax',
                amount: this.carrito.totalImpuestos
              }
            }
          }

          if (monto < ((this.carrito.totalCarrito + (this.metodoEnvioSeleccionado.code === 3 ? this.costoEnvio : 0)) - this.carrito.totalDescuentos)) {
            payment.amount.total -= monto;
          }

          this.datosPago = new DatosPagoPlaceToPay().newDatosPagoPlaceToPay(buyer, null, navigator.userAgent, payment, null, null, this.urlReturn + _id, '');

          this._placetopayService.redirect(this.datosPago).subscribe(
            response => {
              if (response.codigo === -1) {
                this.procesandoP2P = false;
                return;
              }
              localStorage.removeItem('matisses.shoppingCart');

              if (monto != 0 && monto >= ((this.carrito.totalCarrito + (this.metodoEnvioSeleccionado.code === 3 ? this.costoEnvio : 0)) - this.carrito.totalDescuentos)) {
                this._router.navigate(['/resultado-transaccion/' + _id]);
              } else {
                window.location.href = response.respuestaPlaceToPay.processUrl;
              }
            },
            error => { console.error(error); }
          );
        } else {
          this.messageCambio = 'No se pudo continuar con el proceso de compra, debido a que uno o varios ítems ya no aplican descuento.';
          $('#cambioPrecio').modal('show');
        }
      }, error => { console.error(error) }
    );

    //
    //
    //
    //
    // //Se mapean los datos que se le enviaran a PlacetoPay
    // let apellidos = '';
    // apellidos += this.customer.lastName1;
    // if (this.customer.lastName2 != null && this.customer.lastName2.length > 0) {
    //   apellidos += ' ' + this.customer.lastName2;
    // }
    //
    // let buyer = {
    //   document: this.customer.fiscalID,
    //   name: this.customer.firstName,
    //   surname: apellidos,
    //   documentType: this.customer.fiscalIdType,
    //   email: this.customer.addresses[0].email,
    //   mobile: this.customer.addresses[0].cellphone,
    //   address: {
    //     street: this.customer.addresses[0].address,
    //     city: this.customer.addresses[0].cityName,
    //     country: this.customer.addresses[0].country
    //   }
    // };
    //
    // let payment = {
    //   allowPartial: 'false',
    //   description: 'Compra matisses.co',
    //   reference: _id,
    //   amount: {
    //     currency: 'COP',
    //     total: ((this.carrito.totalCarrito + (this.metodoEnvioSeleccionado.code === 2 ? 0 : this.costoEnvio)) - this.carrito.totalDescuentos),
    //     taxes: {
    //       kind: 'valueAddedTax',
    //       amount: this.carrito.totalImpuestos
    //     }
    //   }
    // }
    //
    // this.datosPago = new DatosPagoPlaceToPay().newDatosPagoPlaceToPay(buyer, null, navigator.userAgent, payment, null, null, this.urlReturn + _id, '');
    //
    // this._placetopayService.redirect(this.datosPago).subscribe(
    //   response => {
    //     if (response.codigo === -1) {
    //       this.procesandoP2P = false;
    //       return;
    //     }
    //     localStorage.removeItem('matisses.shoppingCart');
    //     window.location.href = response.respuestaPlaceToPay.processUrl;
    //   },
    //   error => {
    //     console.error(error);
    //   }
    // );
  }

  public refrescarValoresCarrito() {
    this.carrito1.clickCarrito();

    for (let i = 0; this.carrito.shoppingCart.items.length; i++) {
      this._itemService.find(this.carrito.shoppingCart.items[i].shortitemcode).subscribe(
        response => {
          if (response.result[0].priceaftervat !== this.carrito.shoppingCart.items[i].priceaftervat) {
            response.result[0].selectedQuantity = this.carrito.shoppingCart.items[i].selectedQuantity;
            this.carrito.shoppingCart.items[i].selectedQuantity = 0;
            this.carrito.procesarItem(this.carrito.shoppingCart.items[i]);
            this.carrito.procesarItem(response.result[0]);
          } else {
            if (this.carrito.shoppingCart.items[i].descuento) {
              if (this.carrito.shoppingCart.items[i].descuento > 0) {
                this._descuentosService.findDiscount(this.carrito.shoppingCart.items[i].itemcode).subscribe(
                  response => {
                    if (!(response.descuentos.length > 0 && (response.descuentos[0].porcentaje === this.carrito.shoppingCart.items[i].descuento))) {
                      let item = this.carrito.shoppingCart.items[i];
                      let selectedQuantity = this.carrito.shoppingCart.items[i].selectedQuantity;
                      if (response.descuentos.length > 0 && response.descuentos[0].porcentaje !== 'undefined') {
                        this.carrito.shoppingCart.items[i].discount = response.descuentos[0].porcentaje;
                        item.descuento = response.descuentos[0].porcentaje;
                        item.priceafterdiscount = this.carrito.shoppingCart.items[i].priceaftervat + ((this.carrito.shoppingCart.items[i].priceaftervat / 100) * item.descuento);
                      } else {
                        this.carrito.shoppingCart.items[i].discount = 0;
                        item.descuento = 0;
                        item.priceafterdiscount = 0;
                      }
                      this.carrito.shoppingCart.items[i].selectedQuantity = 0;
                      this.carrito.procesarItem(this.carrito.shoppingCart.items[i]);
                      item.selectedQuantity = selectedQuantity;
                      this.carrito.procesarItem(item);
                      this.carrito.mostrarModalCarrito(false);//TODO: false no muestra modal de agreagr al cerrar cambioPrecio
                      this.procesandoP2P = false;
                    }
                  }, error => { console.error(error); }
                );
              }
            }
          }
        }, error => { console.error(error); }
      );
    }
    this._router.navigate(['www.matisses.co/resumen-carrito']);
    this.carrito.cargarCarrito();
  }

  public seleccionarMetodoEnvio(metodo) {
    this.metodoEnvioSeleccionado = metodo;
    if (metodo.code === 2) {
      this.totalEnvio = 0;
      this.totalEnvioFormat = '0';
    } else {
      this.totalEnvio = this.costoEnvio;
      this.totalEnvioFormat = this.formatNumber(this.totalEnvio);
    }
    this.totalEnvioFinal = (this.carrito.totalCarrito + this.totalEnvio) - this.carrito.totalDescuentos;
    this.totalEnvioFinalFormat = this.formatNumber(this.totalEnvioFinal);
  }

  private obtenerNombreCiudad() {
    //if (this.customer.addresses[0].cityName == null || this.customer.addresses[0].cityName.length <= 0) {
    for (let i = 0; i < this.ciudadesPrincipales.length; i++) {
      if (this.ciudadesPrincipales[i].code === this.customer.addresses[0].cityCode.toString()) {
        this.customer.addresses[0].cityName = this.ciudadesPrincipales[i].name;
        break;
      }
    }
    //if (this.customer.addresses[0].cityName == null || this.customer.addresses[0].cityName.length <= 0) {
    for (let i = 0; i < this.otrasCiudades.length; i++) {
      if (this.otrasCiudades[i].code === this.customer.addresses[0].cityCode.toString()) {
        this.customer.addresses[0].cityName = this.otrasCiudades[i].name;
        break;
      }
    }
    //}
    //}
  }

  public cambiarCiudad() {
    this.metodoEnvioSeleccionado = null;
    if (this.customer.addresses[0].cityCode != null || this.customer.addresses[0].cityCode != 0) {
      this.obtenerNombreCiudad();
      this.consultarCostoEnvio();
    }
  }

  public limpiar() {
    this.customer = new Customer().newCustomer('', '', null, '', '', '', '', '', '', '', '', null, '', '', '', '', '', '', [{
      stateCode: null,
      stateName: null,
      cityCode: null,
      cityName: null,
      addressName: null,
      addressType: null,
      address: null,
      landLine: null,
      cellphone: null,
      email: null,
      country: null,
      taxCode: null
    }]);
  }

  public toggleResumen() {
    if (this.resumenMobileVisible || this.resumenDesktopVisible) {
      //ocultar mobile
      this.closeResumen();
    } else {
      //mostrar mobile/desktop
      this.openResumen();
    }
  }

  private openResumen() {
    if (this.viewportWidth <= 991) {
      //mostrar mobile
      const divs = document.getElementById("carrito1").getElementsByTagName("div");
      for (let i = 0; i < divs.length; i++) {
        if (divs[i].id === 'resumen') {
          divs[i].style.height = "315px";
          divs[i].style.boxShadow = "0px 5px 16px 0px rgba(0, 0, 0, 0.75)";
          this.resumenMobileVisible = true;
          break;
        }
      }
    } else {
      //mostrar desktop
      const divs = document.getElementById("carrito2").getElementsByTagName("div");
      for (let i = 0; i < divs.length; i++) {
        if (divs[i].id === 'resumen') {
          divs[i].style.height = "315px";
          divs[i].style.boxShadow = "0px 5px 16px 0px rgba(0, 0, 0, 0.75)";
          this.resumenDesktopVisible = true;
          break;
        }
      }
    }
    this.carrito.cargarCarrito();
  }

  public closeResumen() {
    if (this.viewportWidth <= 991) {
      //mostrar mobile
      const divs = document.getElementById("carrito1").getElementsByTagName("div");
      for (let i = 0; i < divs.length; i++) {
        if (divs[i].id === 'resumen') {
          divs[i].style.height = "0px";
          divs[i].style.boxShadow = "0px 5px 16px 0px rgba(0, 0, 0, 0)";
          this.resumenMobileVisible = false;
          break;
        }
      }
    } else {
      //mostrar desktop
      const divs = document.getElementById("carrito2").getElementsByTagName("div");
      for (let i = 0; i < divs.length; i++) {
        if (divs[i].id === 'resumen') {
          divs[i].style.height = "0px";
          divs[i].style.boxShadow = "0px 5px 16px 0px rgba(0, 0, 0, 0)";
          this.resumenDesktopVisible = false;
          break;
        }
      }
    }
  }

  public vaciarDocumento(tipoDocumento: string) {
    if (tipoDocumento === '31') {
      this.customer.fiscalID = "";
      this.maxlength = 9;
    } else {
      this.customer.fiscalID = "";
      this.customer.cardName = "";
      this.maxlength = 10;
    }
  }

  public formatNumber(num: number) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  public inicializarCliente() {
    this.customerEdit = {
      'CardCode': '',
      'CardName': '',
      'CardType': '',
      'GroupCode': '',
      'Address': '',
      "ZipCode": null,
      'MailAddress': '',
      'MailZipCode': null,
      'Phone1': '',
      'Phone2': null,
      'Fax': null,
      'ContactPerson': null,
      'Notes': null,
      'PayTermsGrpCode': -1,
      'CreditLimit': 0,
      'MaxCommitment': 0,
      'DiscountPercent': 0,
      'VatLiable': '',
      'FederalTaxID': '',
      'DeductibleAtSource': '',
      'DeductionPercent': 0,
      'DeductionValidUntil': null,
      'PriceListNum': 1,
      'IntrestRatePercent': 0,
      'CommissionPercent': 0,
      'CommissionGroupCode': 0,
      'FreeText': null,
      'SalesPersonCode': 0,
      'Currency': 'COP',
      'RateDiffAccount': null,
      'Cellular': '',
      'AvarageLate': null,
      'City': '',
      'County': '',
      "Country": 'CO',
      'MailCity': '',
      'MailCounty': '',
      'MailCountry': 'CO',
      'EmailAddress': '',
      "Picture": null,
      "DefaultAccount": null,
      "DefaultBranch": null,
      "DefaultBankCode": "-1",
      "AdditionalID": null,
      "Pager": null,
      "FatherCard": null,
      "CardForeignName": "MARIA ANGELICA FLORES GIL",
      "FatherType": "cPayments_sum",
      "DeductionOffice": null,
      "ExportCode": null,
      "MinIntrest": 0,
      "CurrentAccountBalance": -779760,
      "OpenDeliveryNotesBalance": 0,
      "OpenOrdersBalance": 0,
      "VatGroup": null,
      "ShippingType": null,
      "Password": null,
      "Indicator": null,
      "IBAN": null,
      "CreditCardCode": -1,
      "CreditCardNum": null,
      "CreditCardExpiration": null,
      "DebitorAccount": "13050501",
      "OpenOpportunities": null,
      "Valid": "tNO",
      "ValidFrom": null,
      "ValidTo": null,
      "ValidRemarks": null,
      "Frozen": "tNO",
      "FrozenFrom": null,
      "FrozenTo": null,
      "FrozenRemarks": null,
      "Block": "3125800077",
      "BillToState": "11",
      "ExemptNum": null,
      "Priority": -1,
      "FormCode1099": null,
      "Box1099": null,
      "PeymentMethodCode": "-1",
      "BackOrder": "tYES",
      "PartialDelivery": "tYES",
      "BlockDunning": "tNO",
      "BankCountry": null,
      "HouseBank": "",
      "HouseBankCountry": "CO",
      "HouseBankAccount": "",
      "ShipToDefault": "FAC-Nro2",
      "DunningLevel": null,
      "DunningDate": null,
      "CollectionAuthorization": "tNO",
      "DME": null,
      "InstructionKey": null,
      "SinglePayment": "tNO",
      "ISRBillerID": null,
      "PaymentBlock": "tNO",
      "ReferenceDetails": null,
      "HouseBankBranch": "",
      "OwnerIDNumber": null,
      "PaymentBlockDescription": -1,
      "TaxExemptionLetterNum": null,
      "MaxAmountOfExemption": 0,
      "ExemptionValidityDateFrom": null,
      "ExemptionValidityDateTo": null,
      "LinkedBusinessPartner": null,
      "LastMultiReconciliationNum": null,
      "DeferredTax": "tNO",
      "Equalization": "tNO",
      "SubjectToWithholdingTax": "tNO",
      "CertificateNumber": null,
      "ExpirationDate": null,
      "NationalInsuranceNum": null,
      "AccrualCriteria": "tNO",
      "WTCode": null,
      "BillToBuildingFloorRoom": "3125800077",
      "DownPaymentClearAct": "28050501",
      "ChannelBP": null,
      "DefaultTechnician": null,
      "BilltoDefault": "FAC-Nro2",
      "CustomerBillofExchangDisc": null,
      "Territory": null,
      "ShipToBuildingFloorRoom": "3125800077",
      "CustomerBillofExchangPres": null,
      "ProjectCode": null,
      "VatGroupLatinAmerica": null,
      "DunningTerm": null,
      "Website": null,
      "OtherReceivablePayable": null,
      "BillofExchangeonCollection": null,
      "CompanyPrivate": "cCompany",
      "LanguageCode": 25,
      "UnpaidBillofExchange": null,
      "WithholdingTaxDeductionGroup": -1,
      "ClosingDateProcedureNumber": null,
      "Profession": null,
      "BankChargesAllocationCode": null,
      "TaxRoundingRule": "trr_CompanyDefault",
      "Properties1": "tNO",
      "Properties2": "tNO",
      "Properties3": "tNO",
      "Properties4": "tNO",
      "Properties5": "tNO",
      "Properties6": "tNO",
      "Properties7": "tNO",
      "Properties8": "tNO",
      "Properties9": "tNO",
      "Properties10": "tNO",
      "Properties11": "tNO",
      "Properties12": "tNO",
      "Properties13": "tNO",
      "Properties14": "tNO",
      "Properties15": "tNO",
      "Properties16": "tNO",
      "Properties17": "tNO",
      "Properties18": "tNO",
      "Properties19": "tNO",
      "Properties20": "tNO",
      "Properties21": "tNO",
      "Properties22": "tNO",
      "Properties23": "tNO",
      "Properties24": "tNO",
      "Properties25": "tNO",
      "Properties26": "tNO",
      "Properties27": "tNO",
      "Properties28": "tNO",
      "Properties29": "tNO",
      "Properties30": "tNO",
      "Properties31": "tNO",
      "Properties32": "tNO",
      "Properties33": "tNO",
      "Properties34": "tNO",
      "Properties35": "tNO",
      "Properties36": "tNO",
      "Properties37": "tNO",
      "Properties38": "tNO",
      "Properties39": "tNO",
      "Properties40": "tNO",
      "Properties41": "tNO",
      "Properties42": "tNO",
      "Properties43": "tNO",
      "Properties44": "tNO",
      "Properties45": "tNO",
      "Properties46": "tNO",
      "Properties47": "tNO",
      "Properties48": "tNO",
      "Properties49": "tNO",
      "Properties50": "tNO",
      "Properties51": "tNO",
      "Properties52": "tNO",
      "Properties53": "tNO",
      "Properties54": "tNO",
      "Properties55": "tNO",
      "Properties56": "tNO",
      "Properties57": "tNO",
      "Properties58": "tNO",
      "Properties59": "tNO",
      "Properties60": "tNO",
      "Properties61": "tNO",
      "Properties62": "tNO",
      "Properties63": "tNO",
      "Properties64": "tNO",
      "CompanyRegistrationNumber": null,
      "VerificationNumber": null,
      "DiscountBaseObject": "dgboNone",
      "DiscountRelations": "dgrLowestDiscount",
      "TypeReport": "atCompany",
      "ThresholdOverlook": "tNO",
      "SurchargeOverlook": "tNO",
      "DownPaymentInterimAccount": null,
      "OperationCode347": "ocGoodsOrServiciesAcquisitions",
      "InsuranceOperation347": "tNO",
      "HierarchicalDeduction": "tNO",
      "ShaamGroup": "sgServicesAndAsset",
      "WithholdingTaxCertified": "tNO",
      "BookkeepingCertified": "tNO",
      "PlanningGroup": null,
      "Affiliate": "tNO",
      "Industry": null,
      "VatIDNum": null,
      "DatevAccount": null,
      "DatevFirstDataEntry": "tYES",
      "GTSRegNo": null,
      "GTSBankAccountNo": null,
      "GTSBillingAddrTel": null,
      "ETaxWebSite": null,
      "HouseBankIBAN": "",
      "VATRegistrationNumber": null,
      "RepresentativeName": null,
      "IndustryType": null,
      "BusinessType": null,
      "Series": 1,
      "AutomaticPosting": "apNo",
      "InterestAccount": null,
      "FeeAccount": null,
      "CampaignNumber": null,
      "AliasName": null,
      "DefaultBlanketAgreementNumber": null,
      "EffectiveDiscount": "dgrLowestDiscount",
      "NoDiscounts": "tNO",
      "GlobalLocationNumber": null,
      "EDISenderID": null,
      "EDIRecipientID": null,
      "ResidenNumber": "rntSpanishFiscalID",
      "RelationshipCode": null,
      "RelationshipDateFrom": null,
      "RelationshipDateTill": null,
      "UnifiedFederalTaxID": null,
      "AttachmentEntry": null,
      "TypeOfOperation": null,
      "EndorsableChecksFromBP": "tYES",
      "AcceptsEndorsedChecks": "tNO",
      "OwnerCode": null,
      "BlockSendingMarketingContent": "tNO",
      "AgentCode": null,
      "EDocGenerationType": null,
      "EDocStreet": null,
      "EDocStreetNumber": null,
      "EDocBuildingNumber": null,
      "EDocZipCode": null,
      "EDocCity": null,
      "EDocCountry": null,
      "EDocDistrict": null,
      "EDocRepresentativeFirstName": null,
      "EDocRepresentativeSurname": null,
      "EDocRepresentativeCompany": null,
      "EDocRepresentativeFiscalCode": null,
      "EDocRepresentativeAdditionalId": null,
      "EDocPECAddress": null,
      "IPACodeForPA": null,
      "UpdateDate": 1521522000000,
      "UpdateTime": "1644:45:00",
      "ExemptionMaxAmountValidationType": "emaIndividual",
      "ECommerceMerchantID": null,
      "U_EsAutorret": "N",
      "U_BPCO_RTC": "RS",
      "U_BPCO_TDC": "13",
      "U_BPCO_CS": "11001",
      "U_BPCO_City": "11001",
      "U_BPCO_TP": "01",
      "U_BPCO_Nombre": "MARIA ANGELICA",
      "U_BPCO_1Apellido": "FLORES",
      "U_BPCO_2Apellido": "GIL",
      "U_BPCO_BPExt": "01",
      "U_BPCO_TBPE": "01",
      "U_BPCO_Address": "BOGOTA",
      "U_Manejo": "DIA",
      "U_BD_Erst": "Y",
      "U_BD_Datev": null,
      "U_saldoCL": null,
      "U_FechaNacimiento": -2208971024000,
      "U_Sexo": "2",
      "U_OK1_AC_ECO": null,
      "U_FactorRedondeo": null,
      "U_IdCatTer": null,
      "BPAddresses": {
        "BPAddress": [
          {
            "AddressName": "FAC-Nro2",
            "Street": "BOGOTA",
            "Block": "3125800077",
            "ZipCode": null,
            "City": "BOGOTÁ",
            "County": '',
            "Country": "CO",
            "State": "11",
            "FederalTaxID": "15584182",
            "TaxCode": "",
            "BuildingFloorRoom": "3125800077",
            "AddressType": "bo_ShipTo",
            "AddressName2": null,
            "AddressName3": null,
            "TypeOfAddress": null,
            "StreetNo": null,
            "BPCode": "15584182CL",
            "RowNum": 1,
            "GlobalLocationNumber": null,
            "Nationality": null,
            "TaxOffice": null,
            "GSTIN": null,
            "GstType": null,
            "U_Municipio": "11001"
          }


        ]
      },
      "ContactEmployees": {
        "ContactEmployee": null
      },
      "BPAccountReceivablePaybleCollection": {
        "BPAccountReceivablePayble": null
      },
      "BPPaymentMethods": {
        "BPPaymentMethod": null
      },
      "BPWithholdingTaxCollection": {
        "BPWithholdingTax": null
      },
      "BPPaymentDates": {
        "BPPaymentDate": null
      },
      "BPBranchAssignment": {
        "BPBranchAssignmentItem": null
      },
      "BPBankAccounts": {
        "BPBankAccount": null
      },
      "BPFiscalTaxIDCollection": {
        "BPFiscalTaxID": null
      },
      "DiscountGroups": {
        "DiscountGroup": null
      },
      "BPIntrastatExtension": null,
      "BPBlockSendingMarketingContents": {
        "BPBlockSendingMarketingContent": null
      }
    }
  }
}
