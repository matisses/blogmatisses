import { Component, OnInit } from '@angular/core';
import { Moment } from 'moment';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Meta ,Title} from '@angular/platform-browser';
//declare var jquery: any;
declare var $: any;

@Component({
  templateUrl: 'landing-planner.html',
  styleUrls: ['landing-planner.component.css'],
})


export class LandingPlannerComponent implements OnInit {
  public title: string;

  constructor(private _route: ActivatedRoute, private _router: Router,private meta: Meta,private title1: Title) {
    this.title = 'Este es el cuerpo de planners';

    this.title1.setTitle('Planners-Matisses');
    this.meta.updateTag({ name: 'title', content: 'Planners-Matisses' });
    this.meta.updateTag({ name: 'keywords', content: 'planners, planificadores, boda, matrimonio' });
    this.meta.updateTag({ name: 'description', content: 'Planners-Matisses' });
    this.meta.updateTag({ name: 'image', content: 'http://www.matisses.co/assets/images/planner.jpg' });
    this.meta.addTag({ property: 'og:url', content: 'http://www.matisses.co/planners' });
    this.meta.addTag({ property: 'og:title', content: 'Planners-Matisses' });
    this.meta.addTag({ property: 'og:image', content: 'http://www.matisses.co/assets/images/planner.jpg' });
    this.meta.addTag({ property: 'og:description', content: '!Simplifica la boda de tus novios!' });
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    $(document).ready(function () {
      $("html, body").animate({ scrollTop: 0 }, 1000);
    })
  }

  irALogin(){
    console.log('irALogin');
    localStorage.setItem('wedding_register','Y');
      this._router.navigate(['/login']);
  }


}
