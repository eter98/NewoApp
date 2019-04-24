import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { IPerfilMiembro } from 'app/shared/model/perfil-miembro.model';
import { PerfilMiembroService } from './perfil-miembro.service';
import { IMiembros } from 'app/shared/model/miembros.model';
import { MiembrosService } from 'app/entities/miembros';

@Component({
    selector: 'jhi-perfil-miembro-update',
    templateUrl: './perfil-miembro-update.component.html'
})
export class PerfilMiembroUpdateComponent implements OnInit {
    perfilMiembro: IPerfilMiembro;
    isSaving: boolean;

    miembros: IMiembros[];

    constructor(
        protected dataUtils: JhiDataUtils,
        protected jhiAlertService: JhiAlertService,
        protected perfilMiembroService: PerfilMiembroService,
        protected miembrosService: MiembrosService,
        protected elementRef: ElementRef,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ perfilMiembro }) => {
            this.perfilMiembro = perfilMiembro;
        });
        this.miembrosService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IMiembros[]>) => mayBeOk.ok),
                map((response: HttpResponse<IMiembros[]>) => response.body)
            )
            .subscribe((res: IMiembros[]) => (this.miembros = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clearInputImage(field: string, fieldContentType: string, idInput: string) {
        this.dataUtils.clearInputImage(this.perfilMiembro, this.elementRef, field, fieldContentType, idInput);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.perfilMiembro.id !== undefined) {
            this.subscribeToSaveResponse(this.perfilMiembroService.update(this.perfilMiembro));
        } else {
            this.subscribeToSaveResponse(this.perfilMiembroService.create(this.perfilMiembro));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IPerfilMiembro>>) {
        result.subscribe((res: HttpResponse<IPerfilMiembro>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackMiembrosById(index: number, item: IMiembros) {
        return item.id;
    }
}
