import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IProductosServicios } from 'app/shared/model/productos-servicios.model';

@Component({
    selector: 'jhi-productos-servicios-detail',
    templateUrl: './productos-servicios-detail.component.html'
})
export class ProductosServiciosDetailComponent implements OnInit {
    productosServicios: IProductosServicios;

    constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ productosServicios }) => {
            this.productosServicios = productosServicios;
        });
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }
}
