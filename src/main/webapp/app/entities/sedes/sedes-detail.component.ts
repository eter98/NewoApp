import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { ISedes } from 'app/shared/model/sedes.model';

@Component({
    selector: 'jhi-sedes-detail',
    templateUrl: './sedes-detail.component.html'
})
export class SedesDetailComponent implements OnInit {
    sedes: ISedes;

    constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ sedes }) => {
            this.sedes = sedes;
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
