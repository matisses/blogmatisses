import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

declare var $: any;

@Component({
  selector: 'blog-floreros',
  templateUrl: 'floreros.html',
  styleUrls: ['floreros.component.css']
})

export class BlogFlorerosComponent implements OnInit {
  public title: string;

  constructor(private _route: ActivatedRoute, private _router: Router) {
  }

  ngOnInit() {

  }

  ngAfterViewInit() {

  }

}
