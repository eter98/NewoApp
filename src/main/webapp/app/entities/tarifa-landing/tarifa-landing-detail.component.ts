import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITarifaLanding } from 'app/shared/model/tarifa-landing.model';

@Component({
    selector: 'jhi-tarifa-landing-detail',
    templateUrl: './tarifa-landing-detail.component.html'
})
export class TarifaLandingDetailComponent implements OnInit {
    tarifaLanding: ITarifaLanding;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ tarifaLanding }) => {
            this.tarifaLanding = tarifaLanding;
        });
    }

    previousState() {
        window.history.back();
    }
}
