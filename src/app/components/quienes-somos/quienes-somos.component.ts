import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Meta ,Title} from '@angular/platform-browser';

declare var $: any;

@Component({
  templateUrl: 'quienes-somos.html',
  styleUrls: ['quienes-somos.component.css']
})

export class QuienesComponent implements OnInit {

  constructor(private _route: ActivatedRoute, private _router: Router,private meta: Meta,private title1: Title) {
    this.title1.setTitle('Quienes Somos-Matisses');
    this.meta.updateTag({ name: 'title', content: 'Quienes Somos-Matisses' });
    this.meta.updateTag({ name: 'keywords', content: 'conocenos, decoracion, tiendas, espacios, interiorismo' });
    this.meta.updateTag({ name: 'description', content: 'Somos una empresa que trabaja día a día para ofrecer productos que hagan especial y único el hogar, donde la experiencia de habitarlo este a la vanguardia.' });
    this.meta.updateTag({ name: 'image', content: 'http://www.matisses.co/assets/images/fachada.jpg' });
    this.meta.addTag({ property: 'og:url', content: 'http://www.matisses.co/quienes' });
    this.meta.addTag({ property: 'og:title', content: 'Quienes Somos-Matisses' });
    this.meta.addTag({ property: 'og:image', content: 'http://www.matisses.co/assets/images/fachada.jpg' });
    this.meta.addTag({ property: 'og:description', content: 'Somos una empresa que trabaja día a día para ofrecer productos que hagan especial y único el hogar, donde la experiencia de habitarlo este a la vanguardia.' });
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    $(document).ready(function() {
      $("html, body").animate({scrollTop: 0}, 1000);
    });
  }
}
