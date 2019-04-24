import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IFacturacion } from 'app/shared/model/facturacion.model';
import { FacturacionService } from './facturacion.service';
import { IEmpresa } from 'app/shared/model/empresa.model';
import { EmpresaService } from 'app/entities/empresa';
import { IEquipoEmpresas } from 'app/shared/model/equipo-empresas.model';
import { EquipoEmpresasService } from 'app/entities/equipo-empresas';

@Component({
    selector: 'jhi-facturacion-update',
    templateUrl: './facturacion-update.component.html'
})
export class FacturacionUpdateComponent implements OnInit {
    facturacion: IFacturacion;
    isSaving: boolean;

    empresas: IEmpresa[];

    equipoempresas: IEquipoEmpresas[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected facturacionService: FacturacionService,
        protected empresaService: EmpresaService,
        protected equipoEmpresasService: EquipoEmpresasService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ facturacion }) => {
            this.facturacion = facturacion;
        });
        this.empresaService
            .query({ filter: 'facturacion-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<IEmpresa[]>) => mayBeOk.ok),
                map((response: HttpResponse<IEmpresa[]>) => response.body)
            )
            .subscribe(
                (res: IEmpresa[]) => {
                    if (!this.facturacion.empresa || !this.facturacion.empresa.id) {
                        this.empresas = res;
                    } else {
                        this.empresaService
                            .find(this.facturacion.empresa.id)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<IEmpresa>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<IEmpresa>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: IEmpresa) => (this.empresas = [subRes].concat(res)),
                                (subRes: HttpErrorResponse) => this.onError(subRes.message)
                            );
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
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
        if (this.facturacion.id !== undefined) {
            this.subscribeToSaveResponse(this.facturacionService.update(this.facturacion));
        } else {
            this.subscribeToSaveResponse(this.facturacionService.create(this.facturacion));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IFacturacion>>) {
        result.subscribe((res: HttpResponse<IFacturacion>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackEmpresaById(index: number, item: IEmpresa) {
        return item.id;
    }

    trackEquipoEmpresasById(index: number, item: IEquipoEmpresas) {
        return item.id;
    }
}
