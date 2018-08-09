import { Component, OnInit } from '@angular/core';
import { Moment } from 'moment';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Meta ,Title} from '@angular/platform-browser';
//declare var jquery: any;
declare var $: any;

@Component({
  templateUrl: 'landing-decoradores.html',
  styleUrls: ['landing-decoradores.component.css'],
})


export class LandingDecoradoresComponent implements OnInit {
  public title: string;

  constructor(private _route: ActivatedRoute, private _router: Router,private meta: Meta,private title1: Title) {
    this.title = 'Este es el cuerpo de decoradores';
    this.title = 'Este es el cuerpo';
    this.title1.setTitle('Decoradores-Matisses');
    this.meta.updateTag({ name: 'title', content: 'Decoradores-Matisses' });
    this.meta.updateTag({ name: 'keywords', content: 'decoradores, interiorismo,espacios' });
    this.meta.updateTag({ name: 'description', content: 'Decoradores-Matisses' });
    this.meta.updateTag({ name: 'image', content: 'http://www.matisses.co/assets/images/decoradores.jpg' });
    this.meta.addTag({ property: 'og:url', content: 'http://www.matisses.co/decoradores' });
    this.meta.addTag({ property: 'og:title', content: 'Decoradores-Matisses' });
    this.meta.addTag({ property: 'og:image', content: 'http://www.matisses.co/assets/images/decoradores.jpg' });
    this.meta.addTag({ property: 'og:description', content: '!Convierte los espacios de tus clientes en toda una experiencia!' });
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    $(document).ready(function () {
      $("html, body").animate({ scrollTop: 0 }, 1000);
    })
  }

  irALogin(){
    localStorage.setItem('decorator_register','Y');
      this._router.navigate(['/login']);
  }

}
