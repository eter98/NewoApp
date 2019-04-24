import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ICiudad } from 'app/shared/model/ciudad.model';
import { CiudadService } from './ciudad.service';
import { ISedes } from 'app/shared/model/sedes.model';
import { SedesService } from 'app/entities/sedes';
import { IPais } from 'app/shared/model/pais.model';
import { PaisService } from 'app/entities/pais';

@Component({
    selector: 'jhi-ciudad-update',
    templateUrl: './ciudad-update.component.html'
})
export class CiudadUpdateComponent implements OnInit {
    ciudad: ICiudad;
    isSaving: boolean;

    sedes: ISedes[];

    pais: IPais[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected ciudadService: CiudadService,
        protected sedesService: SedesService,
        protected paisService: PaisService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ ciudad }) => {
            this.ciudad = ciudad;
        });
        this.sedesService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ISedes[]>) => mayBeOk.ok),
                map((response: HttpResponse<ISedes[]>) => response.body)
            )
            .subscribe((res: ISedes[]) => (this.sedes = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.paisService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IPais[]>) => mayBeOk.ok),
                map((response: HttpResponse<IPais[]>) => response.body)
            )
            .subscribe((res: IPais[]) => (this.pais = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.ciudad.id !== undefined) {
            this.subscribeToSaveResponse(this.ciudadService.update(this.ciudad));
        } else {
            this.subscribeToSaveResponse(this.ciudadService.create(this.ciudad));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ICiudad>>) {
        result.subscribe((res: HttpResponse<ICiudad>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackSedesById(index: number, item: ISedes) {
        return item.id;
    }

    trackPaisById(index: number, item: IPais) {
        return item.id;
    }
}
