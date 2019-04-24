import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IEquipoEmpresas } from 'app/shared/model/equipo-empresas.model';

@Component({
    selector: 'jhi-equipo-empresas-detail',
    templateUrl: './equipo-empresas-detail.component.html'
})
export class EquipoEmpresasDetailComponent implements OnInit {
    equipoEmpresas: IEquipoEmpresas;

    constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ equipoEmpresas }) => {
            this.equipoEmpresas = equipoEmpresas;
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
