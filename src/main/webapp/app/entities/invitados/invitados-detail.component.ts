import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IInvitados } from 'app/shared/model/invitados.model';

@Component({
    selector: 'jhi-invitados-detail',
    templateUrl: './invitados-detail.component.html'
})
export class InvitadosDetailComponent implements OnInit {
    invitados: IInvitados;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ invitados }) => {
            this.invitados = invitados;
        });
    }

    previousState() {
        window.history.back();
    }
}
