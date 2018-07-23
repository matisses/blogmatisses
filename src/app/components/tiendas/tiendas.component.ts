import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Meta } from '@angular/platform-browser';
declare var $: any;

@Component({
    templateUrl: 'tiendas.html',
    styleUrls: ['tiendas.component.css']
})

export class TiendasComponent implements OnInit {
    public title: string;

    constructor(private _route: ActivatedRoute, private _router: Router, private meta: Meta) {
    }

    ngOnInit() {

      this.meta.addTag({ name: 'title', content: 'Tiendas Matisses' });
      this.meta.addTag({ name: 'keywords', content: 'tiendas, matisses, decoracion, tips' });
      this.meta.addTag({ name: 'description', content: 'Tiendas Matisses' });
      this.meta.addTag({ name: 'twitter:card', content: 'summary_large_image' });
      this.meta.addTag({ name: 'twitter:site', content: '@alligatorio' });
      this.meta.addTag({ name: 'twitter:title', content: 'Tiendas Matisses' });
      this.meta.addTag({ name: 'twitter:description', content: 'Tiendas Matisses' });
      this.meta.addTag({ name: 'twitter:image', content: 'https://alligator.io/images/front-end-cover.png' });
      $(window).scroll(function() {
        var scroll = $(window).scrollTop();
        if (scroll > 1) {
          $(".leer-mas").addClass("show");
        } else {
          $(".leer-mas").removeClass("show")
        }
      });

      $(".leer-mas").click(function() {
        $("html, body").animate({scrollTop: 500}, 1000);
      });
    }

    ngAfterViewInit() {
      $(document).ready(function() {
        $("html, body").animate({scrollTop: 0}, 1000);
      });
    }

}
