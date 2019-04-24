import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRegistroCompra } from 'app/shared/model/registro-compra.model';

@Component({
    selector: 'jhi-registro-compra-detail',
    templateUrl: './registro-compra-detail.component.html'
})
export class RegistroCompraDetailComponent implements OnInit {
    registroCompra: IRegistroCompra;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ registroCompra }) => {
            this.registroCompra = registroCompra;
        });
    }

    previousState() {
        window.history.back();
    }
}
