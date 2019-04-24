import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICuentaAsociada } from 'app/shared/model/cuenta-asociada.model';

@Component({
    selector: 'jhi-cuenta-asociada-detail',
    templateUrl: './cuenta-asociada-detail.component.html'
})
export class CuentaAsociadaDetailComponent implements OnInit {
    cuentaAsociada: ICuentaAsociada;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ cuentaAsociada }) => {
            this.cuentaAsociada = cuentaAsociada;
        });
    }

    previousState() {
        window.history.back();
    }
}
