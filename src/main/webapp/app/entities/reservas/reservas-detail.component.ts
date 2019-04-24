import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IReservas } from 'app/shared/model/reservas.model';

@Component({
    selector: 'jhi-reservas-detail',
    templateUrl: './reservas-detail.component.html'
})
export class ReservasDetailComponent implements OnInit {
    reservas: IReservas;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ reservas }) => {
            this.reservas = reservas;
        });
    }

    previousState() {
        window.history.back();
    }
}
