import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Meta ,Title} from '@angular/platform-browser';
import { MetaService } from '@ngx-meta/core';
declare var $: any;

@Component({
    selector: 'lujo-clasico',
    templateUrl: 'lujo.html',
    styleUrls: ['lujo.component.css']
})

export class BlogLujoComponent implements OnInit {
    public title: string;

    constructor(private _route: ActivatedRoute, private _router: Router,private meta: Meta,private title1: Title, private metaService: MetaService) {

    }

      ngOnInit() {
        this.title1.setTitle('Lujo Clasico-Matisses');
        this.meta.updateTag({ name: 'title', content: 'Lujo Clasico-Matisses' });
        this.meta.updateTag({ name: 'keywords', content: 'mobiliario, lujo, clasico' });
        this.meta.updateTag({ name: 'description', content: 'Lujo Clasico-Matisses' });
        this.meta.updateTag({ name: 'image', content: 'http://www.matisses.co/assets/images/blog/lujo_clasico.jpg' });
        this.meta.addTag({ property: 'og:url', content: 'http://www.matisses.co/blog' });
        this.meta.addTag({ property: 'og:title', content: 'Lujo Clasico-Matisses' });
        // this.meta.addTag({ property: 'og:image', content: 'http://www.matisses.co/assets/images/blog/lujo_clasico.jpg' });
        // this.meta.addTag({ property: 'og:description', content: 'Elegancia clásica, consejos básicos para tener un espacio tradicional' });

        this.metaService.setTag('og:image','http://www.matisses.co/assets/images/blog/lujo_clasico.jpg');
        this.metaService.setTag('og:description','Elegancia clásica, consejos básicos para tener un espacio tradicional');
    }

    ngAfterViewInit() {

    }

}
