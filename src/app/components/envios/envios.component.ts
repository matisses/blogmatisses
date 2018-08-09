import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Meta ,Title} from '@angular/platform-browser';
declare var $: any;

@Component({
    templateUrl: 'envios.html',
    styleUrls: ['envios.component.css']
})

export class EnviosComponent implements OnInit {
    public title: string;

    constructor(private _route: ActivatedRoute, private _router: Router, private meta: Meta,private title1: Title) {
        this.title = 'Este es el cuerpo de envios';
        this.title1.setTitle('Envíos Matisses');
        this.meta.addTag({ name: 'title', content: 'Envíos Matisses' });
        this.meta.addTag({ name: 'keywords', content: 'envío, matisses' });
        this.meta.addTag({ name: 'description', content: 'Envíos Matisses' });
        this.meta.addTag({ name: 'image', content: 'http://www.matisses.co/assets/images/envios.jpg' });
        this.meta.addTag({ property: 'og:url', content: 'http://www.matisses.co/assets/images/envios.jpg' });
        this.meta.addTag({ property: 'og:title', content: 'Envíos Matisses' });
        this.meta.addTag({ property: 'og:image', content: 'http://www.matisses.co/assets/images/envios.jpg' });
        this.meta.addTag({ property: 'og:description', content: 'Envíos Matisses' });
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
      $(document).ready(function() {
        $("html, body").animate({scrollTop: 0}, 1000);
      });
    }
}
