import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

declare var $: any;

@Component({
  selector: 'blog-comedores',
  templateUrl: 'comedores.html',
  styleUrls: ['comedores.component.css']
})

export class BlogComedoresComponent implements OnInit {
  public title: string;

  constructor(private _route: ActivatedRoute, private _router: Router) {
  }

  ngOnInit() {

  }

  ngAfterViewInit() {

  }

}
