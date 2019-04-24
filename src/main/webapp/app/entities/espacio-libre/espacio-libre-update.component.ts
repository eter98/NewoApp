import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IEspacioLibre } from 'app/shared/model/espacio-libre.model';
import { EspacioLibreService } from './espacio-libre.service';
import { ISedes } from 'app/shared/model/sedes.model';
import { SedesService } from 'app/entities/sedes';
import { IMiembros } from 'app/shared/model/miembros.model';
import { MiembrosService } from 'app/entities/miembros';
import { IEntradaInvitados } from 'app/shared/model/entrada-invitados.model';
import { EntradaInvitadosService } from 'app/entities/entrada-invitados';
import { IRegistroCompra } from 'app/shared/model/registro-compra.model';
import { RegistroCompraService } from 'app/entities/registro-compra';

@Component({
    selector: 'jhi-espacio-libre-update',
    templateUrl: './espacio-libre-update.component.html'
})
export class EspacioLibreUpdateComponent implements OnInit {
    espacioLibre: IEspacioLibre;
    isSaving: boolean;

    sedes: ISedes[];

    miembros: IMiembros[];

    entradainvitados: IEntradaInvitados[];

    registrocompras: IRegistroCompra[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected espacioLibreService: EspacioLibreService,
        protected sedesService: SedesService,
        protected miembrosService: MiembrosService,
        protected entradaInvitadosService: EntradaInvitadosService,
        protected registroCompraService: RegistroCompraService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ espacioLibre }) => {
            this.espacioLibre = espacioLibre;
        });
        this.sedesService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ISedes[]>) => mayBeOk.ok),
                map((response: HttpResponse<ISedes[]>) => response.body)
            )
            .subscribe((res: ISedes[]) => (this.sedes = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.miembrosService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IMiembros[]>) => mayBeOk.ok),
                map((response: HttpResponse<IMiembros[]>) => response.body)
            )
            .subscribe((res: IMiembros[]) => (this.miembros = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.entradaInvitadosService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IEntradaInvitados[]>) => mayBeOk.ok),
                map((response: HttpResponse<IEntradaInvitados[]>) => response.body)
            )
            .subscribe((res: IEntradaInvitados[]) => (this.entradainvitados = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.registroCompraService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IRegistroCompra[]>) => mayBeOk.ok),
                map((response: HttpResponse<IRegistroCompra[]>) => response.body)
            )
            .subscribe((res: IRegistroCompra[]) => (this.registrocompras = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.espacioLibre.id !== undefined) {
            this.subscribeToSaveResponse(this.espacioLibreService.update(this.espacioLibre));
        } else {
            this.subscribeToSaveResponse(this.espacioLibreService.create(this.espacioLibre));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IEspacioLibre>>) {
        result.subscribe((res: HttpResponse<IEspacioLibre>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackMiembrosById(index: number, item: IMiembros) {
        return item.id;
    }

    trackEntradaInvitadosById(index: number, item: IEntradaInvitados) {
        return item.id;
    }

    trackRegistroCompraById(index: number, item: IRegistroCompra) {
        return item.id;
    }
}
