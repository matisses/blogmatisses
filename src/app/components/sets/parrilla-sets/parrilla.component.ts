import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CrockeryService } from '../../../services/crockery.service';
import { Vajilla } from '../../../models/crockery';
import { JWTService } from '../../../services/jwt.service';

declare var $: any;

@Component({
  templateUrl: 'parrilla.html',
  styleUrls: ['parrilla.component.css'],
  providers: [CrockeryService, JWTService]
})

export class ParrillaSetsComponent implements OnInit {
  public vajilla: Vajilla;
  public vajillas: Array<Vajilla>;
  public messageError: string;
  public messageExit: string;

  constructor(private _route: ActivatedRoute, private _router: Router, private _crockeryService: CrockeryService,
    private _jwtService: JWTService) {
    this.vajillas = new Array<Vajilla>();
  }

  ngOnInit() {
    this.cargarVajillas();
  }

  public vaciarMessage() {
    this.messageExit = '';
    this.messageError = '';
  }

  private cargarVajillas() {
    this._crockeryService.list().subscribe(
      response => {
        this.vajillas = response;
      }, error => { console.error(error); }
    );
  }

  public mostrarVajilla(vajilla) {
    this.vaciarMessage();
    this.vajilla = vajilla;
    this._crockeryService.listItems(vajilla._id).subscribe(
      response => {
        this.vajilla.detail = new Array<any>();
        for (let i = 0; i < response.length; i++) {
          this.vajilla.detail.push(response[i].item);
        }
      }, error => { console.error(error); }
    );
    $('#modalVajillas').modal('show');
  }


}
