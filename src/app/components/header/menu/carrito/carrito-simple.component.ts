import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Item } from '../../../../models/item';

import { DescuentosService } from '../../../../services/descuentos.service';
import { ItemService } from '../../../../services/item.service';

declare var $: any;

@Component({
  selector: 'matisses-carrito-simple',
  template: `<span style="display: none">este es el componenete de funcionalidad de carrito</span>`,
  providers: [DescuentosService, ItemService]
})

export class CarritoSimpleComponent {
  public id: number = Math.random() * 1000 | 0;
  private idCarrito: string;
  public totalItems: number = 0;
  public totalCarrito: number = 0;
  public totalImpuestos: number = 0;
  public totalDescuentos: number = 0;
  public totalCarritoFormat: string = "0";
  public totalImpuestosFormat: string = "0";
  public totalDescuentosFormat: string = "0";
  public mostrar: boolean = true;
  public shoppingCart: any;
  public item: Item;
  public difTotalDescuentos:number=0;
  public difTotalDescuentosFormat:string="0";
  public difTotalImpuestos:number=0;
  public difTotalImpuestosFormat:string="0";

  constructor(private _route: ActivatedRoute, private _router: Router, private _descuentosService: DescuentosService, private _itemService: ItemService) {
    this.inicializarShoppingCart();
  }

  private inicializarShoppingCart() {
    this.shoppingCart = {
      _id: null,
      metodoEnvio: null,
      fechacreacion: new Date(),
      items: new Array<Item>()
    };
  }

  public cargarCarrito() {
    //consultar localstorage
    let localSC = JSON.parse(localStorage.getItem('matisses.shoppingCart'));
    if (!localSC) {
      this.inicializarShoppingCart();
    } else {
      this.shoppingCart = localSC;
    }
    //TODO: validar si el carrito esta vigente
    //TODO: validar el saldo y los precios de los items en el carrito si la fecha de creacion es del dia anterior

    if (this.shoppingCart.items === null) {
      this.shoppingCart.items = new Array<Item>();
    }
    this.procesarCarrito();
  }

  public procesarItem(item: Item) {
    item.selectedQuantity = parseInt(item.selectedQuantity.toString());
    if (item.selectedQuantity > 0) {
      let items = new Array<Item>();
      items.push(item);

      this._itemService.validarItems(items).subscribe(
        response => {
          if (response[0].sinSaldo) {
            //modal sin saldo
            item.availablestock = response[0].availablestock;
            localStorage.setItem('matisses.lastAddedItem', JSON.stringify(item));
            $('#modalSinSaldo').modal('show');
          } else {
            this.cambiarItem(item);
          }
        },
        error => { console.error(error); }
      );
    } else {
      this.cambiarItem(item);
    }
  }

  public mostrarModalCarrito(show: boolean) {
    if (show) {
      this.mostrar = true;
      this.cargarCarrito();
    } else {
      this.mostrar = false;
      this.cargarCarrito();
    }
  }

  private cambiarItem(item: Item) {
    //0. Cargar contenido de localStorage
    this.cargarCarrito();
    //1. validar contenido
    let encontrado = false;
    for (let i = 0; i < this.shoppingCart.items.length; i++) {
      if (this.shoppingCart.items[i].itemcode === item.itemcode) {
        encontrado = true;
        if (item.selectedQuantity === 0) {
          //eliminar item
          this.shoppingCart.items.splice(i, 1);
        } else {
          //modificar el item
          this.shoppingCart.items[i].selectedQuantity = item.selectedQuantity;
        }
        break;
      }
    }
    //2. agregar
    if (!encontrado) {
      this.shoppingCart.items.push(item);
    }
    //3. guardar
    localStorage.setItem('matisses.shoppingCart', JSON.stringify(this.shoppingCart));
    //4. Actualizar contenido HTML
    this.procesarCarrito();

    let components = document.getElementsByClassName("total-items-carrito-badge");
    for (let i = 0; i < components.length; i++) {
      components[i].innerHTML = this.totalItems.toString();
    }

    if (!encontrado && this.mostrar) {
      localStorage.setItem('matisses.lastAddedItem', JSON.stringify(item));
      $('#carritoModal').modal('show');
    }
  }

  public validarItem(itemCode) {
    if (itemCode === '24400000000000000121') {
      let items = [
        "20900000000000000049", "20900000000000000077", "20900000000000000081", "20900000000000000083",
        "20900000000000000089", "20900000000000000091", "20900000000000000092", "20900000000000000099",
        "20900000000000000101", "20900000000000000102", "20900000000000000103", "20900000000000000106",
        "20900000000000000107", "20900000000000000108", "20900000000000000109", "20900000000000000110",
        "21300000000000000033", "21300000000000000040", "21300000000000000041", "21300000000000000042",
        "21300000000000000044", "21300000000000000046", "21300000000000000047", "21300000000000000048",
        "21300000000000000050", "21300000000000000051", "21300000000000000054", "21300000000000000056",
        "21300000000000000058", "21300000000000000059", "21300000000000000060", "21300000000000000061",
        "21300000000000000062", "21300000000000000063", "21300000000000000065", "21300000000000000066",
        "21300000000000000067", "21300000000000000068", "21300000000000000069"
      ];
      let itemDescuento = [
        "24400000000000000121"
      ];

      let hayMueble = false;
      for (let i = 0; i < this.shoppingCart.items.length; i++) {
        for (let j = 0; j < items.length; j++) {
          if (items[j] === this.shoppingCart.items[i].itemcode) {
            hayMueble = true;
          }
        }
      }

      return hayMueble;
    }

    return true;
  }

  // public validarSofaExiste(itemCode) {
  //   //if (itemCode === '24400000000000000121') {
  //     let haySofa=false;
  //     let aplicaDescuento=false;
  //     let sofas = [
  //       "10500000000000001348",
  // "10500000000000001481",
  // "10500000000000001801",
  // "10500000000000001855",
  // "10500000000000001856",
  // "10500000000000001861",
  // "10500000000000001865",
  // "10500000000000001867",
  // "10500000000000001876",
  // "10500000000000001894",
  // "15700000000000000025",
  // "20900000000000000049",
  // "20900000000000000112",
  // "20900000000000000119",
  // "20900000000000000137",
  // "20900000000000000138",
  // "20900000000000000139",
  // "20900000000000000140",
  // "20900000000000000143",
  // "20900000000000000145",
  // "21300000000000000054",
  // "21300000000000000067",
  // "21300000000000000070",
  // "21300000000000000085",
  // "21300000000000000093",
  // "21600000000000000038"
  //     ];
  //     let itemsDescuento = [
  //       "88800000000000000026",
  //       "88800000000000000037",
  //       "88800000000000000043",
  //       "88800000000000000045",
  //       "88800000000000000062",
  //       "88800000000000000067",
  //       "88800000000000000083",
  //       "88800000000000000084",
  //       "88800000000000000088",
  //       "88800000000000000092",
  //       "88800000000000000095",
  //       "88800000000000000098",
  //       "88800000000000000099",
  //       "88800000000000000100",
  //       "88800000000000000103",
  //       "88800000000000000105",
  //       "88800000000000000106",
  //       "88800000000000000107",
  //       "26400000000000000009",
  //       "26400000000000000011",
  //       "26400000000000000012",
  //       "26400000000000000013",
  //       "26400000000000000021",
  //       "26400000000000000022",
  //       "26400000000000000023",
  //       "26400000000000000025",
  //       "26400000000000000027",
  //       "26400000000000000028",
  //       "26400000000000000029",
  //       "26400000000000000030",
  //       "26400000000000000031",
  //       "26400000000000000038",
  //       "26400000000000000039",
  //       "26400000000000000040",
  //       "26400000000000000041",
  //       "26400000000000000243",
  //       "26400000000000000245",
  //       "26400000000000000246",
  //       "26400000000000000247",
  //       "26400000000000000251",
  //       "26400000000000000253",
  //       "26400000000000000254",
  //       "26400000000000000255",
  //       "26400000000000000256",
  //       "26400000000000000257",
  //       "26400000000000000258",
  //       "26400000000000000259",
  //       "26400000000000000260",
  //       "26400000000000000262",
  //       "26400000000000000263",
  //       "26400000000000000264",
  //       "13300000000000000027",
  //       "13300000000000000046",
  //       "13300000000000000057",
  //       "13300000000000000129",
  //       "13300000000000000146",
  //       "13300000000000000149",
  //       "13300000000000000179",
  //       "13300000000000000185",
  //       "13300000000000000188",
  //       "13300000000000000247",
  //       "13300000000000000318",
  //       "13300000000000000332",
  //       "13300000000000000349",
  //       "13300000000000000378",
  //       "13300000000000000389",
  //       "13300000000000000429",
  //       "13300000000000000455",
  //       "13300000000000000461",
  //       "13300000000000000463",
  //       "13300000000000000466",
  //       "13300000000000000470",
  //       "13300000000000000476",
  //       "13300000000000000478",
  //       "13300000000000000479",
  //       "13300000000000000489",
  //       "13300000000000000495",
  //       "13300000000000000509",
  //       "13300000000000000513",
  //       "13300000000000000515",
  //       "13300000000000000519",
  //       "13300000000000000520",
  //       "13300000000000000521",
  //       "13300000000000000522",
  //       "13300000000000000523",
  //       "13300000000000000524",
  //       "13300000000000000525",
  //       "13300000000000000526",
  //       "13300000000000000527",
  //       "13300000000000000528",
  //       "13300000000000000529",
  //       "13300000000000000530",
  //       "13300000000000000531",
  //       "13300000000000000532",
  //       "13300000000000000533",
  //       "13300000000000000534",
  //       "13300000000000000535"
  //     ];
  //
  //     let hayMueble = false;
  //     for (let i = 0; i < this.shoppingCart.items.length; i++) {
  //       for (let j = 0; j < sofas.length; j++) {
  //         if (sofas[j] === this.shoppingCart.items[i].itemcode) {
  //           haySofa = true;
  //         }
  //       }
  //     }
  //     if(haySofa){
  //       for (let i = 0; i < this.shoppingCart.items.length; i++) {
  //         for (let j = 0; j < itemsDescuento.length; j++) {
  //           if (itemsDescuento[j] === this.shoppingCart.items[i].itemcode) {
  //             aplicaDescuento= true;
  //             this.shoppingCart.items[i].descuento=40
  //           }
  //         }
  //       }
  //     }
  //
  //     return hayMueble;
  //   //}
  //
  //   return true;
  // }

  public formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

  private procesarCarrito() {
    this.totalItems = 0;
    this.totalCarrito = 0;
    this.totalImpuestos = 0;
    this.totalDescuentos = 0;
    let totalSinIVA = 0;
    for (let i = 0; i < this.shoppingCart.items.length; i++) {
      let selectedQuantity = this.shoppingCart.items[i].selectedQuantity ? this.shoppingCart.items[i].selectedQuantity : 0;
      let price = this.shoppingCart.items[i].priceaftervat ? this.shoppingCart.items[i].priceaftervat : 0;
      this.totalItems += selectedQuantity;
      this.totalCarrito += (price * selectedQuantity);
      if ((this.shoppingCart.items[i].priceafterdiscount && this.shoppingCart.items[i].priceafterdiscount > 0)) {
        if (this.validarItem(this.shoppingCart.items[i].itemcode) && this.shoppingCart.items[i].itemcode === '24400000000000000121') {
        } else if (this.validarItem(this.shoppingCart.items[i].itemcode) && this.shoppingCart.items[i].itemcode !== '24400000000000000121') {
        } else {
          totalSinIVA += (this.shoppingCart.items[i].pricebeforevat ? this.shoppingCart.items[i].pricebeforevat : 0) * selectedQuantity;
          continue;
        }
        let valorIVA = this.shoppingCart.items[i].priceafterdiscount * this.shoppingCart.items[i].taxpercent / 100;
        totalSinIVA += ((this.shoppingCart.items[i].priceafterdiscount - valorIVA) * selectedQuantity);
        this.totalDescuentos += ((this.shoppingCart.items[i].priceaftervat / 100) * this.shoppingCart.items[i].descuento) * selectedQuantity;
        this.shoppingCart.items[i].priceaftervatFormat=this.formatNumber(this.shoppingCart.items[i].priceaftervat);
        this.shoppingCart.items[i].priceafterdiscountFormat=this.formatNumber(this.shoppingCart.items[i].priceafterdiscount);
      } else {
        totalSinIVA += (this.shoppingCart.items[i].pricebeforevat ? this.shoppingCart.items[i].pricebeforevat : 0) * selectedQuantity;
      }
      //this.shoppingCart.items[i].priceafterdiscountFormat=this.formatNumber(this.shoppingCart.items[i].priceafterdiscount);
    }
    this.totalCarritoFormat=this.formatNumber(this.totalCarrito);

    this.totalImpuestos = (this.totalCarrito - this.totalDescuentos - totalSinIVA) | 0;
    this.totalImpuestosFormat=this.formatNumber(this.totalImpuestos);
    this.totalDescuentosFormat=this.formatNumber(this.totalDescuentos);
    this.difTotalDescuentos=this.totalCarrito - this.totalDescuentos;
    this.difTotalImpuestos=this.totalCarrito-this.totalImpuestos;
    this.difTotalImpuestosFormat=this.formatNumber(this.difTotalImpuestos);
    this.difTotalDescuentosFormat=this.formatNumber(this.difTotalDescuentos);
  }
}
