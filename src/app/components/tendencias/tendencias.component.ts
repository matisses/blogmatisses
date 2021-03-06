import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'tendencias',
    templateUrl: 'tendencias.html',
    styleUrls: ['tendencias.component.css']
})

export class TendenciasComponent implements OnInit {
    public title: string;

    constructor(private _route: ActivatedRoute, private _router: Router) {
        this.title = 'Tendencias';
    }

    ngOnInit() {
    }
}
