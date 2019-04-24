import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBeneficio } from 'app/shared/model/beneficio.model';

@Component({
    selector: 'jhi-beneficio-detail',
    templateUrl: './beneficio-detail.component.html'
})
export class BeneficioDetailComponent implements OnInit {
    beneficio: IBeneficio;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ beneficio }) => {
            this.beneficio = beneficio;
        });
    }

    previousState() {
        window.history.back();
    }
}
