import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEspaciosReserva } from 'app/shared/model/espacios-reserva.model';

@Component({
    selector: 'jhi-espacios-reserva-detail',
    templateUrl: './espacios-reserva-detail.component.html'
})
export class EspaciosReservaDetailComponent implements OnInit {
    espaciosReserva: IEspaciosReserva;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ espaciosReserva }) => {
            this.espaciosReserva = espaciosReserva;
        });
    }

    previousState() {
        window.history.back();
    }
}
