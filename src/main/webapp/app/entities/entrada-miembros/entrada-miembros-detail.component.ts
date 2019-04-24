import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEntradaMiembros } from 'app/shared/model/entrada-miembros.model';

@Component({
    selector: 'jhi-entrada-miembros-detail',
    templateUrl: './entrada-miembros-detail.component.html'
})
export class EntradaMiembrosDetailComponent implements OnInit {
    entradaMiembros: IEntradaMiembros;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ entradaMiembros }) => {
            this.entradaMiembros = entradaMiembros;
        });
    }

    previousState() {
        window.history.back();
    }
}
