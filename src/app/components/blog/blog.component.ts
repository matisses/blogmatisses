import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Meta } from '@angular/platform-browser';

declare var $: any;

@Component({
    templateUrl: 'blog.html',
    styleUrls: ['blog.component.css']
})

export class BlogComponent implements OnInit {
    public title: string;
    public blogNumber: number = 3;

    constructor(private _route: ActivatedRoute, private _router: Router, private meta: Meta) {

    this.meta.addTag({ name: 'title', content: 'Blog Matisses' });
    this.meta.addTag({ name: 'keywords', content: 'blog, matisses, decoracion, tips' });
    this.meta.addTag({ name: 'description', content: 'Blog matisses-' });
    this.meta.addTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.addTag({ name: 'twitter:site', content: '@alligatorio' });
    this.meta.addTag({ name: 'twitter:title', content: 'Front-end Web Development, Chewed Up' });
    this.meta.addTag({ name: 'twitter:description', content: 'Learn frontend web development...' });
    this.meta.addTag({ name: 'twitter:image', content: 'https://alligator.io/images/front-end-cover.png' });
    }

    ngOnInit() {

    }

    ngAfterViewInit() {
      $(document).ready(function() {
        $("html, body").animate({scrollTop: 0}, 1000);
      });

    }

    public seleccionarBlog(id) {
      this.blogNumber = id;
    }

}
