import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ProductosComponent } from './productos/productos.component';
import { FiltrosComponent } from './filtros/filtros.component';
import { ItemService } from '../../services/item.service';
import { DescuentosService } from '../../services/descuentos.service';
import { Item } from '../../models/item';
import { Meta ,Title} from '@angular/platform-browser';

declare var $: any;

@Component({
  templateUrl: 'category.html',
  styleUrls: ['category.component.css'],
  providers: [ItemService, DescuentosService]
})

export class CategoryComponent implements OnInit {
  @ViewChild(ProductosComponent)
  private productosComponent: ProductosComponent;
  @ViewChild(FiltrosComponent)
  private filtrosComponent: FiltrosComponent;

  public nombreGrupo: string;
  public nombreSubgrupo: string;
  public items: Array<Item>;
  public queryString: string;
  public queryParams: Map<string, string>;
  private availableFields: string[] = ['page', 'pageSize', 'orderBy', 'department', 'group', 'subgroup', 'color', 'minPrice', 'maxPrice', 'brand', 'material', 'collection', 'keywords', 'discount'];
  public urlCategoria: any;
  public tieneCategoria: number = 0;

  constructor(private _itemService: ItemService, private _route: ActivatedRoute, private _router: Router, private _descuentosService: DescuentosService,private meta: Meta,private title1: Title) {
    this.queryParams = new Map<string, string>();

    // this.title1.setTitle('Categorias-Matisses');
    // this.meta.updateTag({ name: 'title', content: 'Categorias-Matisses' });
    // this.meta.updateTag({ name: 'keywords', content: 'mobiliario, cocina, decorativos, iluminacion, libros' });
    // this.meta.updateTag({ name: 'description', content: 'Categorias-Matisses' });
    // this.meta.updateTag({ name: 'image', content: 'http://www.matisses.co/assets/images/categorias/img-category.jpg' });
    // this.meta.addTag({ property: 'og:url', content: 'http://www.matisses.co/categoria' });
    // this.meta.addTag({ property: 'og:title', content: 'Categorias-Matisses' });
    // this.meta.addTag({ property: 'og:image', content: 'http://www.matisses.co/assets/images/categorias/img-category.jpg' });
    // this.meta.addTag({ property: 'og:description', content: '!Escoge de una gran variedad de productos exclusivos!' });
  }

  ngOnInit() {
    this.cargarItems();
    console.log("que lleva en el meta tag "+this.meta.getTag("og:image"));
  }

  ngAfterViewInit() {
    $(document).ready(function () {
      $("html, body").animate({ scrollTop: 0 }, 1000);
    });

    this.urlCategoria = window.location.href;
    this.sinCategoria();
  }

  public sinCategoria() {
    if (this.urlCategoria === 'https://www.matisses.co/categoria?keywords=calia') {
      this.tieneCategoria = 1;
    } else if (this.urlCategoria === 'https://www.matisses.co/categoria?keywords=plantui') {
      this.tieneCategoria = 2;
    } else if (this.urlCategoria === 'https://www.matisses.co/categoria?keywords=boska') {
      this.tieneCategoria = 3;
    } else {  }
  }

  public formatNumber(num) {

    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

  private cargarItems() {
    this.items = new Array<Item>();
    this._route.queryParams.forEach((params: Params) => {
      this.inicializarMapa(params);
      this._itemService.filter(this.queryString).subscribe(
        response => {
          this.items = response.result;
          for (let i = 0; i < this.items.length; i++) {
            //validar si el ítem tiene descuentos

            this._descuentosService.findDiscount(this.items[i].itemcode).subscribe(
              response => {
                if (this.items[i].priceaftervat === response.precio) {
                  if (response.descuentos && response.descuentos.length > 0) {
                    this.items[i].descuento = response.descuentos[0].porcentaje;
                    this.items[i].priceafterdiscount = this.items[i].priceaftervat - ((this.items[i].priceaftervat / 100) * this.items[i].descuento);
                    if(this.items[i].priceafterdiscount){
                        this.items[i].priceafterdiscountFormat=this.formatNumber(this.items[i].priceafterdiscount);
                    }

                  }
                }
              },
              error => {
                console.error(error);
              }
            );
            if(this.items[i].priceaftervat){
              this.items[i].priceaftervatFormat=this.formatNumber(this.items[i].priceaftervat);
            }

          }
          this.productosComponent.cargarItems(this.availableFields, this.items, this.queryParams, response.records);
          this.filtrosComponent.inicializarFiltros(this.availableFields, this.queryParams, this.queryString, response.records);
        },
        error => {
          console.error(error);
        }
      );
    });
  }

  private inicializarMapa(params: Params) {
    this.queryParams = new Map<string, string>();
    this.queryString = '?';
    for (let i = 0; i < this.availableFields.length; i++) {
      let key = this.availableFields[i];
      if (params[key]) {
        this.queryParams.set(key, params[key]);
        if (this.queryString.charAt(this.queryString.length - 1) != '?') {
          this.queryString += '&';
        }
        this.queryString += key + '=' + this.queryParams.get(key);
      }
    }
    this.inicializarNombreGrupo();
  }

  private inicializarNombreGrupo() {
    this.nombreGrupo = '';
    if (this.queryParams.has('group')) {
      this._itemService.findType('grupo', '?fieldValue=' + this.queryParams.get('group').substring(0, 3)).subscribe(
        response => {
          try {
            this.nombreGrupo = response.result[0].group.name;
            console.log('entra en servicio');
            //Cambiar imagen categoria
            $('.img-category').css('background', 'url(/assets/images/categorias/' + response.result[0].group.code.substring(0, 3) + '.jpg) no-repeat center top');
            this.title1.setTitle('Matisses- '+this.nombreGrupo);
            this.meta.updateTag({ name: 'title', content: 'Matisses- '+this.nombreGrupo });
            this.meta.updateTag({ name: 'keywords', content: this.nombreGrupo });
            this.meta.updateTag({ name: 'description', content: 'Matisses- '+this.nombreGrupo });
            this.meta.updateTag({ name: 'image', content: 'http://www.matisses.co/assets/images/categorias/' + response.result[0].group.code.substring(0, 3) + '.jpg' });
            this.meta.updateTag({ property: 'og:url', content: 'http://www.matisses.co/categoria' });
            this.meta.updateTag({ property: 'og:title', content: 'Matisses- '+this.nombreGrupo });
            this.meta.updateTag({ property: 'og:image', content: 'http://www.matisses.co/assets/images/categorias/' + response.result[0].group.code.substring(0, 3) + '.jpg' });
            this.meta.updateTag({ property: 'og:description', content: '!Escoge de una gran variedad de productos exclusivos!' });
            console.log('pasa por la asignacion de tags');
          } catch (e) {
            console.error(e);
          }
        }, error => { console.error(error); }
      )
    }
  }

  public openFilter() {
    document.getElementById("myFilter").style.width = "100%";
  }

  public closeFilter() {
    document.getElementById("myFilter").style.width = "0%";
  }

}
