import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFacturacion } from 'app/shared/model/facturacion.model';

@Component({
    selector: 'jhi-facturacion-detail',
    templateUrl: './facturacion-detail.component.html'
})
export class FacturacionDetailComponent implements OnInit {
    facturacion: IFacturacion;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ facturacion }) => {
            this.facturacion = facturacion;
        });
    }

    previousState() {
        window.history.back();
    }
}
