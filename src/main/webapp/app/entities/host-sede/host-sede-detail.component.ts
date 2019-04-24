import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IHostSede } from 'app/shared/model/host-sede.model';

@Component({
    selector: 'jhi-host-sede-detail',
    templateUrl: './host-sede-detail.component.html'
})
export class HostSedeDetailComponent implements OnInit {
    hostSede: IHostSede;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ hostSede }) => {
            this.hostSede = hostSede;
        });
    }

    previousState() {
        window.history.back();
    }
}
