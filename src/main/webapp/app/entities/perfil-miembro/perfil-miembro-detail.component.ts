import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IPerfilMiembro } from 'app/shared/model/perfil-miembro.model';

@Component({
    selector: 'jhi-perfil-miembro-detail',
    templateUrl: './perfil-miembro-detail.component.html'
})
export class PerfilMiembroDetailComponent implements OnInit {
    perfilMiembro: IPerfilMiembro;

    constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ perfilMiembro }) => {
            this.perfilMiembro = perfilMiembro;
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
