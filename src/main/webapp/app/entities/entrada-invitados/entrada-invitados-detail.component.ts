import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEntradaInvitados } from 'app/shared/model/entrada-invitados.model';

@Component({
    selector: 'jhi-entrada-invitados-detail',
    templateUrl: './entrada-invitados-detail.component.html'
})
export class EntradaInvitadosDetailComponent implements OnInit {
    entradaInvitados: IEntradaInvitados;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ entradaInvitados }) => {
            this.entradaInvitados = entradaInvitados;
        });
    }

    previousState() {
        window.history.back();
    }
}
