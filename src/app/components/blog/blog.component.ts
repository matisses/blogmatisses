import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Meta ,Title} from '@angular/platform-browser';

declare var $: any;

@Component({
    templateUrl: 'blog.html',
    styleUrls: ['blog.component.css']
})

export class BlogComponent implements OnInit {
    public title: string;
    public blogNumber: number = 14;

    constructor(private _route: ActivatedRoute, private _router: Router, private meta: Meta,private title1: Title) {
    this.title1.setTitle('Blog Matisses');
    this.meta.addTag({ name: 'title', content: 'Blog Matisses' });
    this.meta.addTag({ name: 'keywords', content: 'blog, matisses, decoracion, tips' });
    this.meta.addTag({ name: 'description', content: 'Blog matisses' });
    this.meta.addTag({ name: 'url', content: 'https://www.matisses.co/blog' });
    this.meta.addTag({ name: 'image', content: 'https://www.matisses.co/assets/images/blog/aparadores.jpg' });
    this.meta.addTag({ property: 'og:url', content: 'https://www.matisses.co/blog' });
    this.meta.addTag({ property: 'og:title', content: 'Blog Matisses' });
    this.meta.addTag({ property: 'og:image', content: 'https://www.matisses.co/assets/images/blog/aparadores.jpg' });
    this.meta.addTag({ property: 'og:description', content: 'Blog Matisses' });
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
