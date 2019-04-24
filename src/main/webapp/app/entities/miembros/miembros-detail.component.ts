import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMiembros } from 'app/shared/model/miembros.model';

@Component({
    selector: 'jhi-miembros-detail',
    templateUrl: './miembros-detail.component.html'
})
export class MiembrosDetailComponent implements OnInit {
    miembros: IMiembros;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ miembros }) => {
            this.miembros = miembros;
        });
    }

    previousState() {
        window.history.back();
    }
}
