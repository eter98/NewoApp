import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICiudad } from 'app/shared/model/ciudad.model';

@Component({
    selector: 'jhi-ciudad-detail',
    templateUrl: './ciudad-detail.component.html'
})
export class CiudadDetailComponent implements OnInit {
    ciudad: ICiudad;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ ciudad }) => {
            this.ciudad = ciudad;
        });
    }

    previousState() {
        window.history.back();
    }
}
