import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ItemService } from '../../../services/item.service';
import { Item } from '../../../models/item';


//declare var jquery: any;
declare var $: any;

@Component({
  selector: 'seccion-info',
  templateUrl: 'seccion-fija.html',
  styleUrls: ['seccion-fija.component.css'],
  providers: [ItemService],

})

export class SeccionFijaComponent implements OnInit {
  public itemsAsa: Array<Item>;
  public itemsCarousel: Array<Item>;


  constructor(private _route: ActivatedRoute, private _router: Router, private _itemService: ItemService) { }

  ngOnInit() {
    this.inicializarItems();
    this.inicializarCarousel();
  }

  ngAfterViewInit() {
    setTimeout(function() {
      $("#asa").click();
    }, 1050);
   }

  private inicializarItems() {
    this.itemsAsa = new Array<Item>();
    let refs = ['2220327', '2220322', '2220324'];

    for (let i = 0; i < refs.length; i++) {
      this._itemService.find(refs[i]).subscribe(
        response => {
          this.itemsAsa.push(response.result[0]);
        }, error => { console.error(); }
      );
    }
  }

  private inicializarCarousel() {
    this.itemsCarousel = new Array<Item>();
    let refes = [
     '2220643',
     '2220184',
     '2220526',
     '2220613',
     '2220267',
     '2220212',
     '2220538',
     '2220910',
     '2220356',
     '2220036',
     '2220042',
     '2220049'
    ];

    for (let i = 0; i < refes.length; i++) {
      this._itemService.find(refes[i]).subscribe(
        response => {
          this.itemsCarousel.push(response.result[0]);
        }, error => { console.error(); }
      );
    }
  }



}
