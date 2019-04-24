import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPerfilEquipoEmpresa } from 'app/shared/model/perfil-equipo-empresa.model';

@Component({
    selector: 'jhi-perfil-equipo-empresa-detail',
    templateUrl: './perfil-equipo-empresa-detail.component.html'
})
export class PerfilEquipoEmpresaDetailComponent implements OnInit {
    perfilEquipoEmpresa: IPerfilEquipoEmpresa;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ perfilEquipoEmpresa }) => {
            this.perfilEquipoEmpresa = perfilEquipoEmpresa;
        });
    }

    previousState() {
        window.history.back();
    }
}
