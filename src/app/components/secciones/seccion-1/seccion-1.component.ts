import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

//declare var jquery: any;
declare var $: any;

@Component({
  selector: 'seccion-1',
  templateUrl: 'seccion-1.html',
  styleUrls: ['seccion-1.component.css'],

})

export class Seccion1Component implements OnInit {


  constructor(private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {

  }

  ngAfterViewInit() {

   }

}
