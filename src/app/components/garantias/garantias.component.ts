import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Meta ,Title} from '@angular/platform-browser';
declare var $: any;

@Component({
    templateUrl: 'garantias.html',
    styleUrls: ['garantias.component.css']
})

export class GarantiasComponent implements OnInit {
    public title: string;

    constructor(private _route: ActivatedRoute, private _router: Router, private meta: Meta,private title1: Title) {
        this.title = 'Este es el cuerpo de garantias';
        this.title1.setTitle('Garantías Matisses');
        this.meta.addTag({ name: 'title', content: 'Garantías Matisses' });
        this.meta.addTag({ name: 'keywords', content: 'garantias, matisses' });
        this.meta.addTag({ name: 'description', content: 'Garantías Matisses' });
        this.meta.addTag({ name: 'image', content: 'https://www.matisses.co/assets/images/garantias.jpg' });
        this.meta.addTag({ property: 'og:url', content: 'https://www.matisses.co/assets/images/garantias.jpg' });
        this.meta.addTag({ property: 'og:title', content: 'Garantías Matisses' });
        this.meta.addTag({ property: 'og:image', content: 'https://www.matisses.co/assets/images/garantias.jpg' });
        this.meta.addTag({ property: 'og:description', content: 'Garantías Matisses' });
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
      $(document).ready(function() {
        $("html, body").animate({scrollTop: 0}, 1000);
      });
    }

}
