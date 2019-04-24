import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEspacioLibre } from 'app/shared/model/espacio-libre.model';

@Component({
    selector: 'jhi-espacio-libre-detail',
    templateUrl: './espacio-libre-detail.component.html'
})
export class EspacioLibreDetailComponent implements OnInit {
    espacioLibre: IEspacioLibre;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ espacioLibre }) => {
            this.espacioLibre = espacioLibre;
        });
    }

    previousState() {
        window.history.back();
    }
}
