import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Meta ,Title} from '@angular/platform-browser';
declare var $: any;

@Component({
    templateUrl: 'tiendas.html',
    styleUrls: ['tiendas.component.css']
})

export class TiendasComponent implements OnInit {
    public title: string;

    constructor(private _route: ActivatedRoute, private _router: Router, private meta: Meta,private title1: Title) {
      this.title1.setTitle('Tiendas-Matisses');
      this.meta.updateTag({ name: 'title', content: 'Tiendas-Matisses' });
      this.meta.updateTag({ name: 'keywords', content: 'tiendas, mobiliario, hogar' });
      this.meta.updateTag({ name: 'description', content: 'Tiendas-Matisses' });
      this.meta.updateTag({ name: 'image', content: 'http://blog.matisses.co:4000/assets/images/medellin.jpg' });
      this.meta.addTag({ property: 'og:url', content: 'http://blog.matisses.co/tiendas' });
      this.meta.addTag({ property: 'og:title', content: 'Tiendas-Matisses' });
      this.meta.addTag({ property: 'og:image', content: 'http://blog.matisses.co:4000/assets/images/medellin.jpg' });
      this.meta.addTag({ property: 'og:description', content: 'Encuentra la tienda más cercana' });
    }

    ngOnInit() {
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
