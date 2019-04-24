import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILanding } from 'app/shared/model/landing.model';

@Component({
    selector: 'jhi-landing-detail',
    templateUrl: './landing-detail.component.html'
})
export class LandingDetailComponent implements OnInit {
    landing: ILanding;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ landing }) => {
            this.landing = landing;
        });
    }

    previousState() {
        window.history.back();
    }
}
