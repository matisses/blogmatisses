import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Meta ,Title} from '@angular/platform-browser';
declare var $: any;

@Component({
  selector: 'matisses-home',
  templateUrl: 'home.html',
  styleUrls: ['home.component.css']
})

export class HomeComponent implements OnInit {
  public title: string;

  constructor(private _route: ActivatedRoute, private _router: Router,private meta: Meta,private title1: Title) {
    this.title = 'Este es el cuerpo';
    this.title1.setTitle('Sitio Oficial-Matisses');
    this.meta.updateTag({ name: 'title', content: 'Sitio Oficial-Matisses' });
    this.meta.updateTag({ name: 'keywords', content: 'matisses, sofas, decoracion' });
    this.meta.updateTag({ name: 'description', content: 'Sitio Oficial-Matisses' });
    this.meta.updateTag({ name: 'image', content: 'http://www.matisses.co/assets/images/medellin.jpg' });
    this.meta.addTag({ property: 'og:url', content: 'http://www.matisses.co/' });
    this.meta.addTag({ property: 'og:title', content: 'Sitio Oficial-Matisses' });
    this.meta.addTag({ property: 'og:image', content: 'http://www.matisses.co/assets/images/medellin.jpg' });
    this.meta.addTag({ property: 'og:description', content: 'Sitio Oficial-Matisses' });
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    $(document).ready(function() {
      $("html, body").animate({scrollTop: 0}, 1000);
    });
  }

}
