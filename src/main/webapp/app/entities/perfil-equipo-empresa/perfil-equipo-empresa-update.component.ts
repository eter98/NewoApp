import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IPerfilEquipoEmpresa } from 'app/shared/model/perfil-equipo-empresa.model';
import { PerfilEquipoEmpresaService } from './perfil-equipo-empresa.service';
import { IEquipoEmpresas } from 'app/shared/model/equipo-empresas.model';
import { EquipoEmpresasService } from 'app/entities/equipo-empresas';

@Component({
    selector: 'jhi-perfil-equipo-empresa-update',
    templateUrl: './perfil-equipo-empresa-update.component.html'
})
export class PerfilEquipoEmpresaUpdateComponent implements OnInit {
    perfilEquipoEmpresa: IPerfilEquipoEmpresa;
    isSaving: boolean;

    equipoempresas: IEquipoEmpresas[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected perfilEquipoEmpresaService: PerfilEquipoEmpresaService,
        protected equipoEmpresasService: EquipoEmpresasService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ perfilEquipoEmpresa }) => {
            this.perfilEquipoEmpresa = perfilEquipoEmpresa;
        });
        this.equipoEmpresasService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IEquipoEmpresas[]>) => mayBeOk.ok),
                map((response: HttpResponse<IEquipoEmpresas[]>) => response.body)
            )
            .subscribe((res: IEquipoEmpresas[]) => (this.equipoempresas = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.perfilEquipoEmpresa.id !== undefined) {
            this.subscribeToSaveResponse(this.perfilEquipoEmpresaService.update(this.perfilEquipoEmpresa));
        } else {
            this.subscribeToSaveResponse(this.perfilEquipoEmpresaService.create(this.perfilEquipoEmpresa));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IPerfilEquipoEmpresa>>) {
        result.subscribe((res: HttpResponse<IPerfilEquipoEmpresa>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackEquipoEmpresasById(index: number, item: IEquipoEmpresas) {
        return item.id;
    }
}
